document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
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
  
    atualizarCarrinho();
  });
  