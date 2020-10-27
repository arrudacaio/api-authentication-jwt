import User from '../models/User';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Responsável por criar as sessões no momento do login
class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        if(!email || !password){
            return res.send("error de login");
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if(!isPasswordCorrect){
            return res.status(401).send("Incorrect Password");
        }

        /**
         * Utiliza um token que voce pode definir e esconder.
         * Podes escolher quando o token expira. 
         */
        return res.json({
            token: jwt.sign({ userId: user._id}, process.env.APP_TOKEN, {
                expiresIn: '7d'
            })
        })



    }

}


//Singleton
export default new SessionController();