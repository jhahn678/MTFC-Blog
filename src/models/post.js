import mongoose from 'mongoose'
import commentSchema from './comment'

const postSchema = new mongoose.Schema({
    entry_id: String,
    title: String,
    slug: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    thumbnail: String,
    preview: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    commentCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model('Post', postSchema)