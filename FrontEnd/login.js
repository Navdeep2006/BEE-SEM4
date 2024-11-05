const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Handle Login button click
loginBtn.addEventListener('click', function() {
    // Toggle button states
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');

    // Show login form, hide signup form
    loginForm.classList.add('active-form');
    signupForm.classList.remove('active-form');
});

// Handle Signup button click
signupBtn.addEventListener('click', function() {
    // Toggle button states
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');

    // Show signup form, hide login form
    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});
