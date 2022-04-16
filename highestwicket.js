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
        let bowlerTable = document.querySelectorAll(".table.bowler");
        let mostWickets = 0;
        for(let i = 0; i<bowlerTable.length; i++){
            let rows = bowlerTable[i].querySelectorAll("tbody tr");
            for(let j = 0; j<rows.length ; j++){
                let tds = rows[j].querySelectorAll("td");
                if(tds.length>1){
                    let name = tds[0].textContent;
                    let wickets = tds[4].textContent;
                    // console.log("name-->",name,"wickets-->",wickets);
                    if(wickets>mostWickets){
                        mostWickets = wickets;
                        nameOfHighestWicketTaker = name;
                    }
                }
            }
        }
        console.log("HighestWicketTaker-->",nameOfHighestWicketTaker);
        console.log("wickets-->",mostWickets);
    }
}