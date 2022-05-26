import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'
import AuthError from '../../../../utils/AuthError'
import { verifyAuthToken } from '../../../../utils/authToken'


export default async function handler (req, res){

    await connectMongo()

    const { AUTH_TOKEN: token } = req.cookies;

    if(!token){
        throw new AuthError(400, 'Authentication Invalid')
    }

    const payload = await verifyAuthToken(token)

    const user = await User.findById(payload._id).select('-account.password')

    res.status(200).json(user)
}