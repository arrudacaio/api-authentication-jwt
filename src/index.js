import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routes';
const app = express();

app.use(express.json());
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h6cgx.mongodb.net<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(routes);

app.listen(3333);
console.log('Server is running at http://localhost:3333');