import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();


app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from http-backend!');
});

app.listen(3001, () => {
    console.log('http-backend listening on port 3001');
});