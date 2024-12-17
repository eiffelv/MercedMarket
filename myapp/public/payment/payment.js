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