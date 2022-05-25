import { createClient } from "contentful";
import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Category from '../../../models/category'
import Author from '../../../models/author'

export default async function handler(req, res){

    if(req.method === 'POST'){

        await connectMongo()

        const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
        })

        const { sys, fields } = req.body;

        
        if(sys.contentType.sys.id === 'author'){

            if(sys.type === 'DeletedEntry'){
                await Author.findOneAndDelete({ entry_id: sys.id })
                res.status(204).json({ message: 'Author removed'})
            }

            if(sys.type === 'Entry'){
                //Fetch linked asset from cms
                const asset = await client.getAsset(fields.avatar['en-US'].sys.id)
                const avatar = `https:${asset.fields.file.url}`;
                const author = await Author.findOneAndUpdate({ entry_id: sys.id}, {
                    $set: {
                        entry_id: sys.id,
                        displayName: fields.displayName['en-us'],
                        slug: fields.slug['en-us'],
                        bio: fields.bio['en-us'],
                        avatar: avatar,
                        location: fields.location['en-US'],
                    }
                }, { upsert: true })
                res.status(200).json({ message: 'Author upserted'})
            }

        }


        if(sys.contentType.sys.id === 'post'){
            
            if(sys.type === 'DeletedEntry'){
                await Post.findOneAndDelete({ entry_id: sys.id })
                res.status(204).json({ message: 'Post removed'})
            }

            if(sys.type === 'Entry'){
                //Query category for _id
                const category = await Category.findOne({ entry_id: fields.category['en-us'].sys.id })
                //Fetch linked asset from cms
                const asset = await client.getAsset(fields.thumbnail['en-US'].sys.id)
                const thumbnail = `https:${asset.fields.file.url}`;
                const post = await Post.findOneAndUpdate({ entry_id: sys.id}, {
                    $set: {
                        entry_id: sys.id,
                        title: fields.title['en-US'],
                        slug: fields.slug['en-US'],
                        category: category._id,
                        thumbnail: thumbnail,
                        preview: fields.preview['en-US']
                    }
                }, { upsert: true })
                res.status(200).json({ message: 'Post upserted' })
            }

        }
        
        
        if(sys.contentType.sys.id === 'category'){

            if(sys.type === 'DeletedEntry'){
                await Category.findOneAndDelete({ entry_id: sys.id })
                res.status(204).json({ message: 'Category removed'})
            }

            if(sys.type === 'Entry'){
                //Fetch linked asset from cms
                const asset = await client.getAsset(fields.thumbnail['en-US'].sys.id)
                const thumbnail = `https:${asset.fields.file.url}`;
                const category = await Category.findOneAndUpdate({ entry_id: sys.id}, {
                    $set: {
                        title: fields.title['en-US'],
                        slug: fields.slug['en-US'],
                        thumbnail: thumbnail,
                        description: fields.description['en-US']
                    }
                }, { upsert: true })
                res.status(200).json({ message: 'Category upserted '})
            }

        }
    }
}