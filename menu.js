/* ================================================= */
/* ================= MAIN CATEGORIES =============== */
/* ================================================= */

const categoryButtons =
    document.querySelectorAll(".category-card");


const foodGroups = {
    pizza: document.getElementById("pizzaFoods"),
    drinks: document.getElementById("drinksFoods"),
    sides: document.getElementById("sidesFoods")
};


/* ================================================= */
/* ================= FILTER ELEMENTS =============== */
/* ================================================= */

const filterSubcategory =
    document.getElementById("filterSubcategory");

const minPrice =
    document.getElementById("minPrice");

const maxPrice =
    document.getElementById("maxPrice");

const sortProducts =
    document.getElementById("sortProducts");

const applyFilters =
    document.getElementById("applyFilters");

const clearFilters =
    document.getElementById("clearFilters");


let currentCategory = "pizza";


/* ================================================= */
/* ================= SHOW CATEGORY ================= */
/* ================================================= */

function showCategory(category) {

    currentCategory = category;

    Object.values(foodGroups).forEach(group => {

        if (group) {
            group.classList.add("hidden");
        }

    });


    if (foodGroups[category]) {

        foodGroups[category]
            .classList.remove("hidden");

    }


    resetFilters();

    filterAndSortProducts();

}


/* ================================================= */
/* ================= CATEGORY CLICK ================ */
/* ================================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        showCategory(category);

    });

});


/* ================================================= */
/* ================= GET CURRENT CARDS ============= */
/* ================================================= */

function getCurrentCards() {

    if (!foodGroups[currentCategory]) {
        return [];
    }


    return Array.from(
        foodGroups[currentCategory]
            .querySelectorAll(".food-card")
    );

}


/* ================================================= */
/* ================= FILTER + SORT ================= */
/* ================================================= */

function filterAndSortProducts() {

    const cards =
        getCurrentCards();


    const selectedSubcategory =
        filterSubcategory
            ? filterSubcategory.value.toLowerCase()
            : "all";


    const minimum =
        minPrice && minPrice.value
            ? parseFloat(minPrice.value)
            : 0;


    const maximum =
        maxPrice && maxPrice.value
            ? parseFloat(maxPrice.value)
            : Infinity;


    cards.forEach(card => {

        const cardSubcategory =
            (
                card.dataset.subcategory ||
                ""
            ).toLowerCase();


        const cardPrice =
            parseFloat(
                card.dataset.price || 0
            );


        const matchesSubcategory =
            selectedSubcategory === "all" ||
            cardSubcategory === selectedSubcategory;


        const matchesPrice =
            cardPrice >= minimum &&
            cardPrice <= maximum;


        if (
            matchesSubcategory &&
            matchesPrice
        ) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });


    /* ================= SORT ================= */

    const sortValue =
        sortProducts
            ? sortProducts.value
            : "default";


    if (sortValue === "default") {
        return;
    }


    const visibleCards =
        cards.filter(card => {

            return card.style.display !== "none";

        });


    visibleCards.sort((a, b) => {

        switch (sortValue) {

            case "price-low":

                return (
                    parseFloat(
                        a.dataset.price || 0
                    ) -
                    parseFloat(
                        b.dataset.price || 0
                    )
                );


            case "price-high":

                return (
                    parseFloat(
                        b.dataset.price || 0
                    ) -
                    parseFloat(
                        a.dataset.price || 0
                    )
                );


            case "name-az":

                return (
                    (a.dataset.name || "")
                        .localeCompare(
                            b.dataset.name || ""
                        )
                );


            case "name-za":

                return (
                    (b.dataset.name || "")
                        .localeCompare(
                            a.dataset.name || ""
                        )
                );


            case "popular":

                return (
                    parseFloat(
                        b.dataset.popularity || 0
                    ) -
                    parseFloat(
                        a.dataset.popularity || 0
                    )
                );


            case "newest":

                return (
                    parseFloat(
                        b.dataset.newness || 0
                    ) -
                    parseFloat(
                        a.dataset.newness || 0
                    )
                );


            default:
                return 0;

        }

    });


    const container =
        foodGroups[currentCategory];


    visibleCards.forEach(card => {

        container.appendChild(card);

    });

}


