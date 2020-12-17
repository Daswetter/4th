import './input.scss'

// const orientationButton = document.querySelector(".orientation-button")
const sliderLine = document.querySelector(".slider__line")
const sliderRound = document.querySelector(".slider__round")
const colorButton = document.querySelector(".color-button")
const initialLabel = document.querySelector(".slider__initial-label")
const finalLabel = document.querySelector(".slider__final-label")
const input = document.querySelector(".slider__input")
const progressLine = document.querySelector(".slider__progress-line")

initialLabel.innerText = '1'
finalLabel.innerText = '8'

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

  function moveAt(pageX) {
    
    let leftStop = pageX - sliderLine.getBoundingClientRect().left;
    let rightStop = - pageX + sliderLine.getBoundingClientRect().right;
    

    leftStop < 0 ? leftStop = 0 : 
    rightStop < 0 ? rightStop = 0 :
    sliderRound.style.left = pageX - shiftX + 'px';
    sliderRound.style.top = sliderLine.getBoundingClientRect().top - sliderLine.getBoundingClientRect().height / 2 + 'px'
// -------------
    progressLine.style.width = (sliderRound.getBoundingClientRect().left - sliderLine.getBoundingClientRect().left + sliderRound.getBoundingClientRect().width / 2) + 'px'
    
// -------------------
    const onePart = sliderLine.getBoundingClientRect().width/(finalLabel.innerText - initialLabel.innerText)
    // console.log(Number(finalLabel.innerText));
    // for (let i = 1; i++; i < Number(finalLabel.innerText) + 1 ){
    //   console.log(i);
    //   if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart * i){
    //     input.value = Number(initialLabel.innerText) + i
    //   }
    // }
    if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart){
      input.value = Number(initialLabel.innerText) + 1
    }
    if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart*2){
      input.value = Number(initialLabel.innerText) + 2
    }
    if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart*3){
      input.value = Number(initialLabel.innerText) + 3
    }
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

