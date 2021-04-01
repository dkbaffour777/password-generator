// Assignment code here
var userPassword = {
  lowerCase: { type: "lowerCase", prefer: false, values: "abcdefghijklmnopqrstuvwxyz" },
  upperCase: { type: "upperCase", prefer: false, values: "ABCDEFGHIKLMNOPQRSTVXYZ" },
  numeric: { type: "numeric", prefer: false, values: "0123456789" },
  specialCharacter: { type: "specialCharacter", prefer: false, values: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~" },
  setType: function (lowerCase, upperCase, numeric, specialCharacter) {
    this.lowerCase.prefer = lowerCase;
    this.upperCase.prefer = upperCase;
    this.numeric.prefer = numeric;
    this.specialCharacter.prefer = specialCharacter;
  },
  getPreferredType: function () {
    // Return all character types that have prefer property set to  true
    var characterTypes = ['lowerCase', 'upperCase', 'numeric', 'specialCharacter'];
    var preferredCharacterTypes = [];
    for (var i = 0; i < characterTypes.length; i++) {
      if (this[characterTypes[i]].prefer) preferredCharacterTypes.push({
        type: this[characterTypes[i]].type,
        values: this[characterTypes[i]].values
      });
    }
    return preferredCharacterTypes;
  }
}

// All error messages
var errorMessages = {
  passwordLengthError: function (passwordLength) {
    if (passwordLength < 8) {
      return "Password length must be at least 8 characters";

    } else if (passwordLength > 12) {
      return "Password length must be at most 128 characters";

    } else if (!passwordLength) {
      return "You must enter a number";
    }
  },
  noCharacterType: "You must choose at least one character type"
}

// Validate the length of the password
var isPasswordLengthValid = function (length) {
  if (length >= 8 && length <= 128) return true;
  return false;
}

// The purpose of this function is to reserve a number of 
// random position(s) within the password characters to contain
// at least one of each charactype requested by the user
const defaultRandomPositionGen = (numberOfPositions, rangeLength, preferredCharacterTypes) => { 
  // Set a range of numbers from 0 to x, where x > 0
  var range = [];   
  for (var i = 0; i < rangeLength; i++) { 
    range.push(i);
  }

  // Pick a random element from the range array
  // All numbers selected must be distinct from one another
  var results = [] ;   
  for (var i = 0; i < numberOfPositions; i++) { 
    // Pick a random element from range
    var currentRangeElement = range[Math.floor(Math.random() * range.length)]   
    // Store the element and add a description of the type of character 
    results.push({ 
      type: preferredCharacterTypes[i].type, 
      position: currentRangeElement, 
      values: preferredCharacterTypes[i].values
    })
    // Remove the currentRangeElement from range 
    // to prevent duplicate values in the results array        
    range = range.filter(x => x !== currentRangeElement);
  } 
  return results;
}

// Randomly generate characters based on the user preference
var randomCharacters = function (numberOfdefaultRandomPositions, passwordLength, preferredCharacterTypes) {
  var results = '';

  // Generate a random position for each type chosen by the user
  // This will make the password have at least one of each character from the preferred type
  var defaultRandomPositions = defaultRandomPositionGen(numberOfdefaultRandomPositions, passwordLength, preferredCharacterTypes);

  for(var i = 0; i < passwordLength; i++) {        
    var isRandomPosition = false; 
    // For every position in the password string
    // check to verify if that position matches one of 
    // the default random positions
    for(var j = 0; j < defaultRandomPositions.length; j++){            
      if(i === defaultRandomPositions[j].position){
        // If it matches 
        // store the corresponding characters from the defaultRandomPositions array
        var characterType =  defaultRandomPositions[j].values;
        // Generate a random character from the chosen character type
        var randomCharacter = characterType.charAt(Math.floor(Math.random() * characterType.length));  
        // Add a random from the character type             
        results += randomCharacter;   
                     
        isRandomPosition = true; // Prevent the results from being overided
        
        // Extra code to better understand how the randomCharacters function works           
        //console.log(`The random character was ${randomCharacter}, took position ${i}, with the type ${defaultRandomPositions[j].type}`);            
      }        
    }        
    if(!isRandomPosition) {  
      // If the position "i" was not found in the defaultRandomPositions array           
      var characterType = preferredCharacterTypes[Math.floor(Math.random() * preferredCharacterTypes.length)];
      results += characterType.values.charAt(Math.floor(Math.random() * characterType.values.length));    
    }    
  }    
  return results;
}

var generatePassword = function () {
  // Get the length of characters from the user
  var passwordLength = prompt("How many characters would you like your password to contain?");
  passwordLength = parseInt(passwordLength);

  // Check if the length of characters is valid
  if (!isPasswordLengthValid(passwordLength)) {
    // If it the password length not valid, call the correspoding error message
    alert(errorMessages.passwordLengthError(passwordLength));
    return errorMessages.passwordLengthError(passwordLength);
  } else {
    // If password length is valid
    // Store the user's preferred type of characters
    var lowerCase = confirm("Would you like your password to have lower case characters?");
    var upperCase = confirm("Would you like your password to have upper case characters?");
    var numeric = confirm("Would you like your password to have numeric characters?");
    var specialCharacter = confirm("Would you like your password to have special characters?");

    // Set the type of characters in the userPassword object
    // to whether preferred or not
    userPassword.setType(lowerCase, upperCase, numeric, specialCharacter);

    // Get the preferred type of characters requested by the user
    var preferredCharacterTypes = userPassword.getPreferredType();

    // Validate if the user chose at least one character type
    if(preferredCharacterTypes.length === 0){
      // Display error message when user does not choose a character type
      alert(errorMessages.noCharacterType);
      return errorMessages.noCharacterType;
    } else {
      // Generate a random password based on the user preference
      var password = randomCharacters(preferredCharacterTypes.length, passwordLength, preferredCharacterTypes);
  
      return password;
    }
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