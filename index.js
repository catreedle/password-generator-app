const characterLengthSlider = document.getElementById("characterLength");
const characterLengthShowValue = document.querySelector(
  ".form__character-length__value"
);
const checkboxElements = document.querySelectorAll(".checkbox-square");

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
