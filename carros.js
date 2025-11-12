document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 🔹 Controle de Login/Logout
  // ===============================
  const usuarioStr = localStorage.getItem("usuarioLogado");
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");

  if (usuario) {
    if (loginLink) loginLink.style.display = "none";
    logoutLink.style.display = "inline";
  } else {
    if (loginLink) loginLink.style.display = "inline";
    logoutLink.style.display = "none";
  }

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    const confirmar = confirm("Deseja sair da sua conta?");
    if (confirmar) {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da sua conta.");
      window.location.href = "index.html";
    }
  });

  // ===============================
  // 🚗 Lógica dos botões "Alugar"
  // ===============================
  const botoesAlugar = document.querySelectorAll(".btn");

  botoesAlugar.forEach(botao => {
    botao.addEventListener("click", (event) => {
      event.preventDefault();
      const card = event.target.closest(".car-card");
const id = card.dataset.id;
const modelo = card.dataset.modelo;
const valor = card.dataset.valor; // novo



      const usuarioStr = localStorage.getItem("usuarioLogado");
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

      if (!usuario) {
        alert("Você precisa fazer login antes de alugar um carro.");
        window.location.href = "login.html";
        return;
      }

      // salva o carro escolhido
      localStorage.setItem("carroEscolhido", JSON.stringify({ id, modelo, valor }));

      alert(`Você escolheu o ${modelo}.`);
      window.location.href = "locacao.html";
    });
  });
});
