import express from 'express';

const PORT = 8000;

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send("test")
})

// Route
app.get('/calculator/:total/:grat', (req, res) => {
      const total = parseFloat(req.params.total);
      const grat = parseFloat(req.params.grat);

      let new_total = total+(total*grat);

      console.log(new_total);
      res.send({new_total})
    });


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
