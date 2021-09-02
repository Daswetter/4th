import BoundaryLabels from './BoundaryLabels';

describe('BoundaryLabels', () => {
  let boundaryLabels: BoundaryLabels;
  const initElement = document.createElement('div');
  beforeEach(() => {
    boundaryLabels = new BoundaryLabels(initElement);
  });

  describe('constructor', () => {
    test('should create this.min and this.max', () => {
      expect(boundaryLabels.min).toBeTruthy();
      expect(boundaryLabels.max).toBeTruthy();
    });
  });

  describe('setInitialSettings', () => {
    let min: number;
    let max: number;
    let lineWidth: number;
    let thumbSize: {
      width: number,
      height: number
    };
    beforeEach(() => {
      min = 100;
      max = 200;
      lineWidth = 500;
      thumbSize = {
        width: 500,
        height: 10,
      };
      boundaryLabels.setInitialSettings(min, max, lineWidth, thumbSize);
    });
    test('should set correct style.bottom for min', () => {
      expect(boundaryLabels.min.innerText).toBe(String(min));
    });
    test('should set correct min', () => {
      const isVertical = true;
      Object.defineProperty(boundaryLabels.min, 'offsetHeight', {
        value: 50,
      });
      boundaryLabels.setInitialSettings(min, max, lineWidth, thumbSize, isVertical);

      expect(boundaryLabels.min.style.bottom).toBe('-25px');
    });
  });

  describe('update', () => {
    let isVertical: boolean;
    type TipParams = {
      width: number,
      height: number,
      left: number,
      top: number,
    };
    let tipParams: TipParams;
    let tipExtraParams: TipParams;
    beforeEach(() => {
      tipParams = {
        width: 100,
        height: 50,
        left: 10,
        top: -10,
      };
      tipExtraParams = {
        width: 80,
        height: 120,
        left: -10,
        top: 2,
      };
      isVertical = true;
      boundaryLabels.update(tipParams, isVertical, tipExtraParams);
    });
    test('should set correct min opacity', () => {
      expect(boundaryLabels.min.style.opacity).toBe('0');
    });
    test('should set correct max opacity', () => {
      isVertical = false;
      Object.defineProperty(boundaryLabels.max, 'offsetLeft', {
        value: 500,
      });
      boundaryLabels.update(tipParams, isVertical);
      expect(boundaryLabels.max.style.opacity).toBe('1');
    });
    test('should set correct min opacity', () => {
      isVertical = false;
      Object.defineProperty(boundaryLabels.min, 'offsetLeft', {
        value: 500,
      });
      boundaryLabels.update(tipParams, isVertical, tipExtraParams);
      expect(boundaryLabels.min.style.opacity).toBe('0');
    });
  });
});
