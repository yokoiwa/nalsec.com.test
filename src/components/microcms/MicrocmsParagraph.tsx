import { Fragment, ComponentPropsWithRef } from "react";

export const MicrocmsParagraph = ({
  children,
  ...restProps
}: Omit<ComponentPropsWithRef<"p">, "children"> & {
  children: string;
}) => {
  return (
    <p {...restProps}>
      {children
        .split(/(\n)/)
        .map((line, index) =>
          line.match(/\n/) ? (
            <br key={index} />
          ) : (
            <Fragment key={index}>{line}</Fragment>
          )
        )}
    </p>
  );
};
