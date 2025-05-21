const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];
const TAXA_ENTREGA = 0;

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Fechar o modal ao clicar fora dele
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

// Adicionar ao carrinho
menu.addEventListener("click", function (event) {
    const parentButton = event.target.closest(".add-to-cart-btn");
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartModal();
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "items-center", "border-b", "pb-2");

        cartItemElement.innerHTML = `
            <div>
                <p class="font-bold text-lg">${item.name}</p>
                <p class="text-sm">Qtd: ${item.quantity}</p>
                <p class="text-sm">Preço un.: R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn text-red-500 font-semibold hover:underline" data-name="${item.name}">
                Remover
            </button>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    total += TAXA_ENTREGA;

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerText = cart.length;
}

cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartModal();
    }
}

addressInput.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

checkoutBtn.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen();

    if (!isOpen) {
        Toastify({
            text: "Eita, estamos fechados no momento!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart.map(item => {
        return `${item.name} (Qtd: ${item.quantity}) - R$${item.price.toFixed(2)}`;
    }).join(" | ");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + TAXA_ENTREGA;

    const message = encodeURIComponent(
        `Olá! Gostaria de fazer o pedido:\n\n${cartItems}\n\nTotal (com entrega): R$ ${total.toFixed(2)}\nEndereço: ${addressInput.value}`
    );

    const phone = "87988462417";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    Toastify({
        text: "Pedido enviado para o WhatsApp com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#22c55e",
        },
    }).showToast();

    cart = [];
    updateCartModal();
    cartModal.style.display = "none";
    addressInput.value = "";
});

function checkRestaurantOpen() {
    const hora = new Date().getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();
if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
    spanItem.textContent = "Aberto agora";
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
    spanItem.textContent = "Fechado no momento";
}
