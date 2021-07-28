import { IOptions } from '../../types';

type ChangeEvent = {
  element: HTMLInputElement,
  optionKey: keyof IOptions,
};

type ReducedChangeEvent = {
  optionKey: keyof IOptions,
};

export { ChangeEvent, ReducedChangeEvent };
