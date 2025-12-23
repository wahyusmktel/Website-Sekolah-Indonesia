import express from 'express';
const app = express();
app.use(express.json());
app.post('/api/auth/login', (req, res) => {
    res.send('TEST SUCCESS');
});
app.listen(5001, () => {
    console.log('Test server running on 5001');
});
