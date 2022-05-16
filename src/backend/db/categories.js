import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [{
        _id: uuid(),
        categoryName: "Tollywood",
        description: "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tXtLRpOD8jtwcDtVdYe1PAHaEU%26pid%3DApi&f=1"
    },
    {
        _id: uuid(),
        categoryName: "Bollywood",
        description: "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fgodofindia.com%2Fwp-content%2Fuploads%2F2017%2F05%2Fshahrukh-khan-60.jpg&f=1&nofb=1"
    },
    {
        _id: uuid(),
        categoryName: "Cartoon",
        description: "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1HuSThGxRGEgx6AR-n3_cgHaEc%26pid%3DApi&f=1"
    },
];