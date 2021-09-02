import { IOptions } from '../../types';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from './Presenter';

describe('Presenter', () => {
  let presenter: Presenter;
  let view: View;
  let model: Model;
  let options: IOptions;

  beforeEach(() => {
    const initElement = document.createElement('div');
    options = {
      min: 0,
      max: 1,
      from: 0.2,
      to: 0.5,
      step: 0.01,
      hasProgress: true,
      hasTip: true,
      hasScale: true,
      scaleSize: 5,
      isVertical: false,
      isDouble: true,
    };
    const inputFrom = document.createElement('input');
    initElement.append(inputFrom);
    inputFrom.classList.add('dw-slider__input_to');

    const inputTo = document.createElement('input');
    initElement.append(inputTo);
    inputTo.classList.add('dw-slider__input_to');
    view = new View(initElement, options);
    model = new Model(options);
    presenter = new Presenter(view, model);
  });

  describe('update', () => {
    test('should call model"s and view"s methods', () => {
      const modelUpdate = jest.spyOn(model, 'refreshAll');
      presenter.refreshAll(options);
      expect(modelUpdate).toHaveBeenCalledWith(options);
    });
  });

  describe('returnCurrentValues', () => {
    test('should return array with current from view', () => {
      expect(presenter.returnCurrentValues()).toHaveLength(2);
    });
  });
  describe('returnOptions', () => {
    test('should return array with current from view', () => {
      expect(presenter.returnOptions()).toEqual(options);
    });
  });

  describe('notify', () => {
    test('should call setCurrent', () => {
      const modelUpdate = jest.spyOn(model, 'setCurrent');
      presenter.handleDataFromView({ value: 1, isCurrent: false, isExtra: false });
      expect(modelUpdate).toBeCalledWith(1, false);
    });
  });
});
