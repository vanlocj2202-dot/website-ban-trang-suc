let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   SAVE + RENDER COUNT
========================= */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* =========================
   UPDATE ICON CART COUNT
========================= */
function updateCartCount(){
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);

    let cartIcon = document.getElementById("cart-count");
    if(cartIcon){
        cartIcon.innerText = count;
    }
}

/* =========================
   ADD TO CART (UPGRADED)
========================= */
window.addToCart = function(name, price){

    let item = cart.find(i => i.name === name);

    if(item){
        item.quantity++;
    } else {
        cart.push({
            name,
            price: Number(price),
            quantity: 1
        });
    }

    saveCart();
    alert("Đã thêm vào giỏ hàng!");
};

/* =========================
   DECREASE ITEM
========================= */
window.decreaseItem = function(name){

    let item = cart.find(i => i.name === name);

    if(item){
        item.quantity--;

        if(item.quantity <= 0){
            cart = cart.filter(i => i.name !== name);
        }
    }

    saveCart();
};

/* =========================
   REMOVE ITEM
========================= */
window.removeItem = function(name){

    cart = cart.filter(i => i.name !== name);
    saveCart();
};

/* =========================
   BUY NOW
========================= */
window.buyNow = function(name, price){

    localStorage.setItem("checkoutCart", JSON.stringify([{
        name,
        price: Number(price),
        quantity: 1
    }]));

    window.location.href = "thanhtoan.html";
};

/* =========================
   CHECKOUT ALL
========================= */
window.checkout = function(){

    if(cart.length === 0){
        alert("Giỏ hàng đang trống!");
        return;
    }

    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    window.location.href = "thanhtoan.html";
};

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", updateCartCount);