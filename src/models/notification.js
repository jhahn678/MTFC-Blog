import mongoose from 'mongoose'
import Post from '../models/post'
import Comment from '../models/comment'

const notificationSchema = new mongoose.Schema({
    notification_type: {
        type: String,
        enum: ['Post', 'Reply']
    },
    status: {
        type: String,
        enum: ['Read', 'Unread']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    avatar: String,
    title: String
}, { timestamps: true })



export default notificationSchema;