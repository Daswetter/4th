import { Observer } from '../../../../types';
import Input from './Input';

describe('Input', () => {
  let input: Input;
  const initElement = document.createElement('div');
  const inputFrom = document.createElement('input');
  inputFrom.classList.add('js-dwSlider__input_from');
  initElement.append(inputFrom);
  const inputTo = document.createElement('div');
  inputTo.classList.add('js-dwSlider__input_to');
  initElement.append(inputTo);
  let observer: Observer;
  beforeEach(() => {
    input = new Input(initElement);
    observer = {
      update: jest.fn(),
    };
    input.subscribe(observer);
  });
  describe('constructor', () => {
    test('should set event listener', () => {
      const change = new MouseEvent('change');
      inputFrom.dispatchEvent(change);
      expect(observer.update).toHaveBeenCalled();
    });
  });
  describe('initExtra', () => {
    test('should set change listener', () => {
      input.initExtra();
      observer = {
        update: jest.fn(),
      };
      input.subscribe(observer);
      const change = new MouseEvent('change');
      inputTo.dispatchEvent(change);
      expect(observer.update).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    test('should print value', () => {
      input.update(1, false);
      expect(input.primary.value).toBe('1');
    });
  });
});
