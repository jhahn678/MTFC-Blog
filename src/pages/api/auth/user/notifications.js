import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'
import Post from '../../../../models/post'
import Comment from '../../../../models/comment'
import AuthError from '../../../../utils/AuthError'
import { verifyAuthToken } from '../../../../utils/authToken'
import { createTestNotification } from '../../../../utils/createNotification'

export default async function handler (req, res){

    await connectMongo()

    const { AUTH_TOKEN: token } = req.cookies;

    if(!token){
        throw new AuthError(400, 'Authentication Invalid')
    }

    const payload = await verifyAuthToken(token)

    if(req.method === 'GET'){

        const user = await User.findById(payload._id)
        .populate({
            path: 'notifications',
            populate: {
                path: 'post comment'
            }
        })
        .select('notifications')

        return res.status(200).json(user)

    }
    
    if(req.method === 'POST'){

        const user = await User.findByIdAndUpdate(payload._id, {
            $push: { 
                notifications: createTestNotification() 
            }
        }, { new: true }).select('-account.password')

        return res.status(200).json(user)

    }

    if(req.method === 'PATCH'){

        const user = await User.findByIdAndUpdate(payload._id, {
            $set: { 'notifications.$[].status': 'Read' }
        }, { new: true }).select('-account.password')

        return res.status(200).json(user)

    }

    if(req.method === 'DELETE'){

        const { notifications } = req.body;

        const user = await User.findByIdAndUpdate(payload._id, {
            $pull: { notifications: { _id: { $in: notifications } } }
        }, { new: true }).select('-account.password')

        return res.status(200).json(user)

    }
}