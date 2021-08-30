import { IOptions } from '../../types';
import Model from './Model';

describe('Model', () => {
  let model: Model;
  let options: IOptions;
  let update: jest.Mock;
  beforeEach(() => {
    options = {
      min: -1800,
      max: 200,
      from: 0,
      to: 100,
      step: 100,
      progress: true,
      tip: true,
      scale: true,
      scaleSize: 5,
      vertical: true,
      double: true,
    };
    model = new Model(options);
    update = jest.fn();
    model.subscribe(update);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setCurrent', () => {
    test('call mock', () => {
      model.setCurrent(0.1);
      expect(update).toHaveBeenCalled();
    });
    test('call mock', () => {
      options = {
        min: 0.1,
        max: 0.9,
        from: 0.5,
        to: 0.1,
        step: 0.1123,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      };
      model = new Model(options);
      model.subscribe(update);
      model.setCurrent(0.1);
      expect(update).toHaveBeenCalled();
    });
    test('should work for part size scale', () => {
      options = {
        min: 0,
        max: 120,
        from: 118,
        to: 120,
        step: 50,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      };
      model = new Model(options);
      model.subscribe(update);
      model.setCurrent(120);
      expect(update).toHaveBeenCalledTimes(1);
    });
    test('should work for part size scale', () => {
      options = {
        min: 0,
        max: 130,
        from: 118,
        to: -10,
        step: 33,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      };
      model = new Model(options);
      model.subscribe(update);
      model.setCurrent(1);
      expect(update).toHaveBeenCalledTimes(1);
    });
    test('should work for part size scale with step 1 and max 2.5', () => {
      options.min = 0;
      options.max = 2.5;
      options.step = 1;
      model = new Model(options);
      model.subscribe(update);
      const extra = true;
      model.setCurrent(1, extra);
      expect(update).toHaveBeenCalledWith({
        current: 2.5, eventName: 'data', extra: true, part: 1,
      });
    });
    test('should work for part size scale with step 0.1 and max 0.09', () => {
      options.min = -1.81;
      options.max = 0.09;
      options.step = 0.1;
      model = new Model(options);
      model.subscribe(update);
      model.setCurrent(0);
      expect(update).toHaveBeenCalledWith({
        current: -1.81, eventName: 'data', extra: false, part: 0,
      });
    });
    test('should work for part size scale with step 14 and max 105', () => {
      options.min = 10;
      options.max = 105;
      options.step = 14;
      model = new Model(options);
      model.subscribe(update);
      model.setCurrent(0.94);
      expect(update).toHaveBeenCalledWith({
        current: 94, eventName: 'data', extra: false, part: 0.8842105263157893,
      });
    });
  });

  describe('setPart', () => {
    test('should call mock', () => {
      model.setPart(21);
      expect(update).toHaveBeenCalled();
    });
    test('should call mock 1 time', () => {
      options = {
        min: 0,
        max: 120,
        from: 118,
        to: 120,
        step: 50,
        progress: true,
        tip: true,
        scale: true,
        scaleSize: 5,
        vertical: true,
        double: true,
      };
      model = new Model(options);
      model.subscribe(update);
      model.setPart(120);
      expect(update).toHaveBeenCalledTimes(1);
    });
    test('should filter big part correctly ', () => {
      model.setPart(1200, false);
      expect(update).toHaveBeenCalledWith({
        current: 200, part: 1, extra: false, eventName: 'data',
      });
    });
    test('should filter small part correctly', () => {
      model.setPart(-10000, false);
      expect(update).toHaveBeenCalledWith({
        current: -1800, part: 0, extra: false, eventName: 'data',
      });
    });
  });

  describe('countScaleElements', () => {
    test('should return a correct object', () => {
      options.min = 0;
      options.max = 100;
      options.step = 1;
      options.scaleSize = 2;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({ 0: '0', 1: '100' });
    });
    test('should round correctly', () => {
      options.min = 0;
      options.max = 50;
      options.step = 1;
      options.scaleSize = 5;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({
        0: '0', 0.26: '13', 0.5: '25', 0.76: '38', 1: '50',
      });
    });
    test('should set correct part size scale', () => {
      options.min = 0;
      options.max = 5;
      options.step = 2;
      options.scaleSize = 2;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({ 0: '0', 0.8: '4' });
    });
    test('should set correct part size scale with step 1 and min = -18.1', () => {
      options.min = -18.1;
      options.max = 0.9;
      options.step = 1;
      options.scaleSize = 2;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({ 0: '-18.1', 1: '0.9' });
    });
    test('should set correct part size scale with step 1 and min = -18.11', () => {
      options.min = -18.11;
      options.max = 0.89;
      options.step = 1;
      options.scaleSize = 2;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({ 0: '-18.11', 1: '0.89' });
    });
    test('should set correct full size scale', () => {
      options.min = 0;
      options.max = 0.6;
      options.step = 0.1;
      options.scaleSize = 2;
      model = new Model(options);
      expect(model.countScaleElements()).toEqual({ 0: '0', 1: '0.6' });
    });
  });

  describe('refreshAll', () => {
    test('should call callback', () => {
      model.refreshAll(options);
      expect(update).toHaveBeenCalled();
    });
    test('should filter options', () => {
      options.step = 0;
      options.min = -1;
      options.max = -10;
      options.scaleSize = 1;
      model.refreshAll(options);
      expect(update).toHaveBeenCalled();
    });
    test('should filter options', () => {
      options.step = -200;
      options.min = -1;
      options.max = -1;
      options.scaleSize = 21;
      model.refreshAll(options);
      expect(update).toHaveBeenCalled();
    });
  });
});
