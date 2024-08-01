document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById('email-field').value;
  const password = document.getElementById('password-field').value;

  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);

  const emailMsg = document.getElementById('email-msg');
  const passwordMsg = document.getElementById('password-msg');

  let valid = true;

  if (emailResult.valid) {
    emailMsg.textContent = "Valid email";
    emailMsg.style.color = "green";
  } else {
    emailMsg.textContent = "Invalid email: " + emailResult.message;
    emailMsg.style.color = "red";
    valid = false;
  }

  if (passwordResult.valid) {
    passwordMsg.textContent = "Valid password";
    passwordMsg.style.color = "green";
  } else {
    passwordMsg.textContent = "Invalid password: " + passwordResult.message;
    passwordMsg.style.color = "red";
    valid = false;
  }

  if (valid) {
    // If both email and password are valid, submit the form
    event.target.submit();
  }
});

function isValidEmailSyntax(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isValidEmailLength(email) {
  const maxLength = 254;
  return email.length <= maxLength;
}

function hasCommonMistakes(email) {
  return email.includes("..") || email.startsWith(".") || email.endsWith(".");
}

function validateEmail(email) {
  if (!isValidEmailSyntax(email)) {
    return { valid: false, message: "Invalid email format." };
  }
  
  if (!isValidEmailLength(email)) {
    return { valid: false, message: "Email exceeds maximum length of 254 characters." };
  }
  
  if (hasCommonMistakes(email)) {
    return { valid: false, message: "Email contains common mistakes such as double dots or starts/ends with a dot." };
  }
  
  return { valid: true, message: "Valid email." };
}

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters long.` };
  }

  if (!hasUpperCase) {
    return { valid: false, message: "Password must contain at least one uppercase letter." };
  }

  if (!hasLowerCase) {
    return { valid: false, message: "Password must contain at least one lowercase letter." };
  }

  if (!hasNumbers) {
    return { valid: false, message: "Password must contain at least one number." };
  }

  if (!hasSpecialChars) {
    return { valid: false, message: "Password must contain at least one special character." };
  }

  return { valid: true, message: "Valid password." };
}
