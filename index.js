const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const Nightmare = require('nightmare');
const vo = require('vo');
const state = 'TX'; // Add the state of your choice here in the same 2 letter uppercase format
const city = 'Houston'; // Add the city of your choice here
const url = `https://www.indeed.com/jobs?q=web+developer&l=${city}%2C+${state}`; // The query value can be changed to the keyword of your choice by changing 'web+developer' to 'your+query+string'
let countArray = [[0, 'javascript'], [0, 'node'], [0, 'php'], [0, 'html'], [0, 'react'], [0, 'vue'], [0, 'css'], [0, 'boostrap'], [0, 'mongo'], [0, 'sql'], [0, 'angular'], [0, 'c#'], [0, '.net'], [0, 'python'], [0, ' java '], [0, 'shell'], [0, 'c\\+\\+'], [0, ' c '], [0, 'typescript'], [0, 'ruby'], [0, 'swift'], [0, 'wordpress'], [0, ' go '], [0, 'assembly'], [0, 'matlab'], [0, ' r '], [0, 'kotlin'], [0, 'scala'], [0, 'groovy'], [0, 'perl'], [0, 'django'], [0, 'magento'], [0, 'laravel'], [0, 'redux'], [0, 'graphql']]; // Keywords can be added or deleted to suit preferences
let results;
vo(run)(function (err, result) {
    if (err) throw err;
});

function* run() {
    let nightmare = Nightmare({
        waitTimeout: 45000
    }),
        MAX_PAGE = 100,
        currentPage = 0,
        nextExists = true,
        data = [];

    yield nightmare
        .goto(url)
        .wait('#resultsCol')

    nextExists = yield nightmare.visible('.pagination a:last-child');
    while (nextExists && currentPage < MAX_PAGE) {
        data.push(yield nightmare.evaluate(function () {
            let data = document.querySelector('#resultsCol').innerText;
            return data;
        }));

        yield nightmare
            .click('.pagination a:last-child')
            .wait('#resultsCol')

        currentPage++;
        nextExists = yield nightmare.visible('.pagination a:last-child');
    }
    
    keywordCount(data);
    yield nightmare.end();
}

function keywordCount(text) {
    text = text.toString();
    
    for (let i = 0; i < countArray.length; i++) {
        let tech = countArray[i][1];
        let regex = new RegExp(tech, 'gi');
        let currentCount;
        if (text.match(regex)) {
            currentCount = text.match(regex).length;
        } else {
            currentCount = 0;
        }
        countArray[i][0] = currentCount;
    }
    results = countArray;
    console.log(results);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data', (req, res) => {
    res.json(results);
});

app.listen(3000);