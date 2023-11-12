import { Meta, Story } from "@storybook/react";

import Dropdown from "./";

export default {
  title: "Components/Dropdown",
  parameters: {
    layout: "centered"
  },
  component: Dropdown
} as Meta;

const Template: Story = args => (
  // @ts-expect-error - Storybook types are incorrect
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttonContent: "Click Me",
  children: (
    <ul className='p-2 text-primary-text-color'>
      <li className='p-2 text-primary-text-color hover:cursor-pointer hover:bg-indigo-500 hover:text-primary-background-color'>
        Option 1
      </li>
      <li className='p-2 text-primary-text-color hover:cursor-pointer hover:bg-indigo-500 hover:text-primary-background-color'>
        Option 2
      </li>
      <li className='p-2 text-primary-text-color hover:cursor-pointer hover:bg-indigo-500 hover:text-primary-background-color'>
        Option 3
      </li>
    </ul>
  )
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  buttonContent: "More Options",
  children: (
    <div className='p-2 text-primary-text-color'>
      <ul>
        <li className='p-2 text-primary-text-color hover:cursor-pointer hover:bg-indigo-500 hover:text-primary-background-color'>
          Extended Option 1
        </li>
        <li className='p-2 text-primary-text-color hover:cursor-pointer hover:bg-indigo-500 hover:text-primary-background-color'>
          Extended Option 2
        </li>
      </ul>
    </div>
  )
};
