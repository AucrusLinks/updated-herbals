
const header = document.querySelector("header")



window.addEventListener("scroll",function(){
    header.classList.toggle( "sticky" , window.scrollY > 0);
});


var menu = document.querySelector("#menu-icon");
var navber = document.querySelector(".nav-bar");

function toggle(){
    menu.classList.toggle("bx-x");
    navber.classList.toggle('open');
}

let openshop = document.querySelector(".shoping")
let closeshop = document.querySelector(".closeshopping")
let list = document.querySelector(".list")
let listcard = document.querySelector(".listcart")
let body = document.querySelector("body")
let total = document.querySelector(".total")
let quantity = document.querySelector(".quantity")
let cart = document.querySelector(".cart")


openshop.addEventListener("click", ()=> {
    cart.style.top = '0';
    cart.style.transition = 'transform 0.5s ease'; // Smooth animation
});

closeshop.addEventListener("click", ()=> {
    cart.style.top = '-200%';
    cart.style.transition = 'transform 0.5s ease'; // Smooth animation
});


//openshop.addEventListener("click",()=>{
//    cart.style.top = '0'
//})

//closeshop.addEventListener("click",()=>{
//    cart.style.top = '-200%'
//})

let products = [
    {
        id:1,
        name:"Black Rice",
        qt:"Quantity: " + "250Gm",
        image:'img/products/black rice1.png',
        description:"Black Rice is a nutrient-dense, antioxidant-rich rice with a deep purple hue, offering a slightly nutty flavor. It's high in fiber, iron, and protein, promoting heart health and digestion.",
        price: 100
    },
    {
        id:2,
        name:"Idly Podi",
        qt:"Quantity: " + "250Gm",
        image:'img/products/idly podi1.png',
        description:"Idly Podi, also known as 'gunpowder,' is a spicy South Indian condiment made from roasted lentils, spices, and seeds. It's typically mixed with oil and enjoyed with idlis or dosas.",
        price: 125
    },
    {
        id:3,
        name:"Millet Dosa mix",
        qt:"Quantity: " + "250Gm",
        image:'img/products/millet dosa mix1.png',
        description:"Millet Dosa Mix is a nutritious, ready-to-make blend of millets and lentils, offering a fiber-rich, gluten-free, and wholesome option for a healthy breakfast.",
        price: 95
    },
    {
        id:4,
        name:"Multi Millet Magic mix",
        qt:"Quantity: " + "250Gm",
        image:'img/products/multi millet magic mix1.png',
        description:"Multi Millet Mix is a nutritious blend of various millets, rich in fiber, protein, and essential nutrients. It's a versatile, gluten-free option for preparing healthy porridges, dosas, or rotis",
        price: 100
    },
    {
        id:5,
        name:"Parupu Podi",
        qt:"Quantity: " + "250Gm",
        image:'img/products/parupu podi1.png',
        description:"Parupu Podi is a flavorful South Indian spice mix made from roasted lentils and spices. It's commonly used as a condiment for rice or as a seasoning for various dishes.",
        price: 150
    },
    {
        id:6,
        name:"Sprouted Mix",
        qt:"Quantity: " + "250Gm",
        image:'img/products/sprouted mix1.png',
        description:"Sprouted Mix is a nutritious blend of sprouted grains and legumes, rich in protein, vitamins, and enzymes. It enhances digestion and adds a wholesome touch to salads and soups.",
        price: 110
    }
];

let listcards = [];
function initapp() {
    products.forEach((value, key) => {
        let newdiv = document.createElement('div');
        newdiv.classList.add("item");

        // Add a delay for each item
        newdiv.style.setProperty('--animation-delay', `${key * 0.1}s`);

        newdiv.innerHTML = `
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 40%;"></div>
        `;
        list.appendChild(newdiv);

        let img = new Image();
        img.src = value.image;

        img.onload = () => {
            newdiv.innerHTML = `
            <img src="${value.image}" class="loaded" />
            <div class="title"> ${value.name}</div>
            <div class="qt"> ${value.qt}</div>
            <div class="description"> ${value.description}</div>
            <div class="price"> ₹${value.price}</div>  <!-- Added Rupee symbol -->
            <button onclick="addtocart(${key})">Add To Cart</button>
            `;
        };
    });
}


 initapp();

 function addtocart(key) {
    if (listcards[key] == null) {
        listcards[key] = products[key];
        listcards[key].quantity = 1;
    }
    reloadcard();

    // Add bounce animation when an item is added to the cart
    let quantityIcon = document.querySelector(".quantity");
    quantityIcon.classList.add("quantity-added");

    // Remove the class after animation completes (1 second)
    setTimeout(() => {
        quantityIcon.classList.remove("quantity-added");
    }, 1000);
}




function reloadcard() {
    listcard.innerHTML = ''; // Clear the cart list
    total.innerHTML = '0';   // Clear total price
    quantity.innerText = '0'; // Clear quantity display

    if (listcards.length === 0 || listcards.every(item => item === null)) {
        // If the cart is empty, display a message
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "There is nothing in the cart.";
        emptyMessage.style.color = "grey"; // Optional: styling for the message
        emptyMessage.style.fontWeight = "bold"; // Bold text
        emptyMessage.style.marginLeft="180px";
        emptyMessage.style.width="182px"
        emptyMessage.style.position="relative"
        emptyMessage.style.top="20%"
        listcard.appendChild(emptyMessage);
    } else {
        let count = 0;
        let totalprice = 0;

        listcards.forEach((value, key) => {
            if (value != null) {
                totalprice += value.price * value.quantity;
                count += value.quantity;

                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="${value.image}"></div>
                    <div>${value.name}</div>
                    <div>${value.price * value.quantity}</div>
                    <div>
                        <button onclick="changequantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changequantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
                `;
                listcard.appendChild(newDiv);
            }
        });
        total.innerHTML = "₹"+totalprice + " Buy Now"; // Set the total price when items are present
        quantity.innerText = count;     // Update the quantity display
    }
}




 function changequantity(key, quantity) {
    if (quantity == 0) {
        delete listcards[key];
    } else {
        listcards[key].quantity = quantity;
    }
    reloadcard();
}

img.onload = () => {
    newdiv.innerHTML = `
        <a href="product.html?id=${value.id}">
            <img src="${value.image}" class="loaded" />
            <div class="title"> ${value.name}</div>
            <div class="price"> ₹${value.price}</div>
        </a>
        <button onclick="addtocart(${key})">Add To Cart</button>
    `;
};

function wb(){
    window.open("https://wa.me/919488019244", '_blank');
}
