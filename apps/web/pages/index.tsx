import type { GetStaticProps } from "next";
import {
  HomeTemplate,
  HomeTemplateProps,
} from "@/components/templates/HomeTemplate/HomeTemplate";

export default HomeTemplate;

export const getStaticProps: GetStaticProps<HomeTemplateProps> = async () => {
  const { loadHomeSections } = await import("@/lib/contentful/home");
  return {
    props: {
      sections: await loadHomeSections(),
      isProduction: process.env.NODE_ENV === "production",
    },
    revalidate: 3600,
  };
};
