const request = require("request")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/gujarat-titans-vs-lucknow-super-giants-4th-match-1304050/live-cricket-score";
request(link,cb);
function cb(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let teamsName = document.querySelectorAll(".match-info.match-info-MATCH.match-info-MATCH-full-width .teams.has-rhs .team");
        console.log(teamsName[0].textContent);
        console.log(teamsName[1].textContent);
    }
    
    
}