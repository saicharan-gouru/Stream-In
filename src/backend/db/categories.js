import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [{
        _id: uuid(),
        categoryName: "Tollywood",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tXtLRpOD8jtwcDtVdYe1PAHaEU%26pid%3DApi&f=1"
    },
    {
        _id: uuid(),
        categoryName: "Bollywood",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fgodofindia.com%2Fwp-content%2Fuploads%2F2017%2F05%2Fshahrukh-khan-60.jpg&f=1&nofb=1"
    },
    {
        _id: uuid(),
        categoryName: "Cartoon",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1HuSThGxRGEgx6AR-n3_cgHaEc%26pid%3DApi&f=1"
    },
];