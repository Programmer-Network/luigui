import { Option, OptionValue } from "../Select/types";

export interface IRadioGroup {
  name?: string;
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
  inputWrapperClassName?: string;
  error?: string;
  options?: Option[];
}
