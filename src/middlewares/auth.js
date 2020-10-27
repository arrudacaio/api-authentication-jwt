import 'dotenv/config';
import jwt from 'jsonwebtoken';


export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send('Token is not provided!');

    const [, token] = authHeader.split(' ') // Pois temos um bearer token, que vem separado por espaço

    try {
        const payload = jwt.verify(token, process.env.APP_TOKEN);

        req.userId = payload.userId; // Aqui já sabemos quem tá logado

        return next();
    } catch (error) {
        return res.status(401).send('Token invalid');
        
    }

};