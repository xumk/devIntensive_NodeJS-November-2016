import express from 'express';
import cors from 'cors';

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

app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
