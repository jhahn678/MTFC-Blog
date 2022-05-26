import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'
import { verifyAuthToken } from '../../../../utils/authToken'
import AuthError from '../../../../utils/AuthError'

export default async function handler(req, res){

    await connectMongo()

    if(req.method === 'POST'){

        const { id } = req.query;
        const { AUTH_TOKEN: token } = req.cookies;

        if(!token){
            throw new AuthError('Must be authenticated to bookmark post')
        }

        const { _id: userId } = await verifyAuthToken(token)

        let user;
        let message;

        const updated = await User.findOneAndUpdate({
            $and: [{ _id: userId} , { bookmarks: id }]
        }, {
            $pull: { bookmarks: id }
        }, { new: true }).populate('bookmarks').select('bookmarks')

        if(!updated){
            user = await User.findByIdAndUpdate(userId, {
                $push: { bookmarks: id }
            }, { new: true }).populate('bookmarks').select('bookmarks')
            message = 'Post added to bookmarks'
        }else{
            user = updated;
            message = 'Post removed from bookmarks'
        }

        return res.status(200).json({ message, user })

    }
}