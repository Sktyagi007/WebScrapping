const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const listedCompanies = [];
let counter = 0;
const link = "https://www.moneycontrol.com/stocks/marketinfo/marketcap/bse/index.html";
request(link,cb);
counter++;
function cb(error, response, html){
    if (error){
        console.log("error",error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let companyRows = document.querySelectorAll(".tbldata14.bdrtpg tr");
        // console.log(companyRows.length);
        for(let i = 1; i<companyRows.length; i++){
            let tds = companyRows[i].querySelectorAll("tr .brdrgtgry");
            let tds1 = companyRows[i].querySelectorAll("td b");
                let companyName = tds1[0].textContent;
                let fiftyTwoWeekHigh =tds[3].textContent;
                let fiftyTwoWeeklow =tds[4].textContent;
                let marketCapInCr =tds[5].textContent;
                // console.log(companyName,fiftyTwoWeekHigh,fiftyTwoWeeklow,marketCapInCr);
                // console.log(marketCapInCr);
                process(companyName,fiftyTwoWeekHigh,fiftyTwoWeeklow,marketCapInCr);
                    
        }
        counter--;
        if(counter == 0){
            // console.log(listedCompanies);
            let data  =  JSON.stringify(listedCompanies);
            fs.writeFileSync("Stocks.json",data);
        }   
    }
    
    
       
}
function process(companyName,fiftyTwoWeekHigh,fiftyTwoWeeklow,marketCapInCr){
    fiftyTwoWeekHigh = Number(fiftyTwoWeekHigh);
    fiftyTwoWeeklow = Number(fiftyTwoWeeklow);
    // marketCapInCr = Number(marketCapInCr);

    let Obj = {
        Name:companyName,
        fiftyTwoWeekHigh:fiftyTwoWeekHigh,
        fiftyTwoWeeklow:fiftyTwoWeeklow,
        // marketCapInCr:marketCapInCr
    }
    
    listedCompanies.push(Obj);
}
