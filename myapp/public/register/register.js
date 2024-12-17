window.onload = function () {
    document.getElementById("registerBtn").onclick = async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Used to validate password
        if (password !== confirmPassword) {
            alert('Passwords do not match! Please try again.');
            return;
        }


        fetch('/user/register?email=' + email + '&password=' + password + "&name=" + name)
            .then(response => {
                if (!response.ok) {
                    alert("Login Failed!");
                    window.location.reload();
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                alert("Success");
                window.location.href = "/login";
            })
            .catch(error => {
                alert("Registration Failed!");
                window.location.reload();
            });
    };
}