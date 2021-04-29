# Custom Range Slider

Custom Range Slider - слайдер (бегунок), который позволяет перетягиванием задавать какое-либо числовое значение

![how to use range slider](https://i.imgur.com/nYnrDDj.gif)

## Инициализация 
Запуск проекта: `npm start`  
Запуск тестов: `npm test`

Инициализировать плагин с параметрами по умолчанию можно на пустом `div` элементе  
`<div class = "js-slider"></div>`  
`$(".js-slider").customRangeSlider()`

## Параметры

Параметр | По умолчанию | Тип | Описание
--- | --- | --- | ---
min | 0 | number | Минимальное значение
max | 100 | number | Максимальное значение
from | 50 | number | Начальное значение для первого бегунка
to | 0 | number | Начальное значение для второго бегунка
step | 1 | number | Размер шага, может быть дробным, всегда > 0
vertical | false | boolean | Вертикальный или горизонтальный вид
double | false | boolean | Одиночное значение или интервал
satellite | true | boolean | Элемент над бегунком, который показывает значение
scale | true | boolean | Шкала значений
scaleSize | true | number | Количество значений в шкале, от 2 до 20
progress | true | boolean | Прогресс бар


## Пример слайдера с параметрами

`$(".js-slider1").customRangeSlider({
  min: 0,
  max: 7,
  from: 0.5,
  to: 2,
  step: 2,
  progress: true,
  satellite: true,
  scale: true,
  scaleSize: 4,
  vertical: false,
  double: false,
})`