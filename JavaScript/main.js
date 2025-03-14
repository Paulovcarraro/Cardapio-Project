document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalNome = document.getElementById("modal-nome");
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
        const preco = parseFloat(
          produto.querySelector(".preco").textContent.replace("R$", "").replace(",", ".")
        );
  
        selectedProduct = { name: nome, price: preco };
  
        modalNome.textContent = nome;
        modalPreco.textContent = `R$${preco.toFixed(2)}`;
        quantidadeInput.value = 1;
        modalTotal.textContent = `R$${preco.toFixed(2)}`;
  
        modal.style.display = "block"; // Garante que o modal apareça
      });
    });
  
    // Atualizar total ao alterar a quantidade
    quantidadeInput.addEventListener("input", () => {
      const quantidade = Math.max(1, parseInt(quantidadeInput.value) || 1);
      quantidadeInput.value = quantidade;
      modalTotal.textContent = `R$${(selectedProduct.price * quantidade).toFixed(2)}`;
    });
  
    // Fechar modal ao clicar no "X"
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Fechar modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Adicionar ao carrinho 
    confirmarAdicao.addEventListener("click", () => {
      const quantidade = parseInt(quantidadeInput.value);
      const cartItem = {
        name: selectedProduct.name,
        price: selectedProduct.price,
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
  
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".droplist");
      const content = dropdown.querySelector(".dropdown__content");
  
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        content.classList.toggle("show");
      });
    });
  });
  