import { Meta, StoryObj } from "@storybook/react";
import { Slideshow, SlideshowThemeSettings } from "../react-slideshow";
import {xDemoItems} from "../demo/demo-items";

const meta: Meta<typeof Slideshow> = {
  component: Slideshow,
  title: "Slideshow",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Slideshow>;
export const Default: Story = (args: typeof Default.args) => (
  <Slideshow data-testId="InputField-id" items={xDemoItems} {...args} />
);
Default.args = {
};

export const Small: Story = (args: typeof Small.args) => (
  <SlideshowThemeSettings overrides={{
    screen: {
      width: "800px",
      height: "600px",
      backgroundColor: "#333333"
    },
    meta: {
      thumbnailSizePx: 100,
      thumbnailFit: "cover"
    }
  }}>
    <Slideshow data-testId="InputField-id" items={xDemoItems} {...args} />
  </SlideshowThemeSettings>
);
Small.args = {
};
