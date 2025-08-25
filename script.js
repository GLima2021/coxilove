// Cart functionality
let cart = []
let cartCount = 0
let cartTotal = 0

// DOM elements
const cartSidebar = document.getElementById("cartSidebar")
const cartOverlay = document.getElementById("cartOverlay")
const cartItems = document.getElementById("cartItems")
const cartFooter = document.getElementById("cartFooter")
const cartCountElement = document.querySelector(".cart-count")
const cartTotalElement = document.getElementById("cartTotal")

// Add to cart function
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    })
  }

  updateCart()
  showCartNotification()
}

// Update cart display
function updateCart() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  cartCountElement.textContent = cartCount
  cartTotalElement.textContent = cartTotal.toFixed(2).replace(".", ",")

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `
    cartFooter.style.display = "none"
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
                </div>
            </div>
        `,
      )
      .join("")
    cartFooter.style.display = "block"
  }
}

// Increase quantity
function increaseQuantity(name) {
  const item = cart.find((item) => item.name === name)
  if (item) {
    item.quantity += 1
    updateCart()
  }
}

// Decrease quantity
function decreaseQuantity(name) {
  const item = cart.find((item) => item.name === name)
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      cart = cart.filter((cartItem) => cartItem.name !== name)
    }
    updateCart()
  }
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("open")
  cartOverlay.classList.toggle("active")
  document.body.style.overflow = cartSidebar.classList.contains("open") ? "hidden" : "auto"
}

// Show cart notification
function showCartNotification() {
  // Simple animation for the cart button
  const cartBtn = document.querySelector(".cart-btn")
  cartBtn.style.transform = "scale(1.2)"
  setTimeout(() => {
    cartBtn.style.transform = "scale(1)"
  }, 200)
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!")
    return
  }

  let message = "*🍴 PEDIDO COXI LOVE NORDESTINO 🍴*\n\n"
  message += "*📋 ITENS DO PEDIDO:*\n"

  cart.forEach((item) => {
    message += `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}\n`
  })

  message += `\n*💰 TOTAL: R$ ${cartTotal.toFixed(2).replace(".", ",")}*\n\n`
  message += "*📍 DADOS PARA ENTREGA:*\n"
  message += "• Nome completo:\n"
  message += "• Telefone:\n"
  message += "• Endereço completo:\n"
  message += "• Ponto de referência:\n\n"
  message += "*💳 FORMA DE PAGAMENTO:*\n"
  message += "( ) Dinheiro - Troco para:\n"
  message += "( ) PIX\n"
  message += "( ) Cartão de Débito\n"
  message += "( ) Cartão de Crédito\n\n"
  message += "*⏰ OBSERVAÇÕES:*\n"
  message += "• Horário de preferência para entrega:\n"
  message += "• Observações adicionais:\n\n"
  message += "✅ *Confirme seus dados e aguarde nosso contato!*"

  const whatsappUrl = `https://wa.me/5583991806282?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  // Clear cart after checkout
  cart = []
  updateCart()
  toggleCart()
}

// Menu filter functionality
function filterMenu(category) {
  const menuItems = document.querySelectorAll(".menu-item")
  const categoryBtns = document.querySelectorAll(".category-btn")

  // Update active button
  categoryBtns.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Filter items
  menuItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.classList.remove("hidden")
    } else {
      item.classList.add("hidden")
    }
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  // This would be implemented for mobile menu functionality
  console.log("Mobile menu toggle")
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !e.target.closest(".cart-btn")) {
    if (cartSidebar.classList.contains("open")) {
      toggleCart()
    }
  }
})

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCart()
})
