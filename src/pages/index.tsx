import { GetStaticProps } from "next";
import { createRef, RefObject, useEffect, useRef } from "react";
import { CompanyInfo } from "@/CompanyInfo";
import { ContactForm } from "@/components/ContactForm";
import { ServiceListItem } from "@/components/ServiceListItem";
import { SiteFooter } from "@/components/SiteFooter";
import { TopHeroArea } from "@/components/TopHeroArea";
import { TopTableOfContents } from "@/components/TopTableOfContents";
import { microcmsClient } from "@/libs/microcms/microcmsClient";
import { Main, Service, ServicesRes } from "@/types/microcms";

export const getStaticProps: GetStaticProps<{
  main: Main;
  services: Service[];
}> = async () => {
  const resMain = await microcmsClient.get<Main>({
    endpoint: "main",
  });
  const resServices = await microcmsClient.get<ServicesRes>({
    endpoint: "services",
  });
  return {
    props: { main: resMain, services: resServices.contents },
  };
};

export default (props: { main: Main; services: Service[] }) => {
  const { main, services } = props;
  const serviceList = useRef<[string, RefObject<HTMLDivElement>][]>(
    services.map((service) => [service.serviceName, createRef()])
  );
  const companyRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <TopTableOfContents
        serviceList={serviceList.current}
        companyRef={companyRef}
        contactFormRef={contactFormRef}
      />
      <TopHeroArea {...main} />
      {services.map((service, index) => (
        <ServiceListItem
          key={index}
          {...service}
          scrollToRef={serviceList.current[index][1]}
        />
      ))}
      <CompanyInfo {...main} scrollToRef={companyRef} />
      <ContactForm isTopPage scrollToRef={contactFormRef} />
      <SiteFooter />
    </div>
  );
};
