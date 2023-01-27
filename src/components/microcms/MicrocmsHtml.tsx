import parse, {
  attributesToProps,
  domToReact,
  Element,
} from "html-react-parser";
import { Props } from "html-react-parser/lib/attributes-to-props";
import { ReactNode, ReactElement, ComponentPropsWithRef } from "react";

export const MicrocmsHtml = ({
  children,
  replace,
  ...restProps
}: Omit<ComponentPropsWithRef<"div">, "children" | "replace"> & {
  children: string;
  replace?: (
    props: Props,
    children: ReactNode
  ) => Partial<{
    [_ in keyof JSX.IntrinsicElements | string]: () => ReactElement;
  }>;
}) => (
  <div {...restProps}>
    {replace
      ? parse(children, {
          replace: (domNode) => {
            if (!(domNode instanceof Element)) return null;
            const props = attributesToProps(domNode.attribs);
            const children = domToReact(domNode.children);

            const replacer = replace(props, children)[domNode.name] as () =>
              | ReactElement
              | undefined;
            if (replacer) return replacer();

            // if (typeof maybeElement === "function") return maybeElement();
            // else return maybeElement;
          },
        })
      : parse(children)}
  </div>
);
