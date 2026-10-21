document.addEventListener("DOMContentLoaded", function () {

    const cartItems = document.querySelectorAll(".cart-item");

    const subtotalElement = document.getElementById("subtotal");
    const cartTotalElement = document.getElementById("cart-total");

    const discountElement = document.querySelector(".discount");


    // =========================================
    // UPDATE CART TOTALS
    // =========================================

    function updateCartTotals() {

        let subtotal = 0;


        cartItems.forEach(function (item) {

            // Get product price
            const priceText = item.querySelector(".item-price").textContent;

            const price = parseFloat(
                priceText.replace(/[₱,]/g, "")
            ) || 0;


            // Get quantity
            const quantityInput = item.querySelector(
                '.quantity input[type="number"]'
            );

            let quantity = parseInt(quantityInput.value) || 1;


            // Prevent quantity from going below 1
            if (quantity < 1) {
                quantity = 1;
                quantityInput.value = 1;
            }


            // Calculate product total
            const itemTotal = price * quantity;


            // Update product TOTAL
            const itemTotalElement =
                item.querySelector(".item-total");

            itemTotalElement.textContent =
                `₱${itemTotal.toFixed(2)}`;


            // Add product total to SUBTOTAL
            subtotal += itemTotal;

        });


        // =========================================
        // DISCOUNT
        // =========================================

        let discount = 0;


        if (discountElement) {

            const discountText =
                discountElement.textContent;

            discount =
                parseFloat(
                    discountText.replace(/[₱,−\-\s]/g, "")
                ) || 0;

        }


        // =========================================
        // FINAL TOTAL
        // =========================================

        const total = subtotal - discount;


        // =========================================
        // UPDATE SUMMARY
        // =========================================

        subtotalElement.textContent =
            `₱${subtotal.toFixed(2)}`;

        cartTotalElement.textContent =
            `₱${total.toFixed(2)}`;

    }


    // =========================================
    // QUANTITY BUTTONS
    // =========================================

    cartItems.forEach(function (item) {

        const quantityInput =
            item.querySelector(
                '.quantity input[type="number"]'
            );

        const quantityButtons =
            item.querySelectorAll(".qty-btn");


        quantityButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                let quantity =
                    parseInt(quantityInput.value) || 1;


                if (button.textContent.trim() === "+") {

                    quantity++;

                } else if (
                    button.textContent.trim() === "−" ||
                    button.textContent.trim() === "-"
                ) {

                    quantity--;

                }


                if (quantity < 1) {
                    quantity = 1;
                }


                quantityInput.value = quantity;


                // Recalculate everything
                updateCartTotals();

            });

        });


        // =========================================
        // MANUAL QUANTITY INPUT
        // =========================================

        quantityInput.addEventListener(
            "input",
            function () {

                if (this.value < 1 || this.value === "") {
                    return;
                }

                updateCartTotals();

            }
        );

    });


    // =========================================
    // DELETE PRODUCT
    // =========================================

    cartItems.forEach(function (item) {

        const deleteButton =
            item.querySelector(".delete-btn");


        deleteButton.addEventListener(
            "click",
            function () {

                item.remove();

                // Recalculate subtotal after deleting
                updateCartTotals();

            }
        );

    });


    // =========================================
    // INITIAL CALCULATION
    // =========================================

    updateCartTotals();

});