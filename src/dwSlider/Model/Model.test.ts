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
        to: 120,
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
      expect(update).toHaveBeenCalledWith({ current: 200, part: 1, extra: false });
    });
    test('should filter small part correctly', () => {
      model.setPart(-10000, false);
      expect(update).toHaveBeenCalledWith({ current: -1800, part: 0, extra: false });
    });
  });

  describe('countScaleElements', () => {
    test('should return a correct object', () => {
      options.min = 0;
      options.max = 100;
      options.step = 1;
      options.scaleSize = 2;
      expect(model.countScaleElements()).toEqual({ 0: '0', 1: '100' });
    });
    test('should round correctly', () => {
      options.min = 0;
      options.max = 50;
      options.step = 1;
      options.scaleSize = 5;
      expect(model.countScaleElements()).toEqual({
        0: '0', 0.26: '13', 0.5: '25', 0.76: '38', 1: '50',
      });
    });
    test('should set correct part size scale', () => {
      options.min = 0;
      options.max = 5;
      options.step = 2;
      options.scaleSize = 2;
      expect(model.countScaleElements()).toEqual({ 0: '0', 0.8: '4' });
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
