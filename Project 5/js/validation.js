/*

Project: Personal Web
Name: Christian Fellows

*\ 

/*
Added form validation logic using regex patterns.
Included functions for field validation, error handling, and success message display.

*/ 

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed."); // Debugging log

  // Validation Regex Patterns
  const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  const zipRegex = /^\d{5}$/; // Matches exactly 5 digits
  const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Matches valid email addresses

  // Function to check required fields
  function checkRequired(fieldId, message) {
    const field = document.getElementById(fieldId);
    console.log(`Checking required field: ${fieldId}`, field ? `Value: "${field.value}"` : 'Field not found');
    if (!field || !field.value.trim()) {
      setElementValidity(fieldId, false, message); // Mark field invalid
      return false;
    }
    setElementValidity(fieldId, true); // Mark field valid
    return true;
  }

  // Function to check format using regex
  function checkFormat(fieldId, message, regex) {
    const field = document.getElementById(fieldId);
    console.log(`Validating format for field: ${fieldId}`, field ? `Value: "${field.value}"` : 'Field not found');
    if (!field || !regex.test(field.value.trim())) {
      setElementValidity(fieldId, false, message);
      return false;
    }
    setElementValidity(fieldId, true);
    return true;
  }

  // Function to validate state abbreviations
  function validateState(fieldId, message) {
    const field = document.getElementById(fieldId);
    console.log(`Validating state: ${fieldId}`, field ? `Value: "${field.value}"` : 'Field not found');
    if (!field || !stateAbbreviations.includes(field.value.toUpperCase().trim())) {
      setElementValidity(fieldId, false, message);
      return false;
    }
    setElementValidity(fieldId, true);
    return true;
  }

  // Function to validate checkbox group
  function validateCheckboxGroup(groupName, message) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    console.log(`Validating checkbox group: ${groupName}, Checked: ${isChecked}`);
    const errorDiv = document.querySelector(`.errorMsg[data-group="${groupName}"]`);
    if (!isChecked) {
      if (errorDiv) {
        errorDiv.textContent = message; // Display the error message
      }
      return false;
    }
    if (errorDiv) {
      errorDiv.textContent = ''; // Clear the error message
    }
    return true;
  }

  // Function to set element validity
  function setElementValidity(id, isValid, message = '') {
    const field = document.getElementById(id);
    if (!field) {
      console.error(`Field with id "${id}" not found.`);
      return;
    }
    const errorDiv = field.nextElementSibling; // The div where we display the error message
    console.log(`Setting validity for field: ${id}, isValid: ${isValid}, message: "${message}"`);
    if (isValid) {
      field.classList.add('was-validated');
      field.classList.remove('is-invalid');
      if (errorDiv) errorDiv.textContent = '';
    } else {
      field.classList.remove('was-validated');
      field.classList.add('is-invalid');
      if (errorDiv) errorDiv.textContent = message;
    }
  }

  // Submit Event Listener
  document.getElementById('visitor-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    console.log("Submit button clicked. Starting validation...");

    // Validate all fields
    const isFirstNameValid = checkRequired('first-name', 'First name is required.');
    const isLastNameValid = checkRequired('last-name', 'Last name is required.');
    const isEmailValid = checkFormat('visitor-email', 'Invalid email address.', emailRegex);
    const isPhoneValid = checkFormat('phone', 'Invalid phone number. Must be 10 digits.', phoneRegex);
    const isStateValid = validateState('state', 'Invalid state abbreviation.');
    const isZipValid = checkFormat('zip', 'Invalid ZIP code. Must be 5 digits.', zipRegex);
    const isCheckboxValid = validateCheckboxGroup('find-page', 'Please select at least one option.');

    // Check if all validations passed
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isStateValid &&
      isZipValid &&
      isCheckboxValid
    ) {
      console.log("All validations passed. Showing success message.");

      
      

      // Show the success message with "Thank you"
      const successDiv = document.getElementById('success');
      if (successDiv) {
        console.log("Success div found. Displaying message.");
        successDiv.style.display = 'block';
        successDiv.textContent = 'Thank you! Your form has been submitted successfully.';
      } else {
        console.error("Success div not found.");
      }
    } else {
      console.log("Validation failed. Please correct the errors.");
    }
  });
});
