var http = require('http');
var CSV = require('csv-string');

let rawBudgetData = undefined;
let rawCityData = undefined;

let budgetDataByYearAndCity = {};
let sumOfYearlyCityBudgetByYear = {};
let summedBudgetByYear = {};

var csvHeaders = {
    "שנה": 0,
    "סעיף תקציבי": 1,
    "כותרת סעיף": 2,
    "גוף נתמך": 3,
    "מספר גוף": 4,
    "סוג גוף": 5,
    "סכום שאושר": 6,
    "סכום שהועבר": 7,
    "כתובת": 8,
    "עיר": 9,
    "מיקוד": 10
}

function getRawBudgetData() {
    http.get({
        path: '/data/budget_data_2017.csv',
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
           rawBudgetData = CSV.parse(body);
           console.log("raw-budget-data loaded");
        });
    });
}

function getRawCityData() {
    http.get({
        path: '/data/city_coordinates.json',
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.setEncoding('utf8');
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
           rawCityData = JSON.parse(body);
           console.log("raw-city-data loaded");
        });
    });
}

function produceFinalResult() {
    getRawBudgetData();
    getRawCityData();

    processCityAndBudgetData();
}

function processCityAndBudgetData() {
    if(rawCityData == null || rawBudgetData == null) {
        console.log("Waiting for budget and/or city data to be fetched");
        setTimeout(() => {
            processCityAndBudgetData();
        }, 1000);
    } else {
        _produceFinalResults();
    }
}

function _produceFinalResults() {
    rawBudgetData.forEach((budgetElement) => {
        try{
            // Don't process header row
            let yearInBudgetElement = budgetElement[csvHeaders['שנה']];
            if(yearInBudgetElement != "שנה") {
                // Check if year key exists
                if(!(yearInBudgetElement in budgetDataByYearAndCity)) {
                    budgetDataByYearAndCity[yearInBudgetElement] = {} ;
                    sumOfYearlyCityBudgetByYear[yearInBudgetElement] = {};
                    summedBudgetByYear[yearInBudgetElement] = {'approved': 0, 'allocated': 0};
                }

                let elementSumApproved = parseInt(budgetElement[csvHeaders["סכום שאושר"]].replace('₪','',).replace(',',''));
                let elementSumAllocated = parseInt(budgetElement[csvHeaders["סכום שהועבר"]].replace('₪','',).replace(',',''));
                let elementCity = budgetElement[csvHeaders["עיר"]];

                if(isNaN(parseInt(budgetElement[csvHeaders["סכום שאושר"]].replace('₪','',).replace(',',''))) || isNaN(parseInt(budgetElement[csvHeaders["סכום שהועבר"]].replace('₪','',).replace(',','')))) {
                    console.log("whoops...")
                    console.log(budgetElement);
                }

                // Initialize city key, if needed
                if(!(elementCity in budgetDataByYearAndCity[yearInBudgetElement])) {
                    budgetDataByYearAndCity[yearInBudgetElement][elementCity] = [];
                    sumOfYearlyCityBudgetByYear[yearInBudgetElement][elementCity] = {
                                                                                        'lat': elementCity == 'לא ידוע' ? '0' : rawCityData[elementCity].latitude,
                                                                                        'lng': elementCity == 'לא ידוע' ? '0' : rawCityData[elementCity].longitude,
                                                                                        'approved': 0,
                                                                                        'allocated': 0
                                                                                    };
                }

                // TODO: INCORPORATE CITY COORDIANTES, CONSIDER "UNKWOWN" CITY VALUE
                let elementForApprovedBudgetForYearAndCity = {
                    "סעיף תקציבי": budgetElement[csvHeaders["סעיף תקציבי"]],
                    "כותרת סעיף": budgetElement[csvHeaders["כותרת סעיף"]],
                    "גוף נתמך": budgetElement[csvHeaders["גוף נתמך"]],
                    "מספר גוף": budgetElement[csvHeaders["מספר גוף"]],
                    "סוג גוף": budgetElement[csvHeaders["סוג גוף"]],
                    "סכום שאושר": elementSumApproved,
                    "סכום שהועבר": elementSumAllocated,
                    "כתובת": budgetElement[csvHeaders["כתובת"]]
                }

                budgetDataByYearAndCity[yearInBudgetElement][elementCity].push(elementForApprovedBudgetForYearAndCity);
                sumOfYearlyCityBudgetByYear[yearInBudgetElement][elementCity]['approved'] += elementSumApproved;
                sumOfYearlyCityBudgetByYear[yearInBudgetElement][elementCity]['allocated'] += elementSumAllocated;
                summedBudgetByYear[yearInBudgetElement]['approved'] += elementSumApproved;
                summedBudgetByYear[yearInBudgetElement]['allocated'] += elementSumAllocated;
            }
        } catch(e) {
            console.log(e);
            console.log("Error while reading budget data");
        }
    });

    // TODO: DELETE THIS
    console.log("Done Processing Data");
    console.log('budgetDataByYearAndCity:');
    console.log(budgetDataByYearAndCity);
    console.log('sumOfYearlyCityBudgetByYear:');
    console.log(sumOfYearlyCityBudgetByYear);
    console.log('summedBudgetByYear:');
    console.log(summedBudgetByYear);

}

// Activate script
produceFinalResult();

module.exports =  {
    budgetDataByYearAndCity, sumOfYearlyCityBudgetByYear, summedBudgetByYear
}