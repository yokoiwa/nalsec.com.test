// import BezierEasing from "bezier-easing";
import { CSSProperties, useRef, useState } from "react";
import { StickyBgContainer } from "@/components/StickyBgContainer";
import { MicrocmsParagraph } from "@/components/microcms/MicrocmsParagraph";
import { NalsecLogo } from "@/components/nalsecLogo";
import { useIntersection } from "@/hooks/useIntersection";
import { Main, Service } from "@/types/microcms";

export const TopHeroArea = ({ siteDesc, backgroundImage }: Main) => {
  // const [debug, setDebug] = useState<string>("");

  const copyRef = useRef<HTMLDivElement>(null);
  const areaRef = useIntersection(({ top, bottom, lvh }) => {
    // setDebug("" + bottom);

    Object.assign(copyRef.current?.style || {}, {
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
          <div className="sticky top-0 pt-[40px]">
            <div ref={copyRef}>
              <div // Hero area
                className="mb-[-40px] flex min-h-screen-small max-w-full flex-col justify-center px-[20px] pb-[40px] text-white"
              >
                <div className="flex max-w-[800px] flex-col py-16 lg:max-w-full lg:flex-row lg:items-center">
                  <h1 className="relative mb-8 inline-block pr-16 text-5xl font-bold lg:mb-0 lg:text-6xl">
                    <div className="flex animate-fadein flex-col items-start lg:flex-row lg:items-center">
                      <div className="w-[80lvmin] p-1 md:w-[50lvmin] lg:mr-16">
                        <NalsecLogo fillColor="#FFFFFF" />
                      </div>
                      <hr className="mt-6 w-[80lvmin] origin-left animate-[expand-title-underline_both] border-t-4 animate-delay-500 animate-duration-1000 md:w-[50lvmin] lg:mt-0 lg:h-32 lg:w-0 lg:animate-[expand-title-sideline_both] lg:border-t-0 lg:border-r-4 lg:animate-duration-1000 lg:animate-delay-500" />
                    </div>
                  </h1>
                  <MicrocmsParagraph className="animate-fade-slidein pt-2 leading-loose animate-delay-500 lg:animate-fade-slidein-from-left lg:animate-delay-500">
                    {siteDesc}
                  </MicrocmsParagraph>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StickyBgContainer>
    </div>
  );
};
