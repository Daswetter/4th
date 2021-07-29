import Input from './Input';

describe('Input', () => {
  let input: Input;
  let update: jest.Mock;
  let initElement: HTMLElement;
  let inputFrom: HTMLInputElement;
  let inputTo: HTMLInputElement;
  beforeEach(() => {
    initElement = document.createElement('div');
    inputFrom = document.createElement('input');
    inputFrom.classList.add('js-dw-slider__input_from');
    initElement.append(inputFrom);
    inputTo = document.createElement('input');
    inputTo.classList.add('js-dw-slider__input_to');
    initElement.append(inputTo);
    input = new Input(initElement);
    update = jest.fn();
    input.subscribe(update);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('constructor', () => {
    test('should set event listener', () => {
      const change = new MouseEvent('change');
      inputFrom.dispatchEvent(change);
      expect(update).toHaveBeenCalled();
    });
    test('should not set event listener', () => {
      inputFrom.classList.remove('js-dw-slider__input_from');
      input = new Input(initElement);
      update = jest.fn();
      input.subscribe(update);
      const change = new MouseEvent('change');
      inputFrom.dispatchEvent(change);
      expect(update).not.toHaveBeenCalled();
    });
  });
  describe('initExtra', () => {
    test('should set change listener', () => {
      input.initExtra(initElement);
      input.subscribe(update);
      const change = new MouseEvent('change');
      inputTo.dispatchEvent(change);
      expect(update).toHaveBeenCalled();
    });
    test('should not set event listener', () => {
      inputTo.classList.remove('js-dw-slider__input_to');
      input.initExtra(initElement);
      input.subscribe(update);
      const change = new MouseEvent('change');
      inputTo.dispatchEvent(change);
      expect(update).not.toHaveBeenCalled();
    });
  });
  describe('update', () => {
    test('should print value', () => {
      input.update(1, false);
      expect(input.primary.value).toBe('1');
    });
    test('should print value', () => {
      input.initExtra(initElement);
      input.update(0.5, true);
      expect(input.extra.value).toBe('0.5');
    });
  });
});
