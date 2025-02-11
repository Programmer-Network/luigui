import classNames from "classnames";
import { FC } from "react";

import InputError from "Components/Inputs/Common/InputError";
import InputHeader from "Components/Inputs/Common/InputHeader";

import { Option, OptionValue } from "../Select/types";
import { IRadioGroup } from "./types";

const RadioGroup: FC<IRadioGroup> = (
  props = {
    value: "",
    onChange: () => null,
    options: []
  }
) => {
  const { value, onChange, inputWrapperClassName, options } = props;

  const handleChange = (value: OptionValue) => {
    if (!onChange) {
      throw new Error("💣 Input is missing onChange handler 💣");
    }

    onChange?.(value);
  };

  return (
    <div className={classNames(inputWrapperClassName)}>
      <InputHeader {...props} />
      <div className='form-control items-start yl-flex yl-gap-2 yl-flex-wrap'>
        {options?.map((option, index) => (
          <label
            className='label yl-flex yl-cursor-pointer yl-items-center yl-gap-2'
            key={index}
          >
            <input
              type='radio'
              value={option.value}
              checked={
                options?.findIndex((opt: Option) => opt.value === value) ===
                index
              }
              onChange={() => handleChange(option.value)}
              className='yl-cursor-pointer yl-text-primary focus:outline-primary'
            />
            <span className='yl-text-primary-text-color'>{option.label}</span>
          </label>
        ))}
      </div>
      {props.error && <InputError error={props.error} />}
    </div>
  );
};

export default RadioGroup;
