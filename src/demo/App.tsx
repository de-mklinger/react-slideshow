import {QuickStartSlideshow, TopBarChildren, Icon} from "../lib";
import { customizedDemoItems, CustomizedSlideshowItem } from "./demo-items.ts";

export default function App() {
  const RightChildren: TopBarChildren<CustomizedSlideshowItem> = (props) => {
    const item = props.items[props.itemIdx];

    const licenseLabel = (
      <Icon title={`Image License: ${item.license}`}>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
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
    <QuickStartSlideshow
      items={customizedDemoItems}
      topBarRightChildren={RightChildren}
    />
  );
}
