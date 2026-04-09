import {
  Icon,
  QuickStartSlideshow,
  TopBarChildren,
  SlideshowSettings,
  SlideshowSettingsProvider,
} from "../lib";
import { customizedDemoItems, CustomizedSlideshowItem } from "./demo-items.ts";
import { CircleInfoSvg } from "../lib/components/controls/icons";

const settings: SlideshowSettings = {
  theme: {
    overrides: {
      meta: {
        hideEnabled: false,
      },
    },
  },
};

export default function App() {
  const RightChildren: TopBarChildren<CustomizedSlideshowItem> = (props) => {
    const item = props.items[props.itemIdx];

    const licenseLabel = (
      <Icon title={`Image License: ${item.license}`}>
        <CircleInfoSvg />
      </Icon>
    );

    return (
      <>
        {item.description && <label>{item.description}</label>}
        {item.infoUrl ? (
          <a href={item.infoUrl} target="_blank">
            {licenseLabel}
          </a>
        ) : (
          <>{licenseLabel}</>
        )}
      </>
    );
  };

  return (
    <SlideshowSettingsProvider settings={settings}>
      <QuickStartSlideshow
        items={customizedDemoItems}
        topBarRightChildren={RightChildren}
      />
    </SlideshowSettingsProvider>
  );
}
