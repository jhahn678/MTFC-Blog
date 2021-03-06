import connectMongo from '../../../utils/connectMongo'
import User from '../../../models/user'
import bcrypt from 'bcryptjs'
import { generateAuthToken } from '../../../utils/authToken'
import { setAuthCookie } from '../../../utils/authCookie'

export default async function handler(req, res){
    
    await connectMongo()

    const { method } = req;
    const { email, password } = req.body;

    if(method === 'POST'){
        try{
            const user = await User.findOne({ 'account.email': email.toLowerCase() })
            if(user && await bcrypt.compare(password, user.account.password)){
                const token  = await generateAuthToken(user._id, user.account.displayName, user.account.avatar)
                setAuthCookie(res, token)
                const userDoc = user._doc;
                delete userDoc.account.password;
                return res.status(200).json({
                    message: 'Successfully signed in',
                    user: userDoc
                })
            }
        }catch(err){
            console.log(err)
            res.status(err.status || 400).json({ message: err.message || 'Authentication error'})
        }
    }else{
        res.status(400).json({ message: 'Invalid request method for this endpoint' })
    }
}