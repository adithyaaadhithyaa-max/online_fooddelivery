// Food items
const foods = [
    {
        id: 1,
        name: "Cheese Burger",
        category: "Burger",
        price: 120,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 2,
        name: "Chicken Burger",
        category: "Burger",
        price: 150,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500"
    },
    {
        id: 3,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 300,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
    },
    {
        id: 5,
        name: "Cold Coffee",
        category: "Drinks",
        price: 90,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 6,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 100,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    }
];

let cart = [];

// Display food items
function displayFood(items) {
    const container = document.getElementById("food-container");

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>No food items found.</p>";
        return;
    }

    items.forEach(food => {
        container.innerHTML += `
            <div class="food-card">
                <img src="${food.image}" alt="${food.name}">
                <h3>${food.name}</h3>
                <p>₹${food.price}</p>
                <button onclick="addToCart(${food.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add food to cart
function addToCart(id) {
    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...food, quantity: 1});
    }

    updateCart();

    alert(food.name + " added to cart!");
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.name} - ₹${item.price}
                </span>

                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    ${item.quantity}

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>
                </div>

                <button class="remove-btn"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = count;
}

// Change quantity
function changeQuantity(id, amount) {
    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

// Remove item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Filter food by category
function filterFood(category) {
    if (category === "All") {
        displayFood(foods);
    } else {
        const filtered = foods.filter(
            food => food.category === category
        );

        displayFood(filtered);
    }
}

// Search food
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(searchValue)
    );

    displayFood(filtered);
});

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "Thank you for ordering from FoodieExpress!\n" +
        "Your total amount is ₹" + total +
        "\nThis is a demo order. No payment was processed."
    );

    cart = [];
    updateCart();
}

// Initial display
displayFood(foods);
updateCart();