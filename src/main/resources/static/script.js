document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Perform basic validation
        if (!email || !password || !role) {
            alert('Please fill in all fields.');
            return;
        }

        // Perform additional validation if needed

        // Submit the form data to the server
        submitForm(email, password, role);
    });

    function submitForm(email, password, role) {
        // Send an AJAX request to the server with the form data
        // Example using Fetch API
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role
            })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to dashboard or perform other actions
                window.location.href = '/dashboard';
            } else {
                // Handle error responses
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});
