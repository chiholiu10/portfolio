import dynamic from "next/dynamic";

export const dynamicImport = (path: string, componentName: string) => dynamic(
  () => import(`../components/${path}`).then((mod) => mod[componentName]),
  {
    ssr: false,
  },
);
