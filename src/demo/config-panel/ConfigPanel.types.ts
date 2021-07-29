import { IOptions } from '../../types';

type ChangeEvent = {
  element: HTMLInputElement,
  optionKey: string,
};

type ReducedChangeEvent = {
  optionKey: keyof IOptions,
};

export {
  ChangeEvent, ReducedChangeEvent,
};
