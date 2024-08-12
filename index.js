// slider
const characterLengthSlider = document.getElementById("characterLength");
const characterLengthShowValue = document.querySelector(
  ".form__character-length__value"
);

// checkboxes
const checkboxElements = document.querySelectorAll(".checkbox-square");
const checkboxInputs = document.querySelectorAll(".form__checkbox__input");

// password strength bar
const passwordStrengthElements = document.querySelectorAll(
  ".password-generator__strength-bar__container"
);
const emptyPasswordElement = document.getElementById("strength--empty");
const tooWeakPasswordElement = document.getElementById("strength--too-weak");
const weakPasswordElement = document.getElementById("strength--weak");
const mediumPasswordElement = document.getElementById("strength--medium");
const strongPasswordElement = document.getElementById("strength--strong");

// button
const generateButton = document.getElementById("generate-button");

// password
const passwordElement = document.getElementById("password");
const passwordPlaceholder = "P4$5W0rD!";
const iconCopyPassword = document.querySelector(".password-generator__copy");
const notifyCopyElement = document.querySelector(".password-generator__copied");

const textWarningSlider = document.querySelector(
  ".text__warning__character-length"
);

// character most probable occurences at random
const characterOccurences = {
  uppercase: 2,
  lowercase: 4,
  number: 2,
  symbol: 1,
};

function handleSlider(event) {
  const { value } = event.target;
  characterLengthShowValue.textContent = value;
  const progress = (value / characterLengthSlider.max) * 100;
  characterLengthSlider.style.background = `linear-gradient(to right, var(--color-neon-green) ${progress}%, var(--color-black) ${progress}%)`;
  checkPasswordStrength();
  textWarningSlider.classList.add("hidden");
}

characterLengthSlider.addEventListener("input", handleSlider);

function handleCheckboxClick(event) {
  const checkboxId = event.target.id;
  const inputId = checkboxId.split("-")[1];

  const inputCheckElement = document.getElementById(inputId);
  inputCheckElement.checked = !inputCheckElement.checked;
  checkPasswordStrength();
  textWarningSlider.classList.add("hidden");
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", handleCheckboxClick);
});

checkboxInputs.forEach((element) => {
  element.addEventListener("change", function () {
    checkPasswordStrength();
    textWarningSlider.classList.add("hidden");
  });
});

function checkPasswordStrength() {
  let strength = "";
  const checkedCount = Array.from(checkboxInputs).filter(
    (input) => input.checked
  ).length;
  const characterLength = characterLengthSlider.value;
  if (characterLength == 0) {
    strength = "empty";
  } else if (characterLength < 6 || checkedCount <= 1) {
    strength = "too weak";
  } else if (
    (characterLength >= 6 && characterLength <= 8) ||
    checkedCount === 2
  ) {
    strength = "weak";
  } else if (characterLength >= 13 && checkedCount === 4) {
    strength = "strong";
  } else if (characterLength >= 9 && checkedCount >= 3) {
    strength = "medium";
  }

  passwordStrengthElements.forEach((element) => {
    element.classList.add("hidden");
  });

  switch (strength) {
    case "empty":
      emptyPasswordElement.classList.remove("hidden");
      break;
    case "too weak":
      tooWeakPasswordElement.classList.remove("hidden");
      break;
    case "weak":
      weakPasswordElement.classList.remove("hidden");
      break;
    case "medium":
      mediumPasswordElement.classList.remove("hidden");
      break;
    case "strong":
      strongPasswordElement.classList.remove("hidden");
      break;
    default:
      break;
  }
}

generateButton.addEventListener("click", function (e) {
  e.preventDefault();

  const charLength = parseInt(characterLengthSlider.value);
  const checkedCriterias = Array.from(checkboxInputs).filter(
    (element) => element.checked
  );
  const checkedCriteriaIds = checkedCriterias.map((item) => item.id);
  const password = generatePassword(charLength, checkedCriteriaIds);
  if (password) {
    passwordElement.textContent = password;
    passwordElement.style.opacity = 1;
    notifyCopyElement.classList.add("hidden");
  }
});

function generateRandomChar(value) {
  let character = "";
  switch (value) {
    case "uppercase":
      character = getRandomUppercaseChar();
      break;
    case "lowercase":
      character = getRandomLowercaseChar();
      break;
    case "number":
      character = getRandomNumber();
      break;
    case "symbol":
      character = getRandomSymbol();
      break;
    default:
      break;
  }

  return character;
}

function generatePassword(length, criterias) {
  if (length < criterias.length) {
    textWarningSlider.classList.remove("hidden");
    return;
  }

  let passwordString = "";

  //   generate string to fulfill checked criterias
  for (let i = 0; i < criterias.length; i++) {
    let criteria = criterias[i];
    let randomCharacter = generateRandomChar(criteria);
    passwordString += randomCharacter;
  }

  //   generate rest of the password
  const weights = criterias.map((criteria) => characterOccurences[criteria]);
  const remainingLength = length - criterias.length;
  for (let i = 0; i < remainingLength; i++) {
    let value = getRandomWeightedValue(criterias, weights);
    let randomCharacter = generateRandomChar(value);
    passwordString += randomCharacter;
  }

  const shuffledPassword = shuffleString(passwordString);
  return shuffledPassword;
}

function shuffleString(string) {
  // Copy the array to avoid modifying the original
  const arrayOfChars = string.split("");
  const shuffledArray = arrayOfChars.slice();

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  const shuffledString = shuffledArray.join("");
  return shuffledString;
}

function getRandomUppercaseChar() {
  // Generate a random number between 65 and 90 (ASCII values for A-Z)
  const randomCode = Math.floor(Math.random() * 26) + 65;
  // Convert the ASCII code to a character
  return String.fromCharCode(randomCode);
}

function getRandomLowercaseChar() {
  // Generate a random number between 97 and 122 (ASCII values for a-z)
  const randomCode = Math.floor(Math.random() * 26) + 97;
  // Convert the ASCII code to a character
  return String.fromCharCode(randomCode);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function getRandomWeightedValue(values, weights) {
  // Step 1: Create cumulative weights
  const cumulativeWeights = weights.reduce((acc, weight) => {
    const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(lastValue + weight);
    return acc;
  }, []);

  // Step 2: Generate a random number between 0 and the total weight
  const random =
    Math.random() * cumulativeWeights[cumulativeWeights.length - 1];

  // Step 3: Find which range the random number falls into
  const index = cumulativeWeights.findIndex((weight) => random < weight);

  // Return the value at the found index
  return values[index];
}

function copyPasswordToClipboard() {
  const password = passwordElement.textContent;
  if (password !== passwordPlaceholder)
    navigator.clipboard
      .writeText(password)
      .then(() => {
        notifyCopyElement.classList.remove("hidden");
      })
      .catch((error) => {
        console.error("failed to copy password", error);
      });
}

iconCopyPassword.addEventListener("click", copyPasswordToClipboard);
