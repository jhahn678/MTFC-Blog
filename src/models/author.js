import mongoose from 'mongoose'
import commentSchema from './comment'

const authorSchema = new mongoose.Schema({
    entry_id: String,
    displayName: String,
    slug: String,
    bio: String,
    avatar: String,
    location: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true })

export default mongoose.models.Author || mongoose.model('Author', authorSchema)