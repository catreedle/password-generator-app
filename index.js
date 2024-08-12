const characterLengthSlider = document.getElementById("characterLength");
const characterLengthShowValue = document.querySelector(
  ".form__character-length__value"
);

characterLengthSlider.addEventListener("input", function () {
  characterLengthShowValue.textContent = characterLengthSlider.value;
});

const sliderEl = characterLengthSlider

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;

  const progress = (tempSliderValue / sliderEl.max) * 100;

  sliderEl.style.background = `linear-gradient(to right, var(--color-neon-green) ${progress}%, var(--color-black) ${progress}%)`;
});
