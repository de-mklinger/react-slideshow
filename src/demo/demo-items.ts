import { SlideshowItem } from "../lib";

export type CustomizedSlideshowItem = SlideshowItem & {
  description?: string;
  caption?: string;
  license: string;
  infoUrl?: string;
};

export const customizedDemoItems: CustomizedSlideshowItem[] = [
  {
    id: "1",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1182px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/277px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    description: "Young stars, James Webb Space Telescope",
    caption:
      "Young stars form in 'The Pillars of Creation' as seen by NASA’s James Webb Space Telescope’s near-infrared camera",
    license: "Public domain",
    infoUrl:
      "https://commons.wikimedia.org/wiki/File:Pillars_of_Creation_(NIRCam_Image).jpg",
  },
  {
    id: "2",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/1280px-Holy_SURP_Hovhannes_Church.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Holy_SURP_Hovhannes_Church.jpg/320px-Holy_SURP_Hovhannes_Church.jpg",
    license: "CC BY-SA 4.0 DEED",
    infoUrl:
      "https://commons.wikimedia.org/wiki/File:Holy_SURP_Hovhannes_Church.jpg",
  },
  {
    id: "3",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/01/Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg/320px-Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg",
    license: "CC BY-SA 4.0 DEED",
    infoUrl:
      "https://commons.wikimedia.org/wiki/File:Alcedo_atthis_-_Riserve_naturali_e_aree_contigue_della_fascia_fluviale_del_Po.jpg",
  },
  {
    id: "4",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Evolution_of_a_Tornado.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Evolution_of_a_Tornado.jpg/320px-Evolution_of_a_Tornado.jpg",
    license: "CC BY-SA 4.0 DEED",
    infoUrl:
      "https://commons.wikimedia.org/wiki/File:Evolution_of_a_Tornado.jpg",
  },
  {
    id: "5",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/FCAB_EMD_GT22CU-3_San_Pedro_-_Ascotan.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/FCAB_EMD_GT22CU-3_San_Pedro_-_Ascotan.jpg/640px-FCAB_EMD_GT22CU-3_San_Pedro_-_Ascotan.jpg",
    license: "CC BY-SA 4.0 DEED",
    infoUrl:
      "https://commons.wikimedia.org/wiki/File:FCAB_EMD_GT22CU-3_San_Pedro_-_Ascotan.jpg",
  },
  {
    id: "6",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Khaoyai_06.jpg",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Khaoyai_06.jpg/320px-Khaoyai_06.jpg",
    license: "CC BY-SA 3.0 DEED",
    infoUrl: "https://commons.wikimedia.org/wiki/File:Khaoyai_06.jpg",
    description:
      "Wild elephants walking up a road in the area of Khao Yai National Park.",
  },
];

export const minimalDemoItems: SlideshowItem[] = customizedDemoItems.slice(0, 3).map(
  (i) => ({
    id: i.id,
    url: i.url,
    thumbnailUrl: i.thumbnailUrl,
  }),
);
