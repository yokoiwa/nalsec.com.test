import { MutableRefObject, useEffect, useRef, useState } from "react";
import { MicrocmsHtml } from "@/components/microcms/MicrocmsHtml";
import { MicrocmsImage } from "@/components/microcms/MicrocmsImage";

export const ServicePage = ({
  mainH1Ref,
  serviceName,
  detailedDesc,
}: {
  mainH1Ref: MutableRefObject<HTMLHeadingElement | null>;
  serviceName: string;
  detailedDesc: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [h1Elms, setH1Elms] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    if (contentRef.current)
      setH1Elms(Array.from(contentRef.current.getElementsByTagName("h1")));
  }, []);

  const scrollTo = (target: HTMLDivElement | null) => {
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 50,
      left: 0,
      behavior: "smooth",
    });
    target.classList.add("animate-pulse", "animate-duration-500");
    setTimeout(
      () => target.classList.remove("animate-pulse", "animate-duration-500"),
      1500
    );
  };

  return (
    <div // Content Area
      className="bg-content-gradient lg:bg-content-gradient-alt xl:bg-content-gradient relative z-10 flex w-full animate-slidein flex-col items-center justify-center rounded-[20px] bg-white/80 pb-32 pt-[20px]  animate-delay-[1500ms] lg:flex-row xl:pr-[240px]"
    >
      <div // Table of Contents
        className="bg-content-gradient sticky top-0 z-10 w-full self-start lg:w-[240px] lg:bg-none"
      >
        <ul className="flex w-full flex-row items-center justify-start space-x-4 overflow-x-auto whitespace-nowrap py-4 px-[20px] leading-none shadow-sm lg:flex-col lg:items-start lg:space-x-0 lg:space-y-4 lg:space-y-4 lg:whitespace-normal lg:py-16 lg:shadow-none">
          <li className="shrink-0 border-r pr-4 text-xl leading-none lg:border-r-0 lg:border-b lg:pr-0 lg:pb-4">
            <a
              className="cursor-pointer hover:opacity-50 motion-safe:transition-opacity"
              onClick={() => scrollTo(mainH1Ref.current)}
            >
              {serviceName}
            </a>
          </li>
          {h1Elms.map((elm, index) => (
            <li key={index} className="shrink-0">
              <a
                className="cursor-pointer hover:opacity-50 motion-safe:transition-opacity"
                onClick={() => scrollTo(elm)}
              >
                {elm.innerText}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div ref={contentRef} className="mt-16 px-[20px]">
        <MicrocmsHtml
          className="mx-auto max-w-[800px] space-y-4"
          replace={(props, children) => ({
            h1: () => (
              <h1
                {...props}
                className="inline-block border-b pb-2 pt-8 pr-8 text-2xl leading-none"
              >
                {children}
              </h1>
            ),
            img: () => {
              const url = new URL(props.src);
              const width = parseInt(url.searchParams.get("w") || "");
              const height = parseInt(url.searchParams.get("h") || "");
              url.search = "";
              if (width && height)
                return (
                  <MicrocmsImage
                    alt=""
                    {...props}
                    src={url.href}
                    width={width}
                    height={height}
                    className="mx-auto"
                  />
                );
              // eslint-disable-next-line @next/next/no-img-element
              else return <img alt="" {...props} className="mx-auto" />;
            },
            iframe: () => {
              delete props.allow;
              return (
                <iframe
                  {...props}
                  className="mx-auto h-auto max-w-full"
                  style={{
                    aspectRatio: `${props.width}/${props.height}`,
                  }}
                >
                  {children}
                </iframe>
              );
            },
            a: () => (
              <a {...props} className="text-blue-600 underline">
                {children}
              </a>
            ),
          })}
        >
          {detailedDesc}
        </MicrocmsHtml>
      </div>
    </div>
  );
};
