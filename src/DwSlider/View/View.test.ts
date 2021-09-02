import { IOptions } from '../../types';
import View from './View';

describe('View', () => {
  let view: View;
  let options: IOptions;
  const initElement: HTMLElement = document.createElement('div');
  let update: jest.Mock;
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      from: 0,
      to: 100,
      step: 100,
      hasProgress: true,
      hasTip: false,
      hasScale: true,
      scaleSize: 5,
      isVertical: true,
      isDouble: true,
    };
    view = new View(initElement, options);
    update = jest.fn();
    view.subscribe(update);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initView', () => {
    test('should not fail if primary input do not exist', () => {
      const scaleElements = {
        0: '0',
        0.25: '0.25',
        0.5: '0.5',
        0.75: '0.75',
        1: '1',
      };
      view.initView(scaleElements);
      expect(view.input).not.toBeTruthy();
    });
  });

  describe('initView', () => {
    let scaleElements: { [key: string]: string };
    beforeEach(() => {
      scaleElements = {
        0: '0',
        0.25: '0.25',
        0.5: '0.5',
        0.75: '0.75',
        1: '1',
      };
      view.initView(scaleElements);
    });
    afterEach(() => {
      view.initElement.innerHTML = '';
    });
    test('should create wrapper', () => {
      expect(view.wrapper).toBeTruthy();
    });
    test('should create line', () => {
      expect(view.line).toBeTruthy();
    });
    test('should create thumb', () => {
      expect(view.thumb).toBeTruthy();
    });
    test('should not create tip', () => {
      expect(view.tip).not.toBeTruthy();
    });
    test('should create scale', () => {
      expect(view.scale).toBeTruthy();
    });
    test('should create progress', () => {
      expect(view.progress).toBeTruthy();
    });
    test('should create tip', () => {
      options.hasTip = true;
      options.hasScale = false;
      view.initView(scaleElements);
      expect(view.tip).toBeTruthy();
    });

    test('should find input', () => {
      options.isDouble = false;
      const input = document.createElement('input');
      input.classList.add('js-dw-slider__input_from');
      view.initElement.append(input);
      view.initView(scaleElements);
      expect(view.input).toBeTruthy();
    });
    test('should find extra input', () => {
      const input = document.createElement('input');
      input.classList.add('js-dw-slider__input_from');
      input.classList.add('js-dw-slider__input_to');
      view.initElement.append(input);
      view.initView(scaleElements);
      expect(view.input).toBeTruthy();
    });

    test('should not call initExtraElement for single', () => {
      options.isDouble = false;
      options.hasTip = true;
      view.initView(scaleElements);
      expect(view.tip.extra).not.toBeTruthy();
    });
  });

  describe('clearAllView', () => {
    let scaleElements: { [key: string]: string };
    beforeEach(() => {
      scaleElements = {
        0: '0',
        0.25: '0.25',
        0.5: '0.5',
        0.75: '0.75',
        1: '1',
      };
    });
    test('all view should be destroyed', () => {
      view.initView(scaleElements);
      view.clearAllView();
      expect(document.querySelector('.dw-slider')).not.toBeTruthy();
    });
  });

  describe('sendDataToSubviews', () => {
    afterEach(() => {
      view.initElement.innerHTML = '';
    });
    test('should send data to progress', () => {
      view.initView({ 0: '0', 1: '1' });
      const spyOnProgress = jest.spyOn(view.progress, 'update');
      view.sendDataToSubviews(1, 1);
      expect(spyOnProgress).toHaveBeenCalled();
    });
    test('should send data to tip', () => {
      const input = document.createElement('input');
      input.classList.add('js-dw-slider__input_from');
      input.classList.add('js-dw-slider__input_to');
      view.initElement.append(input);
      options.hasTip = true;
      view.initView({ 0: '0', 1: '1' });
      const spyOnTip = jest.spyOn(view.tip, 'update');
      view.sendDataToSubviews(1, 1, true);
      expect(spyOnTip).toHaveBeenCalled();
    });
    test('should send data to tip', () => {
      options.hasProgress = false;
      options.hasTip = true;
      options.isDouble = false;
      view.initView({ 0: '0', 1: '1' });
      const spyOnTip = jest.spyOn(view.tip, 'update');
      view.sendDataToSubviews(1, 1);
      expect(spyOnTip).toHaveBeenCalled();
    });
    test('should send data to input', () => {
      const inputFrom = document.createElement('input');
      inputFrom.classList.add('js-dw-slider__input_from');
      initElement.append(inputFrom);
      const inputTo = document.createElement('div');
      inputTo.classList.add('js-dw-slider__input_to');
      initElement.append(inputTo);
      options.hasProgress = false;
      options.hasTip = true;
      options.isDouble = false;
      view.initView({ 0: '0', 1: '1' });
      const spyOnInput = jest.spyOn(view.input, 'update');
      view.sendDataToSubviews(1, 1);
      expect(spyOnInput).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    test('should call notify mediator for extra', () => {
      view.update({
        value: 1, isCurrent: true, isExtra: true, isNearest: true,
      });
      expect(update).toHaveBeenCalled();
    });
    test('should call notify mediator for primary', () => {
      view.part = 0;
      view.partExtra = 0.1;
      view.update({
        value: 1, isCurrent: false, isExtra: false, isNearest: true,
      });
      expect(update).toHaveBeenCalled();
    });
    test('should call notify in mediator', () => {
      view.update({
        value: 1, isCurrent: true, isExtra: true, isNearest: false,
      });
      expect(update).toHaveBeenCalledTimes(1);
    });
  });
});
