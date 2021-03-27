// Assignment code here

var errorMessages = {
  passwordLengthError: function(passwordLength){
    if(passwordLength < 8){
      return "Password length must be at least 8 characters";

    } else if(passwordLength > 12){
      return "Password length must be at most 128 characters";

    } else if(!passwordLength){
      return "You must enter a number";
    }
  }
}

// Validate the length of the password
var isPasswordLengthValid = function(length) {
  if(length >= 8 && length <= 128) return true;
  return false;
}

var generatePassword = function() {
  // Get the length of characters from the user
  var passwordLength = prompt("How many characters would you like your password to contain?");
  passwordLength = parseInt(passwordLength)

  // Check if the length of characters is valid
  if(!isPasswordLengthValid(passwordLength)){
    // If it's not valid, call the correspoding error message
    alert(errorMessages.passwordLengthError(passwordLength));
  } else {
    // If it's valid
    var lowerCase = confirm("Would you like your password to have lower case characters?");
    var upperCase = confirm("Would you like your password to have upper case characters?");
    var numeric = confirm("Would you like your password to have numeric characters?");
    var specialCharacters = confirm("Would you like your password to have special characters?");

  }

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
