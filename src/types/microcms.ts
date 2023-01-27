// eslint-disable-next-line import/named
import { MicroCMSListResponse } from "microcms-js-sdk";

export type Main = {
  siteDesc: string;
  companyProfile: string;
  backgroundImage: {
    url: string;
    width: number;
    height: number;
  };
};

export type Service = {
  slug: string;
  serviceName: string;
  backgroundImage: {
    url: string;
    width: number;
    height: number;
  };
  shortDesc: string;
  detailedDesc: string;
};

export type ServicesRes = MicroCMSListResponse<Service>;
