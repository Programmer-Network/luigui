import { faker } from "@faker-js/faker";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

import RadioGroup from ".";
import { OptionValue } from "../Select/types";

export default {
  title: "Input/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    onChange: { action: "changed" }
  }
};

const dummyRadios = Array(5)
  .fill(0)
  .map(() => ({
    value: Math.floor(Math.random() * 1000000),
    label: faker.lorem.words(Math.floor(Math.random() * 10) + 1)
  }));

export const Default = () => {
  const [value, setValue] = useState<OptionValue>(1);
  return (
    <RadioGroup
      value={value}
      onChange={value => {
        setValue(value);
        action("onChange")(value);
      }}
      options={dummyRadios}
    />
  );
};
