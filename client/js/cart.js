const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";
  //modal Header
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  //modal body
  if(cart.length > 0){
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
          <div class="product">
              <img class="product-img" src="${product.img}"/>
              <div class="product-info">
                  <h4>${product.productName}</h4>
              </div>
              <div class="quantity">
                  <span class="quantity-btn-decrese">-</span>
                  <span class="quantity-input">${product.quanty}</span>
                  <span class="quantity-btn-increse">+</span>
              </div>
              <div class="price">${product.price * product.quanty} $</div>
              <div class="delete-product">❌</div>
          </div>
          `;
      modalContainer.append(modalBody);
  
      const decrese = modalBody.querySelector(".quantity-btn-decrese");
      decrese.addEventListener("click", () => {
        if (product.quanty != 1) {
          product.quanty --;
          displayCart();
          displayCartCounter();
        }
      });
  
      const increse = modalBody.querySelector(".quantity-btn-increse");
      increse.addEventListener("click", () => {
        product.quanty ++;
        displayCart();
        displayCartCounter();
      });
  
      //delete
      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(product.id);
      });
    });

    //modal footer
    const total = cart.reduce((acc, element) => acc + element.price * element.quanty, 0); //reduce es un método que recibe una función y un valor inicial, en este caso 0. La función recibe dos parámetros, el acumulador y el elemento actual. En este caso, el acumulador es acc y el elemento actual es element. La función suma el precio por la cantidad de cada producto y lo va sumando al acumulador. Al final, reduce devuelve el valor del acumulador, que es el total de la compra.

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
          <div class="total-price">Total: ${total}</div>

    `;
    modalContainer.append(modalFooter);
    }else{
      const modalText = document.createElement("h2");
      modalText.className = "modal-body";
      modalText.innerText = "Your cart is empty";
      modalContainer.append(modalText);
    }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = cart.findIndex((element) => element.id === id);
  console.log(foundId);
  cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
};

const displayCartCounter = () => {
  const cartLength = cart.reduce((acc, element) => acc + element.quanty, 0);
  if (cart.length > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  }else{
    cartCounter.style.display = "none";
  }
};