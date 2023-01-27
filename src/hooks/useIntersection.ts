import { useCallback, useEffect, useMemo, useRef } from "react";

export const useIntersection = (
  callback: (param: {
    top: number;
    center: number;
    bottom: number;
    lvh: number;
  }) => any
) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const isInitial = useRef<boolean>(true);

  const listener = useCallback(() => {
    if (targetRef.current) {
      const clientRect = targetRef.current.getBoundingClientRect();
      const windowHeight = document.documentElement.clientHeight;

      const top = -clientRect.top / windowHeight;
      const center =
        0.5 - (clientRect.top + clientRect.height / 2) / windowHeight;
      const bottom = 1 - (clientRect.top + clientRect.height) / windowHeight;

      const lvh = windowHeight * 0.01;

      callback({ top, center, bottom, lvh });
    }

    // setTimeout(listener, 1);
    animationFrameRef.current = requestAnimationFrame(listener);
  }, [callback]);

  const observer = useMemo(() => {
    if (typeof window !== "undefined")
      return new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          listener();
        } else {
          window.cancelAnimationFrame(animationFrameRef.current);
        }
      });
  }, [listener]);

  useEffect(() => {
    if (isInitial.current) listener();
    window.cancelAnimationFrame(animationFrameRef.current);
    isInitial.current = false;

    if (targetRef.current) {
      observer?.observe(targetRef.current);
    }
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [listener, observer]);

  return targetRef;
};
