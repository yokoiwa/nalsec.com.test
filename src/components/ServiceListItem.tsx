// import BezierEasing from "bezier-easing";
import { CSSProperties, RefObject, useRef, useState } from "react";
import { HeroArea } from "@/components/HeroArea";
import { StickyBgContainer } from "@/components/StickyBgContainer";
import { useIntersection } from "@/hooks/useIntersection";
import { Service } from "@/types/microcms";

export const ServiceListItem = ({
  serviceName,
  shortDesc,
  backgroundImage,
  scrollToRef,
  slug,
}: Service & {
  scrollToRef: RefObject<HTMLDivElement>;
}) => {
  // const [debug, setDebug] = useState<string>("");

  // const copyRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const areaRef = useIntersection(({ top, bottom, lvh }) => {
    // setDebug("" + bottom);

    Object.assign(serviceRef.current?.style || {}, {
      opacity: top < 0 ? top * 2 + 1 : bottom < 0 ? 1 : bottom * -1 + 1,
      transform: `translateY(${
        top < 0 ? top * -20 * lvh : bottom < 0 ? 0 : bottom * 40 * lvh
      }px)`,
    } as CSSProperties);

    Object.assign(areaRef.current?.style || {}, {
      // transform: bottom < 0 ? "scale(1)" : `scale(${bottom * -0.1 + 1})`,
      backgroundColor:
        bottom < 0 ? "rgba(0,0,0,0)" : `rgba(0,0,0,${bottom * 0.8})`,
    } as CSSProperties);
  });
  return (
    <div>
      <StickyBgContainer bgImageUrl={backgroundImage.url}>
        {/*<div className="sticky top-0 bg-white p-4">{debug}</div>*/}
        <div className="h-[200lvh]" ref={areaRef}>
          <div className="sticky top-0 pt-[40px]" ref={scrollToRef}>
            <div ref={serviceRef}>
              <HeroArea
                serviceName={serviceName}
                shortDesc={shortDesc}
                linkUrl={`/services/${slug}`}
              />
            </div>
          </div>
        </div>
      </StickyBgContainer>
    </div>
  );
};
