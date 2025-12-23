import express from 'express';
const app = express();
app.get('/test-ping', (req, res) => {
    res.send('PONG');
});
app.listen(5000, () => {
    console.log('Isolated server running on 5000');
});
