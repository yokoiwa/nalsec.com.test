import Hamburger from "hamburger-react";
import { RefObject, useState } from "react";

export const TopTableOfContents = ({
  serviceList,
  companyRef,
  contactFormRef,
}: {
  serviceList: [string, RefObject<HTMLDivElement>][];
  companyRef: RefObject<HTMLDivElement>;
  contactFormRef: RefObject<HTMLDivElement>;
}) => {
  const [isOpen, setOpen] = useState(false);

  const scrollTo = (target: HTMLDivElement | null) => {
    if (!target || !target.parentElement) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pointer-events-none fixed inset-2 z-50 flex items-start justify-end p-1 md:inset-4 md:p-2 lg:inset-8 lg:p-4">
      <div
        className={
          "absolute inset-0 rounded-md bg-gradient-to-r from-black/80 via-black/90 to-black/80 transition duration-500 lg:left-auto lg:w-[32rem] " +
          (isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-[10%] opacity-0")
        }
      >
        <div className="flex h-full flex-col items-center justify-center space-y-8 text-center text-xl text-white">
          <ul className="flex flex-col space-y-4">
            {serviceList.map((service) => (
              <li
                key={service[0]}
                className="cursor-pointer"
                onClick={() => {
                  scrollTo(service[1].current);
                  setOpen(false);
                }}
              >
                {service[0]}
              </li>
            ))}
          </ul>
          <hr className="w-64 border-t" />
          <ul className="flex flex-col space-y-4">
            <li
              className="cursor-pointer"
              onClick={() => {
                scrollTo(companyRef.current);
                setOpen(false);
              }}
            >
              会社情報
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                scrollTo(contactFormRef.current);
                setOpen(false);
              }}
            >
              お問い合わせ
            </li>
          </ul>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-[-2em] bg-gradient-radial from-black/20 via-black/0 to-black/0 bg-contain bg-blend-multiply" />
        <div className="pointer-events-auto relative">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};
