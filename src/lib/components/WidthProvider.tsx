import { type RefCallback, useCallback, useRef, useState } from "react";

export type PropsWithWidth = {
  width: number;
};

export type WidthProviderProps = {
  children: (props: PropsWithWidth) => void; // TODO rename
};

export default function WidthProvider({ children }: WidthProviderProps) {
  const [width, setWidth] = useState<number>();

  const observer = useRef<ResizeObserver>();
  const ref: RefCallback<HTMLElement> = useCallback((node) => {
    if (node) {
      observer.current = new ResizeObserver(() => {
        setWidth(node.getBoundingClientRect().width);
      });
      observer.current.observe(node);
    } else {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
    }
  }, []);

  return (
    <>
      <div ref={ref} />
      {!!width && children({ width })}
    </>
  );
}
