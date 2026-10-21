/* =====================================================
   OVEN2DOOR WISHLIST
===================================================== */

const FAVORITES_KEY = "oven2doorFavorites";


/* =====================================================
   GET FAVORITES
===================================================== */

function getFavorites() {

    try {

        const favorites = localStorage.getItem(FAVORITES_KEY);

        if (!favorites) {
            return [];
        }

        const parsedFavorites = JSON.parse(favorites);

        return Array.isArray(parsedFavorites)
            ? parsedFavorites
            : [];

    } catch (error) {

        console.error("Error reading favorites:", error);

        return [];
    }
}


/* =====================================================
   SAVE FAVORITES
===================================================== */

function saveFavorites(favorites) {

    try {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );

    } catch (error) {

        console.error("Error saving favorites:", error);
    }
}


/* =====================================================
   UPDATE FAVORITES COUNT
===================================================== */

function updateWishlistCount() {

    const favorites = getFavorites();

    const countElement =
        document.getElementById("wishlistCount");

    if (!countElement) {
        return;
    }

    const count = favorites.length;

    if (count === 1) {

        countElement.textContent = "1 saved item";

    } else {

        countElement.textContent =
            `${count} saved items`;
    }
}


/* =====================================================
   CREATE WISHLIST CARD
===================================================== */

function createWishlistCard(product, index) {

    const card = document.createElement("article");

    card.className = "wishlist-card";

    const price = Number(product.price) || 0;

    const image =
        product.image ||
        "pizzapics/oven2doorlogo.png";

    const description =
        product.description ||
        "Delicious Oven2Door favorite.";

    card.innerHTML = `

        <div class="wishlist-image">

            <img
                src="${image}"
                alt="${product.name || "Oven2Door product"}"
            >

            <button
                type="button"
                class="remove-favorite"
                data-index="${index}"
                aria-label="Remove ${product.name || "product"} from favorites"
                title="Remove from favorites"
            >
                <i class="fa-solid fa-heart"></i>
            </button>

        </div>


        <div class="wishlist-content">

            <h3>
                ${product.name || "Oven2Door Product"}
            </h3>

            <p class="wishlist-description">
                ${description}
            </p>

            <div class="wishlist-price">
                ₱${price.toFixed(2)}
            </div>


            <div class="wishlist-actions">

                <button
                    type="button"
                    class="view-menu-btn"
                    data-product="${product.name || ""}"
                >
                    <i class="fa-solid fa-utensils"></i>
                    View in Menu
                </button>


                <button
                    type="button"
                    class="buy-now-btn"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-bag-shopping"></i>
                    Buy Now
                </button>

            </div>

        </div>
    `;

    return card;
}


/* =====================================================
   DISPLAY FAVORITES
===================================================== */

function displayFavorites() {

    const grid =
        document.getElementById("wishlistGrid");

    const emptyState =
        document.getElementById("emptyWishlist");

    if (!grid || !emptyState) {
        return;
    }

    const favorites = getFavorites();

    grid.innerHTML = "";

    updateWishlistCount();


    /* EMPTY */

    if (favorites.length === 0) {

        grid.style.display = "none";
        emptyState.style.display = "flex";

        return;
    }


    /* HAS FAVORITES */

    grid.style.display = "grid";
    emptyState.style.display = "none";


    favorites.forEach((product, index) => {

        const card =
            createWishlistCard(product, index);

        grid.appendChild(card);
    });


    attachWishlistEvents();
}


/* =====================================================
   REMOVE FAVORITE
===================================================== */

function removeFavorite(index) {

    const favorites = getFavorites();

    if (
        index < 0 ||
        index >= favorites.length
    ) {
        return;
    }

    favorites.splice(index, 1);

    saveFavorites(favorites);

    displayFavorites();
}


/* =====================================================
   BUY NOW
===================================================== */

function buyNow(index) {

    const favorites = getFavorites();

    const product = favorites[index];

    if (!product) {
        return;
    }


    /*
        Save the selected product as a Buy Now item.

        This gives the checkout page access to the
        product that the user selected.
    */

    localStorage.setItem(
        "oven2doorBuyNow",
        JSON.stringify(product)
    );


    /*
        Also save it as a cart item.

        This allows the checkout/cart system to use
        the selected product if it reads oven2doorCart.
    */

    let cart = [];

    try {

        const savedCart =
            localStorage.getItem("oven2doorCart");

        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            }
        }

    } catch (error) {

        console.error(
            "Error reading cart:",
            error
        );
    }


    /*
        Remove an existing copy of the same product
        before adding the Buy Now item.
    */

    cart = cart.filter(item => {

        return item.name !== product.name;
    });


    /*
        Add product to cart with quantity 1.
    */

    cart.push({
        ...product,
        quantity: 1
    });


    localStorage.setItem(
        "oven2doorCart",
        JSON.stringify(cart)
    );


    /*
        Go to checkout.
    */

    window.location.href = "checkout.html";
}


/* =====================================================
   ATTACH WISHLIST EVENTS
===================================================== */

function attachWishlistEvents() {

    /* REMOVE FAVORITE */

    const removeButtons =
        document.querySelectorAll(".remove-favorite");

    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);

                removeFavorite(index);
            }
        );

    });


    /* VIEW IN MENU */

    const viewButtons =
        document.querySelectorAll(".view-menu-btn");

    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                window.location.href =
                    "menu.html";
            }
        );

    });


    /* BUY NOW */

    const buyButtons =
        document.querySelectorAll(".buy-now-btn");

    buyButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);

                buyNow(index);
            }
        );

    });
}


/* =====================================================
   BACK TO MENU
===================================================== */

const backToMenu =
    document.getElementById("backToMenu");

if (backToMenu) {

    backToMenu.addEventListener(
        "click",
        function () {

            window.location.href =
                "menu.html";
        }
    );
}


/* =====================================================
   BROWSE MENU
===================================================== */

const browseMenu =
    document.getElementById("browseMenu");

if (browseMenu) {

    browseMenu.addEventListener(
        "click",
        function () {

            window.location.href =
                "menu.html";
        }
    );
}


/* =====================================================
   UPDATE WHEN LOCALSTORAGE CHANGES
===================================================== */

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === FAVORITES_KEY) {

            displayFavorites();
        }
    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayFavorites();
    }
);