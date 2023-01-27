import { ImageLoader } from "next/image";

export const imageLoader: ImageLoader = ({ src, width }) =>
  `${src}?auto=format&fit=max&w=${width}`;
