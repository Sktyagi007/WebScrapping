const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const link = "https://www.goibibo.com/hotels/";

request(link,cb);

function cb(error, response, html){
    if(error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allplaces = document.querySelectorAll(".PopularDestinationsUIstyles__PopularImageOuterWrapper-sc-1ir08i0-2.fggXza a");
        console.log(allplaces);
        for(let i = 0; i<allplaces.length; i++){
            let link = allplaces[i].href;
            let completeLink = "https://www.goibibo.com"+link;
            // console.log(completeLink);
        }
    }
}