/* ================================================= */
/* ================= APPLY FILTERS ================= */
/* ================================================= */

if (applyFilters) {

    applyFilters.addEventListener(
        "click",
        filterAndSortProducts
    );

}


if (filterSubcategory) {

    filterSubcategory.addEventListener(
        "change",
        filterAndSortProducts
    );

}


if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        filterAndSortProducts
    );

}


/* ================================================= */
/* ================= CLEAR FILTERS ================= */
/* ================================================= */

if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        function () {

            resetFilters();

            filterAndSortProducts();

        }
    );

}


function resetFilters() {

    if (filterSubcategory) {
        filterSubcategory.value = "all";
    }


    if (minPrice) {
        minPrice.value = "";
    }


    if (maxPrice) {
        maxPrice.value = "";
    }


    if (sortProducts) {
        sortProducts.value = "default";
    }

}


/* ================================================= */
/* ================= FAVORITES ===================== */
/* ================================================= */

const FAVORITES_KEY = "oven2doorFavorites";


/* ================================================= */
/* GET SAVED FAVORITES */
/* ================================================= */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(FAVORITES_KEY)
        ) || [];

    } catch (error) {

        console.error(
            "Unable to read favorites:",
            error
        );

        return [];

    }

}


/* ================================================= */
/* SAVE FAVORITES */
/* ================================================= */

function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/* ================================================= */
/* CHECK IF PRODUCT IS FAVORITED */
/* ================================================= */

function isFavorite(productName) {

    const favorites = getFavorites();

    return favorites.some(
        product => product.name === productName
    );

}


/* ================================================= */
/* UPDATE FAVORITES COUNT */
/* ================================================= */

function updateFavoritesCount() {

    const countElement =
        document.getElementById("favoritesCount");

    if (!countElement) {
        return;
    }

    const favorites =
        getFavorites();

    countElement.textContent =
        favorites.length;

}


/* ================================================= */
/* UPDATE FAVORITE BUTTON ICONS */
/* ================================================= */

function updateFavoriteButtons() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            const card =
                button.closest(".food-card");

            if (!card) {
                return;
            }

            const name =
                card.dataset.name || "";

            const icon =
                button.querySelector("i");

            if (!icon) {
                return;
            }

            if (isFavorite(name)) {

                button.classList.add(
                    "favorite-active"
                );

                button.classList.add("active");

                button.setAttribute(
                    "aria-label",
                    "Remove from favorites"
                );

                button.setAttribute(
                    "title",
                    "Remove from favorites"
                );

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

            } else {

                button.classList.remove(
                    "favorite-active"
                );

                button.classList.remove(
                    "active"
                );

                button.setAttribute(
                    "aria-label",
                    "Add to favorites"
                );

                button.setAttribute(
                    "title",
                    "Add to favorites"
                );

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

            }

        });

}


/* ================================================= */
/* FAVORITE BUTTON CLICK */
/* ================================================= */

document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const card =
                    button.closest(".food-card");

                if (!card) {
                    return;
                }

                const product = {

                    name:
                        card.dataset.name || "",

                    description:
                        card.dataset.description || "",

                    price:
                        parseFloat(
                            card.dataset.price || 0
                        ),

                    image:
                        card.dataset.image || "",

                    subcategory:
                        card.dataset.subcategory || "",

                    flavor:
                        card.dataset.flavor || ""

                };

                let favorites =
                    getFavorites();

                const existingIndex =
                    favorites.findIndex(
                        item =>
                            item.name === product.name
                    );


                /* ========================= */
                /* REMOVE FAVORITE */
                /* ========================= */

                if (existingIndex !== -1) {

                    favorites.splice(
                        existingIndex,
                        1
                    );

                    saveFavorites(
                        favorites
                    );

                    updateFavoriteButtons();
                    updateFavoritesCount();

                    return;
                }


                /* ========================= */
                /* ADD FAVORITE */
                /* ========================= */

                favorites.push(product);

                saveFavorites(
                    favorites
                );

                updateFavoriteButtons();
                updateFavoritesCount();

            }
        );

    });


