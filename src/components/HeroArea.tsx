import Link from "next/link";
import { MutableRefObject } from "react";
import { MicrocmsParagraph } from "@/components/microcms/MicrocmsParagraph";

export const HeroArea = ({
  h1Ref,
  serviceName,
  shortDesc,
  linkUrl,
}: {
  h1Ref?: MutableRefObject<HTMLHeadingElement | null>;
  serviceName: string;
  shortDesc: string;
  linkUrl?: string;
}) => (
  <div // Hero area
    className="mb-[-40px] flex min-h-screen-small max-w-full flex-col justify-center px-[20px] pb-[40px] text-white"
  >
    <div className="max-w-[800px] py-16">
      <h1
        ref={h1Ref}
        className="relative mb-8 inline-block pr-16 text-5xl font-bold lg:text-6xl"
      >
        <div className="animate-fade-slidein">
          {serviceName}
          <hr className="mt-6 w-full origin-left animate-[expand-title-underline_both] border-t-2 animate-duration-1000 animate-delay-500" />
        </div>
      </h1>
      <div className="relative">
        <MicrocmsParagraph
          className="animate-fade-slidein animate-delay-500"
          style={
            linkUrl
              ? {
                  height: "12rem",
                  maskImage:
                    "linear-gradient(to bottom, white, transparent 6rem)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, white, transparent 6rem)",
                }
              : {}
          }
        >
          {shortDesc}
        </MicrocmsParagraph>
        {linkUrl && (
          <Link
            href={linkUrl}
            className="absolute left-1/2 top-24 -translate-x-1/2 rounded-md border px-4 py-2"
          >
            詳細を見る
          </Link>
        )}
      </div>
    </div>
  </div>
);
