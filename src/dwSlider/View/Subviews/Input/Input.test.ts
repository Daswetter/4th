import Input from './Input';

describe('Input', () => {
  let input: Input;
  const initElement = document.createElement('div');
  const inputFrom = document.createElement('input');
  inputFrom.classList.add('js-dw-slider__input_from');
  initElement.append(inputFrom);
  const inputTo = document.createElement('div');
  inputTo.classList.add('js-dw-slider__input_to');
  initElement.append(inputTo);
  let update: jest.Mock;
  beforeEach(() => {
    input = new Input(initElement);
    update = jest.fn();
    input.subscribe(update);
  });
  describe('constructor', () => {
    test('should set event listener', () => {
      const change = new MouseEvent('change');
      inputFrom.dispatchEvent(change);
      expect(update).toHaveBeenCalled();
    });
  });
  describe('initExtra', () => {
    test('should set change listener', () => {
      input.initExtra();
      input.subscribe(update);
      const change = new MouseEvent('change');
      inputTo.dispatchEvent(change);
      expect(update).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    test('should print value', () => {
      input.update(1, false);
      expect(input.primary.value).toBe('1');
    });
    test('should print value', () => {
      input.update(0.5, true);
      expect(input.extra.value).toBe('0.5');
    });
  });
});
