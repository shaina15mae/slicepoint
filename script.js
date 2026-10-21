document.addEventListener("DOMContentLoaded", function () {
	const order = JSON.parse(localStorage.getItem("oven2doorOrder") || "null");

	if (!order) {
		document.getElementById("customerName").textContent = "No order details found.";
		return;
	}

	const setText = function (id, value) {
		document.getElementById(id).textContent = value;
	};

	const money = function (value) {
		return "₱" + Number(value).toFixed(2);
	};

	setText("orderNumber", order.orderNumber);
	setText("orderDate", order.orderDate);
	setText("customerName", order.customer.name);
	setText("customerEmail", order.customer.email);
	setText("customerPhone", order.customer.phone);
	setText("customerAddress", order.customer.address);
	setText("subtotal", money(order.subtotal));
	setText("discount", money(order.discount));
	setText("deliveryFee", money(order.deliveryFee));
	setText("serviceFee", money(order.serviceFee));
	setText("tax", money(order.tax));
	setText("total", money(order.total));
	setText("paymentMethod", order.paymentMethod);

	const orderItems = document.getElementById("orderItems");
	order.items.forEach(function (item) {
		const itemElement = document.createElement("div");
		itemElement.className = "item";

		const itemInfo = document.createElement("div");
		itemInfo.className = "item-info";

		const itemName = document.createElement("div");
		itemName.className = "item-name";
		itemName.textContent = item.name;

		const itemQuantity = document.createElement("div");
		itemQuantity.className = "item-quantity";
		itemQuantity.textContent = "Quantity: " + item.quantity;

		const itemPrice = document.createElement("div");
		itemPrice.className = "item-price";
		itemPrice.textContent = item.price;

		itemInfo.appendChild(itemName);
		itemInfo.appendChild(itemQuantity);
		itemElement.appendChild(itemInfo);
		itemElement.appendChild(itemPrice);
		orderItems.appendChild(itemElement);
	});
});
