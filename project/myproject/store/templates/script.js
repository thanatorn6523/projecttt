<script>
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 💾 save
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 🛒 add
function addToCart(name, price) {
    name = String(name); // กัน error

    let found = cart.find(item => item.name === name);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({name: name, price: Number(price), qty: 1});
    }

    saveCart();
    updateCart();
}

// 🔄 update icon
function updateCart() {
    let count = 0;
    let total = 0;

    cart.forEach(item => {
        count += item.qty;
        total += item.price * item.qty;
    });

    document.getElementById("cart-count").innerText = count;
    document.getElementById("cart-total").innerText = total.toLocaleString();
}

// ❌ remove
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    openCart();
    updateCart();
}

// 🪟 open
function openCart() {
    document.getElementById("cartModal").style.display = "flex";

    let itemsHTML = "";
    let total = 0;

    if (cart.length === 0) {
        itemsHTML = "<p>ไม่มีสินค้า 🛒</p>";
    } else {
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.qty;
            total += itemTotal;

            itemsHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin:5px 0;">
                    <span>${item.name} x${item.qty}</span>
                    <span>${itemTotal.toLocaleString()} บาท</span>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
            `;
        });
    }

    document.getElementById("cart-items").innerHTML = itemsHTML;
    document.getElementById("total-price").innerText = total.toLocaleString();
}

// ❌ close
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// 💳 checkout
function checkout() {
    if (cart.length === 0) {
        alert("ยังไม่มีสินค้า ");
        return;
    }

    alert("✅ ชำระเงินสำเร็จ");

    cart = [];
    saveCart();
    updateCart();
    closeCart();
}

document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let name = this.dataset.name;
        let price = this.dataset.price;

        addToCart(name, price);
    });
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
} 

// ⭐ โหลดตอนเปิดหน้า
window.onload = function() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();
};
</script>