/* ================================================= */
/* FAVORITES PAGE BUTTON */
/* ================================================= */

const favoritesPageBtn =
    document.getElementById(
        "favoritesPageBtn"
    );


if (favoritesPageBtn) {

    favoritesPageBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "wishlist.html";

        }
    );

}


/* ================================================= */
/* INITIAL FAVORITES STATE */
/* ================================================= */

updateFavoriteButtons();
updateFavoritesCount();


/* ================================================= */
/* ================= FLAVOR PICKER ================= */
/* ================================================= */

document.querySelectorAll(".flavor-picker").forEach(picker => {

    const flavorButton = picker.querySelector(".flavor-btn");
    const flavorOptions = picker.querySelectorAll(".flavor-option");
    const selectedFlavor = picker.querySelector(".selected-flavor");

    // Open / close flavor options
    flavorButton.addEventListener("click", (event) => {
        event.stopPropagation();
        picker.classList.toggle("active");
    });

    // Select flavor
    flavorOptions.forEach(option => {

        option.addEventListener("click", (event) => {

            event.stopPropagation();

            const flavor = option.dataset.flavor;

            // Update selected flavor text
            selectedFlavor.textContent = "Selected: " + flavor;

            // Remove previous selection
            flavorOptions.forEach(item => {
                item.classList.remove("selected");
            });

            // Highlight selected option
            option.classList.add("selected");

            // CLOSE THE FLAVOR OPTIONS
            picker.classList.remove("active");
        });

    });

});

/* ================================================= */
/* ================ FLAVOR SELECT ================== */
/* ================================================= */

document
    .querySelectorAll(".flavor-select")
    .forEach(select => {

        select.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );


        select.addEventListener(
            "change",
            function () {

                const card =
                    select.closest(".food-card");


                if (!card) {
                    return;
                }


                card.dataset.flavor =
                    select.value;

            }
        );

    });


/* ================================================= */
/* ================= QUANTITY ======================= */
/* ================================================= */

document
    .querySelectorAll(".food-card")
    .forEach(card => {

        const minus =
            card.querySelector(".minus");

        const plus =
            card.querySelector(".plus");

        const quantity =
            card.querySelector(".quantity");


        let count = 1;


        if (plus && quantity) {

            plus.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    count++;


                    quantity.textContent =
                        count;

                }
            );

        }


        if (minus && quantity) {

            minus.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    if (count > 1) {

                        count--;

                        quantity.textContent =
                            count;

                    }

                }
            );

        }

    });


/* ================================================= */
/* ================= FOOD MODAL ==================== */
/* ================================================= */

