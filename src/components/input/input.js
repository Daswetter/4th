import './input.scss'

const orientationButton = document.querySelector(".orientation-button")
const sliderInput = document.querySelector(".input")
const colorButton = document.querySelector(".color-button")

orientationButton.onclick = () => {
  sliderInput.classList.toggle('add-input');
}
colorButton.onclick = () => {
  console.log('click');
  sliderInput.classList.toggle('change-color');
}