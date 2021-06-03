# dwSlider
## Fourth task

dwSlider - слайдер (бегунок), который позволяет перетягиванием задавать какое-либо числовое значение

![how to use dwSlider](https://i.imgur.com/nYnrDDj.gif)

## Демо-страница

[Демо-страница](https://daswetter.github.io/4th/)

## Для разработки использовались:

* Typescript
* Webpack
* Pug
* SCSS
* Методология БЭМ
* Тесты (Jest)
## Инициализация

Запуск проекта: `npm start` или `npm run build`

Запуск тестов: `npm test`

Инициализировать плагин с параметрами по умолчанию можно на пустом `div` элементе  
`<div class = "js-slider"></div>`  
`$(".js-slider").dwSlider()`

### Пример слайдера с параметрами

```typescript
$(".js-slider").dwSlider({  
  min: 0,  
  max: 10,  
  from: 2,  
  to: 8,  
  step: 1,  
  progress: true,  
  tip: true,  
  scale: true,  
  scaleSize: 6,  
  vertical: false,  
  double: false,  
})
```

## Параметры

Параметр | Аттрибут data-* | По умолчанию | Тип | Описание
--- | --- | --- | --- | ---
min | data-min | 0 | number | Минимальное значение
max | data-max | 100 | number | Максимальное значение
from | data-from | 50 | number | Начальное значение для первого бегунка
to | data-to | 0 | number | Начальное значение для второго бегунка
step | data-step | 1 | number | Размер шага, может быть дробным, всегда > 0
vertical | data-vertical | false | boolean | Вертикальный или горизонтальный вид
double | data-double | false | boolean | Одиночное значение или интервал
tip | data-tip | true | boolean | Элемент над бегунком, который показывает значение
scale | data-scale | true | boolean | Шкала значений
scaleSize | data-scaleSize | true | number | Количество значений в шкале, от 2 до 20
progress | data-progress | true | boolean | Прогресс бар

## Описание архитектуры

Приложение разделено на три главных слоя: Модель, Вид и Презентер (MVP).

Презентер (Presenter), являясь подписчиком Модели и Вида, связывает их с помощью паттерна Наблюдатель.

Модель (Model) отвечает за расчет логики для работы слайдера. К примеру, Модель получает от Вида через Презентер данные о нахождении бегунка относительно линии слайдера и высчитывает значение, которое потом, опять же через Презентер, получает Вид. Модель реализует интерфейс IModel.

Вид разделяется на несколько модулей и отвечает за расчет логики для отображения. Главная часть называется Видом (View) и реализует интерфейс IView. Вид связывает все Подвиды (Subview) с помощью паттерна Наблюдатель. Вид подписывается на все Подвиды (бегунок, линия, прогресс бар и др.), которые наследуют абстрактный класс Subview.

### Диаграмма

![diagram](https://github.com/Daswetter/4th/blob/ts-branch/dwSlider.svg "Здесь диаграмма")

## Публичные методы

```typescript
$(".js-slider").dwSlider({
  max: 100,
  min: 10,
  from: 10,
  to: 20
})
```

`let slider = $(".js-slider").data("dwSlider")`

В приложении три публичных метода:

* update — обновляет слайдер в соответствии с новыми значениями

```typescript
slider.update({
  max: 101
})
```

* returnCurrentOptions — возвращает параметры  
`slider.returnCurrentOptions()`

* returnCurrentState — возвращает массив с текущими значениями  

```typescript
slider.returnCurrentState()
// returns [10, 20]
```
