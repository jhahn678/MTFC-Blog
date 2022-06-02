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
    preview: String,
    tags: [String],
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

postSchema.pre('find', function(){
    this.populate({ 
        path: 'category',
        select: 'title slug'
    })
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)