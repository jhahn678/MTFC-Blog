import connectMongo from '../../../utils/connectMongo'
import { verifyAuthToken } from '../../../utils/authToken'
import AuthError from '../../../utils/AuthError'
import Post from '../../../models/post'
import User from '../../../models/user'
import Comment from '../../../models/comment'

export default async function handler(req, res){

    await connectMongo()

    const { id } = req.query;

    //Getting a comment by ID
    if(req.method === 'GET'){
        
        const comment = await Comment.findById(id).populate('replies')

        res.status(200).json(comment)

    }

    //Adding a reply to a specific comment
    if(req.method === 'POST'){

        const { postId, body, mention } = req.body;

        const { AUTH_TOKEN: token } = req.cookies;

        if(!token){
            throw new AuthError('Must be authenticated to post comments')
        }
    
        const payload = await verifyAuthToken(token)

        const newComment = new Comment({
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

        const comment = await newComment.save()

        const updatedComment = await Comment.findByIdAndUpdate(id, {
            $push: { replies: comment._id }
        }, { new: true })

        const updatedPost = await Post.findByIdAndUpdate(postId, {
            $inc: { commentCount: 1 } 
        }, { new: true })

        const updatedUser = await User.findByIdAndUpdate(payload._id, {
            $push: { comments: comment._id }
        }, { new: true })

        return res.status(201).json({
            message: 'Reply sent', 
            comment: updatedComment, 
            post: updatedPost, 
            user: updatedUser 
        })

    }

    else if(req.method === 'DELETE'){
        //Deleting a comment
        const { id } = req.query;
        const { postId } = req.body;

        await User.findByIdAndUpdate(payload._id, {
            $pull: { comments: id }
        }, { new: true })

        const comment = await Comment.findById(id)

        if(comment.parentComment){
            await Comment.findByIdAndUpdate(comment.parentComment, {
                $pull: { replies: id }
            })
        }
        
        if(comment.replies.length > 0){
            
            await Comment.findByIdAndUpdate(id, {
                $set: { body: null, 'user._id': null, 'user.displayName': null, 'user.avatar': null }
            }, { new: true })

            await Post.findByIdAndUpdate(postId, {
                $inc: { commentCount: -1 }
            }, { new: true })
        }

        if(comment.replies.length === 0){
            
            await Comment.findByIdAndDelete(id)

            await Post.findByIdAndUpdate(postId, {
                $pull: { comments : id },
                $inc: { commentCount: -1 }
            })
        }
        

        res.status(200).json({ message: 'Comment deleted' })
    }

}
