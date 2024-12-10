document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Used to validate password
    if (password !== confirmPassword){
        alert('Passwords do not match! Please try again.');
        return;
    }
    

    // Log form data -- Test only
    console.log({name, email, password});
})