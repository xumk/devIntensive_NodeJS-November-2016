import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/lesson2/2A', (req, res) =>{
  const a = req.query.a? parseInt(req.query.a) : 0;
  const b = req.query.b? parseInt(req.query.b) : 0;
  const sum = a + b;
  res.send(sum.toString());
});

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

app.get('/lesson2/2B', (req, res) =>{
  const reg = new RegExp('[A-zА-яЁё]');
  let result = "Invalid fullname";
  const fullname = req.query.fullname.trim();
  if (fullname && !/[0-9]/.test(fullname) && !/_/.test(fullname) && !/\//.test(fullname)) {
      const names = fullname.split(/\s+/);
      const length = names.length;
      switch(length) {
          case 1:
              result = names[0].capitalizeFirstLetter();
              break;
          case 2:
              result = names[1].capitalizeFirstLetter() + " " + names[0].capitalizeFirstLetter().charAt(0) + ".";
              break;
          case 3:
              result = names[2].capitalizeFirstLetter() + " " + names[0].capitalizeFirstLetter().charAt(0) + ". " + names[1].capitalizeFirstLetter().charAt(0) + ".";
      }
  }
  res.send(result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
