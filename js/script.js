//Annimacion del scroll
window.addEventListener("scroll", scroll);

function scroll() {
    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 750);
}

//Carrito de compras
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart");
const titles = [
    'Thuraya XT-PRO',
    'Thuraya Satsleeve +',
    'M88 Armored Recovery Vehicle',
    'LSD',
    'Cueva de los Tayos Secret',
    'Secretos del Gobierno',
    'Servicios de Hackeo',
    'Servicios de Crimen'];
const desc = [
    'Teléfono satelital a prueba de agua y con una autonomía de hasta 10 horas.',
    'Utiliza el teléfono inteligente para convertirse en un teléfono satelital.',
    'Vehículo de recuperación blindado de la Fuerza Terrestre de los Estados Unidos.',
    'Una droga síquica altamente potente que produce alucinaciones y cambios en la percepción.',
    'Una cueva localizada en la Amazonia Ecuatoriana que fue el tema de una búsqueda arqueológica desde la década de 1970.',
    'Acceso a archivos secretos del Pentágono que contienen información confidencial.',
    'Servicios de hacking y piratería informática.',
    'Servicios de asesinato, secuestro y otros crímenes ilegales.'];
const pices = [1000, 950, 400000, 100, 2500, 100000, 150, 500];
var addCart = document.querySelectorAll(".add-cart");;

//Abre el carrito de compras
cartIcon.onclick = () => {
    cart.classList.add("active");
};


//Cierra el carrito de compras
closeCart.addEventListener('click', function () {
    cart.classList.remove("active");
});

//Funcionamiento del carrito de compras
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Funcion complementaria del carrito de compras
function ready() {
    //añadir elementos al carrito
    addCart.forEach(function (button) {
        button.addEventListener("click", addCartClicked);
    });

    //Quitar elementos del carrito
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //Cambiar cantidad de productos a comprar
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Buy Button Work
    document.getElementsByClassName("btn")[0].addEventListener("click", buyButtonClicked);

    //Añadir desde el modal
    var addCart2 = document.querySelectorAll(".add-cart");;
    addCart2.forEach(function (button) {
        button.addEventListener("click", addToCartFromModal);
    });

}

//Funcion para añadir desde el modal
function addToCartFromModal(event) {
    var button = event.target;
    var modal = button.closest(".modal");
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = modal.querySelector(".modal-title").textContent;
    var price = modal.querySelector('.modal-price').textContent;
    var num = parseInt(price.replace(/[^0-9]/g, ''));
    var productImg = modal.querySelector(".modal-img").src;
    let totalProducts = (document.getElementsByClassName("cart-quantity")).length;;
    totalProducts++;
    cartIcon.innerHTML = " " + totalProducts;
    addProductToCart(title, num, productImg);
    updateTotal();

}

//Boton comprar
function buyButtonClicked() {
    let totalProducts = (document.getElementsByClassName("cart-quantity")).length;;
    if (totalProducts == 0) {
        alert("Ningun producto seleccionado");
    } else {
        alert("Orden hecha");
        var cartContent = document.getElementsByClassName("cart-content")[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        cartIcon.innerHTML = " ";
        updateTotal();
    }
}

//Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//Funcion eliminar elementos
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    let totalProducts = ((document.getElementsByClassName("cart-quantity")).length) + 1;
    totalProducts--;
    if (totalProducts == 0) {
        cartIcon.innerHTML = " ";
    } else {
        cartIcon.innerHTML = " " + totalProducts;
    }
    updateTotal();
}

//Add TO cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    let totalProducts = (document.getElementsByClassName("cart-quantity")).length;;
    totalProducts++;
    cartIcon.innerHTML = " " + totalProducts;
    addProductToCart(title, price, productImg);
    updateTotal();
}

//Añadir elementos
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Ya has añadido este articulo al carrito");
            return;
        }
    }
    var cartBoxContent = `
                <img src="${productImg}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <!--Remove Cart-->
                <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    updateTotal();
}

//Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    // If price Contain some Cents Value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

//Shop Galery
const gallery = document.querySelector('.shop-content');
const container = document.querySelector('.container-pop');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.modal-desc');
const modalPrice = document.querySelector('.modal-price');
const modelPriceText = document.querySelector('.modal-price');
const prev = document.querySelector('.prevP');
const next = document.querySelector('.nextP');
const dotsP = document.querySelector('.dots');
const close = document.querySelector('.close');
let images = gallery.getElementsByTagName('img');
let index = 0;

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click',
        function () {
            container.style.display = 'block';
            index = i;
            showModal();
        });
}

function showModal() {
    modalImg.src = images[index].src;
    modalTitle.textContent = titles[index];
    modalDesc.innerHTML = desc[index];
    modalPrice.innerHTML = "Precio: $" + pices[index];
    dotsP.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        let dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === index) dot.classList.add('active');
        dot.addEventListener('click', function () {
            index = i;
            showModal();
        });
        dotsP.appendChild(dot);
    }
}

function plusSlides(n) {
    index += n;
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    showModal();
}

prev.addEventListener('click', function () {
    plusSlides(-1);
});

next.addEventListener('click', function () {
    plusSlides(1);
});

close.addEventListener('click', function () {
    container.style.display = 'none';
});

container.addEventListener('click', function (event) {
    if (event.target == container) {
        container.style.display = 'none';
    }
});

//Animaciones SEC1
let currentSlide = 0;
const slides = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const title = document.querySelector("h1");

function showSlide(index) {
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    title.textContent = titles[index]; // actualiza el título completo
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
    showModal();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function dotClicked(index) {
    showSlide(index);
}

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
        dotClicked(i);
    });
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

setInterval(() => {
    nextSlide();
}, 10000);