document.addEventListener("DOMContentLoaded", () => {
  const usuarioStr = localStorage.getItem("usuarioLogado");
  const carro = JSON.parse(localStorage.getItem("carroEscolhido"));
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
  const API = "http://localhost:3000/carros";
alert(carro.id)
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const spanModelo = document.getElementById("carroModelo");
  const spanValor = document.getElementById("carroValor");
  const spanNome = document.getElementById("usuarioNome");
  const spanEmail = document.getElementById("usuarioEmail");

  if (usuario) {
    loginLink.style.display = "none";
    logoutLink.style.display = "inline";
    spanNome.textContent = usuario.nome;
    spanEmail.textContent = usuario.email;
  } else {
    alert("Você precisa estar logado para alugar um carro.");
    window.location.href = "login.html";
  }

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmar = confirm("Deseja sair da sua conta?");
    if (confirmar) {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    }
  });

  if (carro) {
    spanModelo.textContent = carro.modelo;
    spanValor.textContent = carro.valor;
  } else {
    alert("Nenhum carro selecionado.");
    window.location.href = "carros.html";
  }

  const form = document.getElementById("formLocacao");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dataRetirada = document.getElementById("dataRetirada").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    try {
      // Busca o carro atualizado no banco
      const res = await fetch(`${API}/${carro.id}`);
      if (!res.ok) throw new Error("Erro ao buscar carro no banco");
      const carroAtual = await res.json();

      if (carroAtual.disponivel) {
        alert(`Locação confirmada:
Carro: ${carroAtual.modelo}
De ${dataRetirada} até ${dataDevolucao}`);
console.log("Verificando disponibilidade do carro com ID:", carro.id);


        await fetch(`${API}/${carroAtual._id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ disponivel: false })
});


        window.location.href = "index.html";
      } else {
        alert("🚫 Este carro foi alugado por outra pessoa. Escolha outro modelo.");
        window.location.href = "carros.html";
      }
    } catch (err) {
      console.error("Erro ao verificar disponibilidade:", err);
      alert("Erro ao processar a locação.");
    }
  });
});
