import './input.scss'

(function($){
  $.fn.customRangeSlider = function(options){
    
    options = $.extend({},{
      initialLabel: 0,
      finalLabel: 100
    }, options);

    const getTemplate = (options) =>{ 
      return this[0].insertAdjacentHTML('afterbegin',`
        <div class = "slider__line">
          <div class = "slider__progress-line">
            <div class = "slider__round"></div>  
          </div>
        </div>

        <div class = "slider__labels">
          <span class = "slider__initial-label">
            ${options.initialLabel}
          </span>

          <span class = "slider__final-label">
            ${options.finalLabel}
          </span>
        </div>
      
        <button class="color-button">
          change color
        </button>
      `
      )
    }
    getTemplate(options)

    const sliderLine = document.querySelector(".slider__line")
    const sliderRound = document.querySelector(".slider__round")
    const colorButton = document.querySelector(".color-button")
    const input = document.querySelector(".slider__input")
    const progressLine = document.querySelector(".slider__progress-line")
    
    colorButton.onclick = () => {
      sliderLine.classList.toggle("slider__line_second-color")
      sliderRound.classList.toggle("slider__round_second-color")
    }
    
    const setProgressLine = () => {
      progressLine.style.width = (sliderRound.getBoundingClientRect().left - sliderLine.getBoundingClientRect().left + sliderRound.getBoundingClientRect().width / 2) + 'px'
    }

    sliderRound.onmousedown = function(event) {
      let shiftX = event.clientX - sliderRound.getBoundingClientRect().left
      sliderRound.style.position = 'absolute';
      sliderRound.style.zIndex = '100';
      document.body.append(sliderRound)

      function moveAt(pageX) {
        console.log('moveAT')
        let leftStop = pageX - sliderLine.getBoundingClientRect().left;
        let rightStop = - pageX + sliderLine.getBoundingClientRect().right;
        

        leftStop < 0 ? leftStop = 0 : 
        rightStop < 0 ? rightStop = 0 :
        sliderRound.style.left = pageX - shiftX + 'px';
        sliderRound.style.top = sliderLine.getBoundingClientRect().top - sliderLine.getBoundingClientRect().height / 2 + 'px'

        setProgressLine()
        
        // -------------------
        //   const onePart = sliderLine.getBoundingClientRect().width/(finalLabel.innerText - initialLabel.innerText)

        //   if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart){
        //     input.value = Number(initialLabel.innerText) + 1
        //   }
        //   if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart*2){
        //     input.value = Number(initialLabel.innerText) + 2
        //   }
        //   if (sliderRound.getBoundingClientRect().left > sliderLine.getBoundingClientRect().left + onePart*3){
        //     input.value = Number(initialLabel.innerText) + 3
        //   }
      }

      moveAt(event.pageX);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      function onMouseMove(event) {
        moveAt(event.pageX);
      }
      function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    }
  
    return this

  };
})(jQuery);

