import { PropsValue } from "react-select";

export type OptionValue = string | number;

export type Option = {
  value: OptionValue;
  label: string;
};

export interface ISelectProps {
  name: string;
  type?: string;
  required?: boolean;
  value: PropsValue<Option | undefined> | string | string[] | number | number[];
  defaultValue?: PropsValue<Option | undefined>;
  error?: string;
  hint?: string;
  label?: string;
  max?: number;
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (
    option: Record<string, string[] | string | number[] | number>
  ) => void;
  options: Option[];
  inputWrapperClassName?: string;
}
