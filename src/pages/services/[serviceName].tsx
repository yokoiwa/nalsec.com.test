import { GetStaticPaths, GetStaticProps } from "next";
import { useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { HeroArea } from "@/components/HeroArea";
import { ServicePage } from "@/components/ServicePage";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBgContainer } from "@/components/StickyBgContainer";
import { microcmsClient } from "@/libs/microcms/microcmsClient";
import { Service, ServicesRes } from "@/types/microcms";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await microcmsClient.get<ServicesRes>({
    endpoint: "services",
  });
  const paths = res.contents.map((service) => "/services/" + service.slug);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Service> = async ({ params }) => {
  const res = await microcmsClient.get<ServicesRes>({
    endpoint: "services",
    queries: { filters: "slug[equals]" + params?.serviceName },
  });
  return {
    props: res.contents[0],
  };
};

export default ({
  serviceName,
  backgroundImage,
  shortDesc,
  detailedDesc,
}: Service) => {
  const mainH1Ref = useRef<HTMLHeadingElement>(null);

  return (
    <StickyBgContainer bgImageUrl={backgroundImage.url}>
      <HeroArea
        h1Ref={mainH1Ref}
        serviceName={serviceName}
        shortDesc={shortDesc}
      />
      <ServicePage
        mainH1Ref={mainH1Ref}
        serviceName={serviceName}
        detailedDesc={detailedDesc}
      />
      <ContactForm serviceName={serviceName} />
      <SiteFooter />
    </StickyBgContainer>
  );
};
