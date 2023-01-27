import { ReactNode } from "react";
import { MicrocmsImage } from "@/components/microcms/MicrocmsImage";

export const StickyBgContainer = ({
  bgImageUrl,
  children,
}: {
  bgImageUrl: string;
  children: ReactNode;
}) => (
  <div // Container
    className="relative"
  >
    <div // Sticky Background
      className={"sticky top-0 -mb-screen-large h-screen-large"}
    >
      <div className="relative h-full">
        <MicrocmsImage src={bgImageUrl} alt="" fill="cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/60" />
      </div>
    </div>
    <div className="relative">{children}</div>
  </div>
);
