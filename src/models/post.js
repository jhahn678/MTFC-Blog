import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    entry_id: String,
    title: String,
    slug: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    thumbnail: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model('Post', postSchema)