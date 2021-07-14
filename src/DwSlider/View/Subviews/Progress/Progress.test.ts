import Progress from './Progress';

describe('Progress', () => {
  let progress: Progress;
  beforeEach(() => {
    const initElement = document.createElement('div');
    progress = new Progress(initElement);
  });
  describe('constructor', () => {
    test('should create div', () => {
      expect(progress.progress.nodeName).toBe('DIV');
    });
    test('should add class', () => {
      expect(progress.progress.className).toBe('dw-slider__progress');
    });
  });

  describe('setInitialSettings', () => {
    test('set right style.top for horizontal', () => {
      const lineSize = {
        width: 100,
        height: 500,
      };
      Object.defineProperty(progress.progress, 'offsetHeight', {
        value: '150',
      });
      progress.setInitialSettings(lineSize);
      expect(progress.progress.style.top).toBe('175px');
    });
    test('set right style for vertical', () => {
      const vertical = true;
      const lineSize = {
        width: 260,
        height: 500,
      };
      Object.defineProperty(progress.progress, 'offsetWidth', {
        value: '150',
      });
      progress.setInitialSettings(lineSize, vertical);
      expect(progress.progress.style.left).toBe('55px');
      expect(progress.progress.style.top).toBe('');
    });
  });

  describe('update', () => {
    test('should set correct style.left and style.right for primary', () => {
      const vertical = false;
      const extra = true;
      const lineSide = {
        width: 150,
        height: 15,
      };
      progress.update(0.3, lineSide, vertical, extra);
      progress.update(0.1, lineSide, vertical, false);
      expect(progress.progress.style.left).toBe('15px');
      expect(progress.progress.style.right).toBe('105px');
    });

    test('should set correct style.left and style.right for extra', () => {
      const vertical = false;
      const extra = true;
      const lineSide = {
        width: 150,
        height: 15,
      };
      progress.update(1, lineSide, vertical, extra);
      progress.update(0.5, lineSide, vertical, false);
      expect(progress.progress.style.left).toBe('75px');
      expect(progress.progress.style.right).toBe('0px');
    });

    test('should set correct style.bottom and style.top for primary', () => {
      const vertical = true;
      const extra = true;
      const lineSide = {
        width: 10,
        height: 500,
      };
      progress.update(0.5, lineSide, vertical, extra);
      progress.update(0.6, lineSide, vertical, false);
      expect(progress.progress.style.bottom).toBe('250px');
      expect(progress.progress.style.top).toBe('200px');
    });

    test('should set correct style.left and style.right for extra', () => {
      const vertical = true;
      const extra = true;
      const lineSide = {
        width: 5,
        height: 50,
      };
      progress.update(1, lineSide, vertical, extra);
      progress.update(0.5, lineSide, vertical, false);
      expect(progress.progress.style.bottom).toBe('25px');
      expect(progress.progress.style.top).toBe('0px');
    });
  });
});
