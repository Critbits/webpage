/*

Project: Personal Web
Name: Christian Fellows


*\

// page.js

/**
 * Page.js
 * Handles section switching and theme toggling logic.
 */

// Function to show sections
function showSection(sectionId) {
  console.log(`showSection called with sectionId: ${sectionId}`); // Debugging log

  // Select all sections within the <main> element
  const sections = document.querySelectorAll('main section');

  // Loop through sections and hide them all
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Display the selected section
  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.style.display = 'block';
    console.log(`Displayed section: ${sectionId}`); // Debugging log
  } else {
    console.log(`Section with ID ${sectionId} not found`); // Debugging log
  }
}

// Theme toggle functionality
let isDarkTheme = false;

document.getElementById('theme-toggle').addEventListener('click', () => {
  const themeLink = document.querySelector('link[href="css/theme-dark.css"]');

  if (isDarkTheme) {
    // Remove the dark theme
    if (themeLink) {
      themeLink.remove();
    }
  } else {
    // Add the dark theme
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'css/theme-dark.css';
    document.head.appendChild(linkElement);
  }

  isDarkTheme = !isDarkTheme; // Toggle the theme state
});
