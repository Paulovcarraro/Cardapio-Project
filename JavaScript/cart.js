document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout");
  const paymentModal = document.getElementById("pagamento__modal"); 
  const closeModal = document.querySelector(".close");
  const paymentOptions = document.querySelectorAll(".pagamento__option"); 

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function atualizarCarrinho() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>O carrinho está vazio.</p>";
      cartTotal.textContent = "R$ 0,00";
      return;
    }

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Quantidade: ${item.quantity}</p>
        <p>Preço: R$ ${item.total.toFixed(2)}</p>
        <button class="remove-item" data-index="${index}">Remover</button>
      `;

      cartContainer.appendChild(itemElement);
      total += item.total;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  }

  cartContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      atualizarCarrinho();
    }
  });

  // Abre o modal ao clicar em "Finalizar Compra"
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    paymentModal.style.display = "flex";
  });

  // Fecha o modal ao clicar no botão "X"
  closeModal.addEventListener("click", () => {
    paymentModal.style.display = "none";
  });

  // Quando o usuário escolher um método de pagamento
  paymentOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      const metodoSelecionado = event.currentTarget.getAttribute("data-method");

      alert(`Pagamento via ${metodoSelecionado.toUpperCase()} confirmado!`);

      // Zera o carrinho após a compra
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      atualizarCarrinho();

      // Fecha o modal
      paymentModal.style.display = "none";
    });
  });

  atualizarCarrinho();
});
