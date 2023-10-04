import { SlideshowItem } from "../react-slideshow";

export const xDemoItems: SlideshowItem[] = [
  {
    id: "1",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1182px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/277px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
  },
  {
    id: "2",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/1280px-Holy_SURP_Hovhannes_Church.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/320px-Holy_SURP_Hovhannes_Church.jpg",
  },
];

export type CustomizedSlideshowItem = SlideshowItem & {
  description?: string,
  caption?: string,
  license: string,
  infoUrl?: string,
}

export const customizedDemoItems: CustomizedSlideshowItem[] = [
  {
    id: "1",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1182px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/277px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    description: "Young stars, James Webb Space Telescope",
    caption: "Young stars form in 'The Pillars of Creation' as seen by NASA’s James Webb Space Telescope’s near-infrared camera",
    license: "Public domain",
    infoUrl: "https://commons.wikimedia.org/wiki/File:Pillars_of_Creation_(NIRCam_Image).jpg"
  },
  {
    id: "2",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/1280px-Holy_SURP_Hovhannes_Church.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/320px-Holy_SURP_Hovhannes_Church.jpg",
    license: "CC BY-SA 4.0 DEED",
    infoUrl: "https://commons.wikimedia.org/wiki/File:Holy_SURP_Hovhannes_Church.jpg"
  },

]
