import { hash as bcryptHash } from 'bcryptjs'
import User from '../../../models/user'
import connectMongo from '../../../utils/connectMongo'
import AuthError from '../../../utils/AuthError'
import { generateAuthToken } from '../../../utils/authToken'
import { setAuthCookie } from '../../../utils/authCookie'

export default async function handler(req, res){
    
    await connectMongo()
    
    const { name, email, password } = req.body;

    if(req.method === 'POST'){
        try{
            const alreadyRegistered = await User.findOne({ 'account.email': email })
            if(alreadyRegistered){
                throw new AuthError(409)
            }
            const hash = await bcryptHash(password, 12)
            const newUser = new User({
                account: {
                    displayName: name,
                    email: email.toLowerCase(),
                    password: hash
                }
            })
            const user = await newUser.save()
            const token = await generateAuthToken(user._id, name, user.account.avatar)
            setAuthCookie(res, token)
            res.status(201).json({
                message: 'Successfully created user',
                user: user
            })
        }catch(err){
            res.status(err.status || 400).json({ message: err.message || 'Authentication error'})
        }
    }else{
        res.status(400).json({ message: 'Invalid request method' })
    }
}