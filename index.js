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

function handleSlider(event) {
  const { value } = event.target;
  characterLengthShowValue.textContent = value;
  const progress = (value / characterLengthSlider.max) * 100;
  characterLengthSlider.style.background = `linear-gradient(to right, var(--color-neon-green) ${progress}%, var(--color-black) ${progress}%)`;
  checkPasswordStrength();
}

characterLengthSlider.addEventListener("input", handleSlider);

function handleCheckboxClick(event) {
  const checkboxId = event.target.id;
  const inputId = checkboxId.split("-")[1];

  const inputCheckElement = document.getElementById(inputId);
  inputCheckElement.checked = !inputCheckElement.checked;
  checkPasswordStrength();
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", handleCheckboxClick);
});

function checkPasswordStrength() {
  let strength = "";
  const checkedCount = Array.from(checkboxInputs).filter(
    (input) => input.checked
  ).length;
  const characterLength = characterLengthSlider.value;
  if (characterLength == 0) {
    strength = "empty";
  } else if (characterLength < 6 || checkedCount === 1) {
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
});
