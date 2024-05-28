
const signUpButton = document.getElementById('signUp');   // Get the sign-up button element by its ID
const signInButton = document.getElementById('signIn'); // Get the sign-in button element by its ID
const container = document.getElementById('container');   // Get the container element by its ID

signUpButton.addEventListener('click', () => {    // Add a click event listener to the sign-up button
	container.classList.add("right-panel-active");    // Add the "right-panel-active" class to the container element
});

signInButton.addEventListener('click', () => {    // Add a click event listener to the sign-in button
	container.classList.remove("right-panel-active");   // Remove the "right-panel-active" class from the container element
});

document.getElementById('close-btn').addEventListener('click', function() {   // Add a click event listener to the element with the ID 'close-btn'
    document.getElementById('container').style.display = 'none';     // Set the display style of the container element to 'none'
  });