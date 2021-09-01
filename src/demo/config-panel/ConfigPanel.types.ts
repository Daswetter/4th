import { IOptions } from '../../types';

type ChangeEvent = {
  element: HTMLInputElement,
  optionKey: string,
};

type OptionKey = {
  optionKey: keyof IOptions,
};

export {
  ChangeEvent, OptionKey,
};
