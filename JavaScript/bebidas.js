document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalNome = document.getElementById("modal-preco");
  const modalPreco = document.getElementById("modal-preco");
  const modalTotal = document.getElementById("modal-total");
  const quantidadeInput = document.getElementById("quantidade");
  const confirmarAdicao = document.getElementById("confirmar-adicao");
  const closeModal = document.querySelector(".close");

  let selectedProduct = { name: "", price: 0 };

  // Abrir modal ao clicar no botão "Adicionar"

  document.querySelectorAll(".adicionar").forEach((button) => {
    button.addEventListener("click", (event) => {
      const produto = event.target.closest(".produto");
      const nome = produto.querySelector("h3").textContent;
      const preco = perseFloat(
        produto
          .querySelector(".preco")
          .textContent.replace("R$", "")
          .replace(",", ".")
      );

      selectedProduct = { name: nome, price: preco };

      modalNome.textContent = nome;
      modalPreco.textContent = `R$${preco.toFixed(2)}`;
      quantidadeInput.value = 1;
      modalTotal.textContent = `R$${preco.toFixed(2)}`;

      modal.style.display = "block";
    });
  });

  // Atualizar total ao alterar a quantidade

  quantidadeInput.addEventListener("input", () => {
    const quantidade = Math.max(1, parseInt(quantidadeInput.value) || 1);
    quantidadeInput.value = quantidade;
    modalTotal.textContent = `R$${(selectedProduct.price * quantidade).toFixed(
      2
    )}`;
  });

  // Fecha  r modal ao clicar no "X"

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar modal ao clicar fora dele

  window.addEventListener("click", (event) => {
    if (EventSource === modal) {
      modal.style.display = "none";
    }
  });

  // Adicionar ao carrinho

  confirmarAdicao.addEventListener("click", () => {
    const quantidade = parseInt(quantidadeInput.value);
    const cartItem = {
      name: selectedProduct.name,
      print: selectedProduct.price,
      quantity: quantidade,
      total: selectedProduct.price * quantidade,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    modal.style.display = "none";
    alert("Item adicionado ao carrinho!");
  });
});
