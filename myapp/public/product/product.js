window.onload = function () {
    document.getElementById("addToCartButton").onclick = function () {
        const url = window.location.pathname; // "/product/121"
        const parts = url.split('/'); // ["", "product", "121"]
        const id = parts[2]; // "121"
        fetch('/cart/addCartItem?product=' + id + '&quantity=1')
            .then(response => {
                if (!response.ok) {
                    alert("Failed!");
                    window.location.reload();
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                alert("Success");
            })
            .catch(error => {
                alert("Failed!");
                window.location.reload();
            });
    }
}