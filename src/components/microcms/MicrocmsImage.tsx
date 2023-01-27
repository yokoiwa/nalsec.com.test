import NextImage, { ImageProps } from "next/image";
import { imageLoader } from "@/libs/microcms/imageLoader";

type ImagePropsWithFill = Omit<ImageProps, "fill" | "loader"> & {
  fill: true | "contain" | "cover";
};
type ImagePropsWithoutFill = Omit<ImageProps, "width" | "height" | "loader"> &
  Required<Pick<ImageProps, "width" | "height">>;

export const MicrocmsImage = ({
  fill,
  style,
  ...restProps
}: ImagePropsWithFill | ImagePropsWithoutFill) => {
  return (
    <NextImage
      {...restProps}
      fill={!!fill}
      loader={imageLoader}
      style={{
        ...style,
        objectFit: fill === "contain" || fill === "cover" ? fill : undefined,
      }}
    />
  );
};
