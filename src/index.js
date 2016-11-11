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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
