import type { PortableTextBlock } from "next-sanity";

export type SanityImageAsset = {
  _type: "reference";
  _ref: string;
};

export type SanityImage = {
  _type: "image";
  asset: SanityImageAsset;
};

export type Project = {
  _id: string;
  title: string;
  description: PortableTextBlock[];
  link: string | null;
  image_1: SanityImage;
  image_2: SanityImage;
  image_3: SanityImage;
};
