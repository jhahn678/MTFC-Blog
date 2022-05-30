import connectMongo from '../../../utils/connectMongo'
import { verifyAuthToken } from '../../../utils/authToken'
import AuthError from '../../../utils/AuthError'
import Post from '../../../models/post'
import User from '../../../models/user'
import Comment from '../../../models/comment'
import { createReplyNotification } from '../../../utils/createNotification'

export default async function handler(req, res){

    await connectMongo()

    const { id } = req.query;

    const { AUTH_TOKEN: token } = req.cookies;

    const payload = await verifyAuthToken(token)

    //Getting a comment by ID
    if(req.method === 'GET'){
        
        const comment = await Comment.findById(id).populate('replies')

        return res.status(200).json(comment)

    }

    //Adding a reply to a specific comment
    if(req.method === 'POST'){

        if(!token){
            throw new AuthError('Must be authenticated to post comments')
        }

        const { postId, body, mention } = req.body;

        const newCommentObject = new Comment({
            user: {
                _id: payload._id,
                displayName: payload.displayName,
                avatar: payload.avatar
            },
            post: postId,
            parentComment: id,
            mention: mention ? mention : null,
            body: body
        })

        const newComment = await newCommentObject.save()

        const user = await User.findByIdAndUpdate(payload._id, {
            $push: { comments: newComment._id }
        }, { new: true }).select('-account.password')

        const comment = await Comment.findByIdAndUpdate(id, {
            $push: { replies: newComment._id }
        }, { new: true }).populate('replies').select('replies')

        res.status(201).json({ user, comment, message: 'Reply sent' })

        const post = await Post.findByIdAndUpdate(postId, {
            $inc: { commentCount: 1 } 
        })

        if(payload._id !== comment.user._id.toString()){
            await User.findByIdAndUpdate(comment.user._id, {
                $push: { 
                    notifications: createReplyNotification(newComment._id, post._id, comment.user.displayName)
                }
            })
        }

        return;

    }

    else if(req.method === 'DELETE'){

        if(!token){
            throw new AuthError('Must be authenticated to post comments')
        }

        //Deleting a comment
        const { id } = req.query;
        const { postId } = req.body;

        const user = await User.findByIdAndUpdate(payload._id, {
            $pull: { comments: id }
        }, { new: true}).select('-account.password')

        const comment = await Comment.findById(id)

        if(comment.parentComment){
            await Comment.findByIdAndUpdate(comment.parentComment, {
                $pull: { replies: id }
            })
        }
        
        if(comment.replies.length > 0){
            
            await Comment.findByIdAndUpdate(id, {
                $set: { body: null, 'user._id': null, 'user.displayName': null, 'user.avatar': null }
            })

            await Post.findByIdAndUpdate(postId, {
                $inc: { commentCount: -1 }
            })
        }

        if(comment.replies.length === 0){
            
            await Comment.findByIdAndDelete(id)

            await Post.findByIdAndUpdate(postId, {
                $pull: { comments : id },
                $inc: { commentCount: -1 }
            })
        }

        return res.status(200).json({ message: 'Comment deleted', user })
    }

}
