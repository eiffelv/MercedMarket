function deleteItem(pid) {
    fetch('/cart/deleteCartItem?product=' + pid)
        .then(response => {
            if (!response.ok) {
                alert("Failed!");
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            window.location.reload();
        })
        .catch(error => {
            alert("Failed!");
        });
}

function showInput(productId) {
    // Hide the label and show the input
    const label = document.getElementById(`quantity_label_${productId}`);
    const input = document.getElementById(`quantity_input_${productId}`);

    label.classList.add("hidden");
    input.classList.remove("hidden");
    input.focus(); // Automatically focus on the input
}

function updateQuantity(productId) {
    const input = document.getElementById(`quantity_input_${productId}`);
    const label = document.getElementById(`quantity_label_${productId}`);
    const newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity <= 0) {
        alert("Quantity must be a positive number!");
        input.value = label.innerText; // Reset the input value
        return;
    }

    // Send the GET request to update the quantity
    fetch(`/cart/updateCartItem?product=${productId}&quantity=${newQuantity}`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Quantity updated successfully") {
                // Update the label to reflect the new quantity
                label.innerText = newQuantity;
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch((error) => {
            console.error("Error updating cart:", error);
            alert("An error occurred while updating the cart.");
        })
        .finally(() => {
            // Switch back to label view
            input.classList.add("hidden");
            label.classList.remove("hidden");
        });
}

function processPlaceOrder() {
    // Select all checked checkboxes
    const checkboxes = document.querySelectorAll('.item-checkbox:checked');
    const selectedProductIds = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));

    if (selectedProductIds.length === 0) {
        alert("No items selected!");
        return;
    }

    // Call the /order/placeOrder endpoint
    fetch('/order/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // to include cookies if using session/auth tokens
        body: JSON.stringify({ product_ids: selectedProductIds })
    })
        .then(response => response.json())
        .then(data => {
            if (data.order_id) {
                alert(`Order placed successfully! Your order ID: ${data.order_id}`);
                location.href = '/orders';
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(err => {
            console.error("Place order error:", err);
            alert("An error occurred while placing the order.");
        });
}
