import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch'

        const REG_EXP = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|vkontakte|www.vk|twitter|github|xn--80adtgbbrh1bc.xn--p1ai|medium.com)[^\/]*\/)?([@]?[a-zA-Z0-9]*[._]?[a-zA-Z0-9]*)', 'i');
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.json({
        hello: 'JS World',
    });
});

app.get('/lesson2/2A', (req, res) => {
    const a = req.query.a ? parseInt(req.query.a) : 0;
    const b = req.query.b ? parseInt(req.query.b) : 0;
    const sum = a + b;
    res.send(sum.toString());
});

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

app.get('/lesson2/2B', (req, res) => {
    const reg = new RegExp('[A-zА-яЁё]');
    let result = "Invalid fullname";
    const fullname = req.query.fullname.trim();
    if (fullname && !/[0-9]/.test(fullname) && !/_/.test(fullname) && !/\//.test(fullname)) {
        const names = fullname.split(/\s+/);
        const length = names.length;
        let lastName;
        let firstName;
        let middleName;
        switch (length) {
            case 1:
                result = names[0].capitalizeFirstLetter();
                break;
            case 2:
                lastName = names[1].capitalizeFirstLetter();
                firstName = names[0].capitalizeFirstLetter();
                result = lastName + " " + getFirstChar(firstName) + ".";
                break;
            case 3:
                lastName = names[2].capitalizeFirstLetter();
                firstName = names[0].capitalizeFirstLetter();
                middleName = names[1].capitalizeFirstLetter();
                result = lastName + " " + getFirstChar(firstName) + ". " + getFirstChar(middleName) + ".";
        }
    }
    res.send(result);
});

function getFirstChar(str) {
    return str.charAt(0);
}

app.get('/lesson2/2C', (req, res) => {
    const username = getUserNameByUrl(req.query.username);
    res.send(username);
});

function getUserNameByUrl(url) {
    const username = url.match(REG_EXP)[5];
    return username.charAt(0) === '@' ? username : '@' + username;
}

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
        .then(async (res) => {
            pc = await res.json();
        })
        .catch(err => {
            console.log('Чтото пошло не так:', err);
        });

const url = require("url");

app.get(/\/lessons3\/3C\//, (req, res) => {
    const pathname = req.url;
    const arr = processingPathname(pathname);
    const obj = typeof (pc);
    if (arr.length === 0 || arr.length === 1) {
        if (arr.length === 0) {
            res.status(200);
            res.json(pc);
        } else {
            if (arr[0] === 'volumes') {
                let hdd = pc.hdd;
                let result = {};
                hdd.forEach((item, i, hdd) => {
                    if (result[item.volume] === undefined) {
                        result[item.volume] = item.size;
                        hdd = hdd.slice(1, i);
                    } else {
                        result[item.volume] += item.size;
                        hdd = hdd.slice(1, i);
                    }
                });
                for (let key in result) {
                    result[key] = result[key] + 'B';
                }
                res.status(200);
                res.json(result);
            } else {
                if (pc[arr[0]] === undefined) {
                    res.status(404);
                    res.send('Not Found');
                } else {
                    res.status(200);
                    res.json(pc[arr[0]]);
                }
            }
        }
    } else {
        let obj1 = pc[arr[0]];
        let arr1 = arr.slice(1);
        if (Array.isArray(obj1) && (arr1.length > 0 && isNaN(+arr1[0]))) {
            res.status(404);
            res.send('Not Found');
        } else {
            if (obj1 !== undefined) {
                for (let i in arr1) {
                    if (obj1[arr1[i]] === undefined || arr1[i] === 'length') {
                        obj1 = undefined;
                        break;
                    }
                    obj1 = obj1[arr1[i]];
                }
            }
            if (obj1 === undefined) {
                res.status(404);
                res.send('Not Found');
            } else {
                res.status(200);
                res.json(obj1);
            }
        }
    }
});

function processingPathname(pathname) {
    let arr = pathname.split('\/');
    let result = [];
    arr = arr.slice(3);
    arr.forEach((item, i, arr) => {
        if (item.length !== 0) {
            result.push(item);
        }
    });
    return result;
}

app.get('/lesson2/2D', (req, res) => {
    
});

app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
