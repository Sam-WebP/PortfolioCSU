// This script allows for the dropdown to show when the hamburger icon is clicked
// Hamburger icon only shows when the device screen is narrow enough

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
    
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});