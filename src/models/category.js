import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    entry_id: String,
    title: String,
    slug: String,
    thumbnail: String,
    description: String
})

export default mongoose.models?.Category || mongoose.model('Category', categorySchema)