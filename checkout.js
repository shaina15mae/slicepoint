document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       STEP 1
    ========================= */

    const delivery = document.getElementById("delivery");

    const step1 = document.getElementById("step1");
    const status1 = document.getElementById("status1");

    const shippingPrice =
        document.getElementById("shippingPrice");

    const summaryShipping =
        document.getElementById("summaryShipping");

    const orderTotal =
        document.getElementById("orderTotal");

    const step1Message =
        document.getElementById("step1Message");


    const subtotal = 800;

    let deliverySelected = false;


    /* =========================
       DELIVERY SELECTION
    ========================= */

    const deliveryOption =
    document.querySelector(".delivery-option");


deliveryOption.addEventListener("click", function (event) {

    // If already selected, unselect it
    if (deliverySelected) {

        event.preventDefault();

        delivery.checked = false;

        deliverySelected = false;

        // Reset prices
        shippingPrice.textContent = "₱0";
        summaryShipping.textContent = "₱0";
        orderTotal.textContent = "₱800";

        // Reset Step 1
        step1.classList.remove("completed");
        status1.textContent = "REQUIRED";

        step1Message.textContent =
            "Please select a delivery option to continue.";

        // Explicitly remove selected styling if present
        deliveryOption.classList.remove("selected");

        checkAllSteps();

    }

});


delivery.addEventListener("change", function () {

    if (delivery.checked) {

        deliverySelected = true;

        // Apply selected styling
        deliveryOption.classList.add("selected");

        shippingPrice.textContent = "₱60";
        summaryShipping.textContent = "₱60";
        orderTotal.textContent = "₱860";

        step1.classList.add("completed");
        status1.textContent = "COMPLETED";

        step1Message.textContent =
            "Delivery selected. You can proceed to Step 2.";

        checkAllSteps();

    }

});


    /* =========================
       QUANTITY CONTROLS
    ========================= */

    const quantityControls =
        document.querySelectorAll(".quantity-controls");


    quantityControls.forEach(function (control) {

        const minus =
            control.querySelector(".minus");

        const plus =
            control.querySelector(".plus");

        const value =
            control.querySelector(".quantity-value");


        minus.addEventListener("click", function () {

            let quantity =
                parseInt(value.textContent);

            if (quantity > 1) {

                quantity--;

                value.textContent = quantity;

            }

        });


        plus.addEventListener("click", function () {

            let quantity =
                parseInt(value.textContent);

            quantity++;

            value.textContent = quantity;

        });

    });



    /* =========================
       STEP 2
    ========================= */

    const addressForm =
        document.getElementById("addressForm");

    const step2 =
        document.getElementById("step2");

    const status2 =
        document.getElementById("status2");

    const requiredFields =
        addressForm.querySelectorAll(
            "input[required], select[required]"
        );


    function checkAddressForm() {

        let allFilled = true;


        requiredFields.forEach(function (field) {

            if (field.value.trim() === "") {

                allFilled = false;

            }

        });


        if (allFilled) {

            step2.classList.add("completed");

            status2.textContent = "COMPLETED";

            document.getElementById(
                "step2Message"
            ).textContent =
                "Delivery address completed.";

        } else {

            step2.classList.remove("completed");

            status2.textContent = "REQUIRED";

            document.getElementById(
                "step2Message"
            ).textContent =
                "Complete all required fields to continue.";

        }


        checkAllSteps();

    }


    requiredFields.forEach(function (field) {

        field.addEventListener(
            "input",
            checkAddressForm
        );

        field.addEventListener(
            "change",
            checkAddressForm
        );

    });



/* =========================
   STEP 3
========================= */

const paymaya =
    document.getElementById("paymaya");

const step3 =
    document.getElementById("step3");

const status3 =
    document.getElementById("status3");

const paymentInfo =
    document.getElementById("paymentInfo");

const paymentOption =
    document.querySelector(".payment-option");


paymentOption.addEventListener("click", function (event) {

    // Prevent the label from automatically changing the radio
    event.preventDefault();

    // If already selected → UNSELECT
    if (paymaya.checked) {

        paymaya.checked = false;

        paymentOption.classList.remove("selected");

        step3.classList.remove("completed");

        status3.textContent = "REQUIRED";

        paymentInfo.classList.remove("show");

    }

    // If not selected → SELECT
    else {

        paymaya.checked = true;

        paymentOption.classList.add("selected");

        step3.classList.add("completed");

        status3.textContent = "COMPLETED";

        paymentInfo.classList.add("show");

    }

    checkAllSteps();

});



    /* =========================
       CHECK ALL STEPS
    ========================= */

    const completeOrder =
        document.getElementById("completeOrder");


    function checkAllSteps() {

        const step1Complete =
            step1.classList.contains("completed");

        const step2Complete =
            step2.classList.contains("completed");

        const step3Complete =
            step3.classList.contains("completed");


        if (
            step1Complete &&
            step2Complete &&
            step3Complete
        ) {

            completeOrder.disabled = false;

        } else {

            completeOrder.disabled = true;

        }

    }



    /* =========================
       COMPLETE ORDER
    ========================= */

    completeOrder.addEventListener("click", function () {

        if (
            !deliverySelected ||
            !step2.classList.contains("completed") ||
            !step3.classList.contains("completed")
        ) {

            alert(
                "Please complete all three checkout steps."
            );

            return;

        }


        const getValue = function (id) {
            return document.getElementById(id).value.trim();
        };

        const items = Array.from(document.querySelectorAll("#step1 .product")).map(function (product) {
            return {
                name: product.querySelector("h3").textContent.trim(),
                quantity: parseInt(product.querySelector(".quantity-value").textContent, 10),
                price: product.querySelector(".product-price").textContent.trim()
            };
        });

        const deliveryFee = deliverySelected ? 60 : 0;
        const order = {
            orderNumber: "O2D-" + Date.now().toString().slice(-8),
            orderDate: new Date().toLocaleString(),
            customer: {
                name: getValue("firstName") + " " + getValue("lastName"),
                email: getValue("email"),
                phone: getValue("phone"),
                address: [
                    getValue("address"),
                    getValue("city"),
                    getValue("province"),
                    getValue("zip")
                ].join(", ")
            },
            items: items,
            subtotal: 800,
            discount: 0,
            deliveryFee: deliveryFee,
            serviceFee: 0,
            tax: 0,
            total: 800 + deliveryFee,
            paymentMethod: paymaya.value
        };

        localStorage.setItem("oven2doorOrder", JSON.stringify(order));

        window.location.href = "receipt.html";

    });

});