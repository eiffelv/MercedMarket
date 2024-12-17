window.onload = function () {

    console.log(document.getElementById("loginBtn"));
    document.getElementById('loginBtn').onclick = async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Email:', email, 'Password:', password);

        fetch('/user/login?email=' + email + '&password=' + password)
            .then(response => {
                if (!response.ok) {
                    alert("Login Failed!");
                    window.location.reload();
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                const uid = data.uid;
                const token = data.token;
                document.cookie = "uid=" + uid + "; path=/;";
                document.cookie = "token=" + token + "; path=/;";
                window.location.href = "/";
            })
            .catch(error => {
                alert("Login Failed!");
                window.location.reload();
            });//abc@abc.com&password=123123


    };
}