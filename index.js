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

function handleSlider(event) {
  const { value } = event.target;
  characterLengthShowValue.textContent = value;
  const progress = (value / characterLengthSlider.max) * 100;
  characterLengthSlider.style.background = `linear-gradient(to right, var(--color-neon-green) ${progress}%, var(--color-black) ${progress}%)`;
}

characterLengthSlider.addEventListener("input", handleSlider);

function handleCheckboxClick(event) {
  const checkboxId = event.target.id;
  const inputId = checkboxId.split("-")[1];

  const inputCheckElement = document.getElementById(inputId);
  inputCheckElement.checked = !inputCheckElement.checked;
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", handleCheckboxClick);
});

function checkPasswordStrength() {
  const checkedCount = Array.from(checkboxInputs).filter(
    (input) => input.checked
  ).length;

  passwordStrengthElements.forEach((element) => {
    element.classList.add("hidden");
  });

  switch (checkedCount) {
    case 0:
      emptyPasswordElement.classList.remove("hidden");
      break;
    case 1:
      tooWeakPasswordElement.classList.remove("hidden");
      break;
    case 2:
      weakPasswordElement.classList.remove("hidden");
      break;
    case 3:
      mediumPasswordElement.classList.remove("hidden");
      break;
    case 4:
      strongPasswordElement.classList.remove("hidden");
      break;
    default:
      break;
  }
}