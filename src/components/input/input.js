import './input.scss'

// const orientationButton = document.querySelector(".orientation-button")
const sliderLine = document.querySelector(".slider__line")
const sliderRound = document.querySelector(".slider__round")
const colorButton = document.querySelector(".color-button")

colorButton.onclick = () => {
  sliderLine.classList.toggle('slider__line_second-color');
  sliderRound.classList.toggle('slider__round_second-color');
}

// orientationButton.onclick = () => {
//   sliderInput.classList.toggle('add-input');
// }


sliderRound.onmousedown = function(event) {
  let shiftX = event.clientX - sliderRound.getBoundingClientRect().left;

  sliderRound.style.position = 'absolute';
  sliderRound.style.zIndex = '100';
  document.body.append(sliderRound)

  function moveAt(pageX, pageY) {
    let leftStop = pageX - sliderLine.getBoundingClientRect().left;
    let rightStop = - pageX + sliderLine.getBoundingClientRect().right;

    leftStop < 0 ? leftStop = 0 : 
    rightStop < 0 ? rightStop = 0 :
    sliderRound.style.left = pageX - shiftX + 'px';
    sliderRound.style.top = sliderLine.getBoundingClientRect().top - sliderLine.getBoundingClientRect().height / 2 + 'px'
  }

  moveAt(event.pageX, event.pageY);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  function onMouseUp(event) {
    document.removeEventListener('mousemove', onMouseMove);
  }
  

}