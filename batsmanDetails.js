const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/royal-challengers-bangalore-vs-kolkata-knight-riders-6th-match-1304052/full-scorecard";

request(link,cb);

function cb(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let batsmanTable = document.querySelectorAll(".batsman-cell.text-truncate.out a");
        // console.log(batsmanTable.length);
        for(let i = 0; i<batsmanTable.length; i++){
            let batsmanLink = batsmanTable[i].href;
            let completeLink = "https://www.espncricinfo.com"+batsmanLink
            // console.log(completeLink);
            request(completeLink,cb2);
        }
    }
}
function cb2(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let batsmanInfo = document.querySelector(".player-card-padding .player_overview-grid");
        // console.log(batsmanInfo.length);
        let playerH5 = batsmanInfo.querySelectorAll("div H5")
        let fullName = playerH5[0].textContent;
        let Dob = playerH5[1].textContent;
        console.log(fullName,Dob);
    }

}