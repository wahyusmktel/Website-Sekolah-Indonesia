const express = require('express');
const app = express();
app.get('/vanilla-ping', (req, res) => {
    res.send('VANILLA PONG');
});
app.listen(5002, () => {
    console.log('Vanilla server running on 5002');
});
