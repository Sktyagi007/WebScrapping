const request = require("request");
const fs = require("fs");
// const xlsx = request("json-as-xlsx");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let leaderBoard = [];
let counter = 0;
const link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

request(link,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allScorecardTags = document.querySelectorAll("a[data-hover='Scorecard']");
        for(let i = 0; i<allScorecardTags.length; i++){
            let Link = allScorecardTags[i].href;
            let completeLink = "https://www.espncricinfo.com"+Link; 
            // console.log(completeLink);
            request(completeLink,cb2);
            // 60 requests will come
            counter++;
        }
    }
}

function cb2(error,response,html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let batsmenRow = document.querySelectorAll(".table.batsman tbody tr");
        for(let i=0 ; i<batsmenRow.length; i++){
            let cells = batsmenRow[i].querySelectorAll("td");
            if(cells.length == 8){
                let name = cells[0].textContent;
                let runs = cells[2].textContent;
                let balls = cells[3].textContent;
                let fours = cells[5].textContent;
                let sixes = cells[6].textContent;
                // console.log(name,runs,balls,fours,sixes);
                processPlayer(name,runs,balls,fours,sixes);
            }
        } 
        // 60 requests that comes will go now
        counter --;
        if(counter == 0){
            console.log(leaderBoard);
            // creating Json file
            let data = JSON.stringify(leaderBoard);
            fs.writeFileSync("Batsmen.json",data);
        }

    }
}
// processPlayer('Rohit','15','4','2','4');
// processPlayer('Virat','50','20','4','3')
// processPlayer('Rohit','40','20','1','2');
// console.log(leaderBoard);
function processPlayer(name,runs,balls,fours,sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    // if we find player in leaderboard array
    for(let i=0 ; i<leaderBoard.length; i++){
        let playerObj = leaderBoard[i];
        if(playerObj.Name == name){
            playerObj.Runs+=runs;
            playerObj.Innings+=1;
            playerObj.Balls+=balls;
            playerObj.Fours+=fours;
            playerObj.Sixes+=sixes;
            return;
        }

    }
    // if we do not find player in leaderboard array
    let Obj = {
        Name:name,
        Innings:1,
        Runs:runs,
        Balls:balls,
        Fours:fours,
        Sixes:sixes
    }
    leaderBoard.push(Obj);
}