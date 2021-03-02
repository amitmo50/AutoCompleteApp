const coutries = require('./countries');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api/coutries', (req, res) => {
    const word = req.query.word;
    const filter = coutries.filter(state => {
        return state.name.toLowerCase().includes(word.toLowerCase());
      });
    res.json(filter);
});


app.listen(PORT, () => {
    console.log('Server Running on http://localhost:4000');
})