const foodModal =
    document.getElementById("foodModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalCategory =
    document.getElementById("modalCategory");

const modalQuantity =
    document.getElementById("modalQuantity");

const modalMinus =
    document.getElementById("modalMinus");

const modalPlus =
    document.getElementById("modalPlus");

const modalAddCart =
    document.getElementById("modalAddCart");


let selectedCard = null;

let modalCount = 1;

let selectedFlavor = "";


/* ================================================= */
/* ================= OPEN MODAL ==================== */
/* ================================================= */

document
    .querySelectorAll(".food-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            function (event) {

                /*
                    Don't open modal when clicking:

                    - Favorite
                    - Add cart
                    - Quantity
                    - Flavor
                */

                if (
                    event.target.closest(".favorite-btn") ||
                    event.target.closest(".add-cart-btn") ||
                    event.target.closest(".minus") ||
                    event.target.closest(".plus") ||
                    event.target.closest(".flavor-btn") ||
                    event.target.closest(".flavor-select")
                ) {

                    return;

                }


                selectedCard = card;

                modalCount = 1;


                if (modalQuantity) {

                    modalQuantity.textContent =
                        modalCount;

                }


                const name =
                    card.dataset.name || "";


                const description =
                    card.dataset.description || "";


                const price =
                    card.dataset.price || "0";


                const image =
                    card.dataset.image || "";


                /* Get selected flavor */

                selectedFlavor =
                    card.dataset.flavor || "";


                /* ================= CATEGORY ================= */

                const foodGroup =
                    card.closest(".food-grid");


                let categoryName =
                    "FOOD";


                if (
                    foodGroup &&
                    foodGroup.id === "pizzaFoods"
                ) {

                    categoryName = "PIZZA";

                }

                else if (
                    foodGroup &&
                    foodGroup.id === "drinksFoods"
                ) {

                    categoryName = "DRINKS";

                }

                else if (
                    foodGroup &&
                    foodGroup.id === "sidesFoods"
                ) {

                    categoryName = "SIDE DISHES";

                }


                /* ================= MODAL DATA ================= */

                if (modalImage) {

                    modalImage.src =
                        image;

                    modalImage.alt =
                        name;

                }


                if (modalName) {

                    modalName.textContent =
                        name;

                }


                if (modalDescription) {

                    modalDescription.textContent =
                        description;

                }


                if (modalPrice) {

                    modalPrice.textContent =
                        "₱" + price;

                }


                if (modalCategory) {

                    modalCategory.textContent =
                        categoryName;

                }


                /* ================= SHOW MODAL ================= */

                if (foodModal) {

                    foodModal.classList.add("show");

                }


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


/* ================================================= */
/* ================= MODAL QUANTITY ================ */
/* ================================================= */

if (modalPlus) {

    modalPlus.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            modalCount++;


            if (modalQuantity) {

                modalQuantity.textContent =
                    modalCount;

            }

        }
    );

}


if (modalMinus) {

    modalMinus.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (modalCount > 1) {

                modalCount--;


                if (modalQuantity) {

                    modalQuantity.textContent =
                        modalCount;

                }

            }

        }
    );

}

/* ================= CLOSE MODAL =================== */


function closeModal() {

    if (foodModal) {

        foodModal.classList.remove("show");

    }


    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (foodModal) {

    foodModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === foodModal
            ) {

                closeModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);

/* ================= ADD TO CART =================== */

document
    .querySelectorAll(".add-cart-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const card =
                    button.closest(".food-card");


                if (!card) {
                    return;
                }


                const name =
                    card.dataset.name ||
                    "Product";


                const quantityElement =
                    card.querySelector(".quantity");


                const quantity =
                    quantityElement
                        ? quantityElement.textContent
                        : "1";


                const flavor =
                    card.dataset.flavor || "";


                let message =
                    quantity +
                    " × " +
                    name;


                if (flavor) {

                    message +=
                        " (" +
                        flavor +
                        ")";

                }


                alert(
                    message +
                    " added to cart!"
                );

            }
        );

    });

/* ============== MODAL ADD TO CART ================ */

if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (!selectedCard) {
                return;
            }


            const name =
                selectedCard.dataset.name ||
                "Product";


            const flavor =
                selectedCard.dataset.flavor ||
                "";


            let message =
                modalCount +
                " × " +
                name;


            if (flavor) {

                message +=
                    " (" +
                    flavor +
                    ")";

            }


            alert(
                message +
                " added to cart!"
            );


            closeModal();

        }
    );

}

/* ================= INITIAL LOAD =================== */

showCategory("pizza");


/* Activate Pizza category */

const firstCategory =
    document.querySelector(
        '.category-card[data-category="pizza"]'
    );


if (firstCategory) {

    categoryButtons.forEach(button => {

        button.classList.remove("active");

    });


    firstCategory.classList.add("active");

}


