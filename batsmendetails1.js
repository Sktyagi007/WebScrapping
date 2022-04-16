const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/chennai-super-kings-vs-kolkata-knight-riders-1st-match-1304047/full-scorecard";

request(link,cb);

function cb(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const batsmen = document.querySelectorAll(".batsman-cell.text-truncate.out a");
        // console.log(batsmen.length);
        for(let i = 0; i<batsmen.length; i++){
            let batsmanLink = batsmen[i].href;
            let completeLink = "https://www.espncricinfo.com"+batsmanLink
            // console.log(completeLink);
            request(completeLink,cb1);
        }
    }
}  
function cb1(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const batsmenInfo = document.querySelector(".player-card-padding.player_overview-grid");
        let player = document.querySelectorAll("div H5");
        let playerName = player[0].textContent;
        let playerAge = player[2].textContent;
        console.log(playerName,playerAge);
    }
}  