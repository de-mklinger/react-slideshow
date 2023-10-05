import { QuickStartSlideshow, TopBarChildren } from "../lib";
import { customizedDemoItems, CustomizedSlideshowItem } from "./demo-items.ts";

export default function App() {
  const RightChildren: TopBarChildren<CustomizedSlideshowItem> = (props) => {
    const item = props.items[props.itemIdx];

    const licenseLabel = (
      <span title={`Image License: ${item.license}`}>[i]</span>
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
    <QuickStartSlideshow
      items={customizedDemoItems}
      topBarRightChildren={RightChildren}
    />
  );
}
