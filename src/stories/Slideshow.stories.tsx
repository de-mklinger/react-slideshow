import { Meta, StoryObj } from "@storybook/react";
import { Slideshow, SlideshowThemeSettings, TopBarChildren } from "../lib";
import { minimalDemoItems } from "../demo/demo-items";

const meta: Meta<typeof Slideshow> = {
  component: Slideshow,
  title: "Slideshow",
  argTypes: {},
};
export default meta;

const TopBarRightChildren: TopBarChildren = ({ itemIdx, items }) => (
  <div>
    <div>IDX {itemIdx}</div>
    <div>
      <a target="_blank" href={items[itemIdx].url}>
        Link
      </a>
    </div>
  </div>
);

type Story = StoryObj<typeof Slideshow>;
export const Default: Story = (args: typeof Default.args) => (
  <Slideshow
    data-testId="InputField-id"
    items={minimalDemoItems}
    topBarRightChildren={TopBarRightChildren}
    {...args}
  />
);
Default.args = {};

export const Small: Story = (args: typeof Small.args) => (
  <SlideshowThemeSettings
    overrides={{
      screen: {
        width: "800px",
        height: "600px",
        backgroundColor: "#333333",
      },
      meta: {
        thumbnailSizePx: 100,
        thumbnailFit: "cover",
      },
    }}
  >
    <Slideshow data-testId="InputField-id" items={minimalDemoItems} {...args} />
  </SlideshowThemeSettings>
);
Small.args = {};
