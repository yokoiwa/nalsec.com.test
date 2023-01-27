import parse, { Element } from "html-react-parser";

export const countElements = (text: string, element: string) => {
  let count = 0;

  parse(text, {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) return null;
      if (domNode.name === element) {
        count += 1;
      }
    },
  });

  return count;
};
