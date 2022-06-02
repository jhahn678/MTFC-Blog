import { createClient } from "contentful";
import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Category from '../../../models/category'
import Author from '../../../models/author'
import { createPostNotification } from '../../../utils/createNotification'

export default async function handler(req, res){

    if(req.method === 'POST'){

        await connectMongo()

        const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
        })

        const { sys, fields } = JSON.parse(req.body);

        
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
                        displayName: fields.displayName['en-US'],
                        slug: fields.slug['en-US'],
                        bio: fields.bio['en-US'],
                        avatar: avatar,
                        location: fields.location['en-US'],
                        socials: {
                            facebook: fields.facebook?.['en-US'] || null,
                            instagram: fields.instagram?.['en-US'] || null,
                            twitter: fields.twitter?.['en-US'] || null,
                            website: fields.website?.['en-US'] || null,
                        }
                    }
                }, { upsert: true })
                res.status(200).json({ message: 'Author upserted'})
            }

        }


        if(sys.contentType.sys.id === 'post'){
            
            if(sys.type === 'DeletedEntry'){
                const post = await Post.findOneAndDelete({ entry_id: sys.id })
                await Author.findByIdAndUpdate(post.author, {
                    $pull: { posts: post._id },
                    $inc: { totalPosts: -1 }
                })
                
                res.status(204).json({ message: 'Post removed'})
            }

            if(sys.type === 'Entry'){
                //Query category for _id
                const category = await Category.findOne({ entry_id: fields.category['en-US'].sys.id })
                //Query for author
                const author = await Author.findOne({ entry_id: fields.author['en-US'].sys.id })
                //Fetch linked asset from cms
                const asset = await client.getAsset(fields.thumbnail['en-US'].sys.id)
                const thumbnail = `https:${asset.fields.file.url}`;
                const post = await Post.findOneAndUpdate({ entry_id: sys.id}, {
                    $set: {
                        entry_id: sys.id,
                        title: fields.title['en-US'],
                        slug: fields.slug['en-US'],
                        author: author._id,
                        category: category._id,
                        thumbnail: thumbnail,
                        preview: fields.preview['en-US'],
                        tags: []
                    }
                }, { upsert: true })
                
                res.status(200).json({ message: 'Post upserted' })

                //If this is a new post, add to authors posts and push notification
                //to users that follow that author
                if(!author.posts.includes(post._id)){
                      
                    await Author.findByIdAndUpdate(author._id, {
                        $push: { posts: post._id },
                        $inc: { totalPosts: 1 }
                    })

                    const notification = createPostNotification(post._id, author.displayName)

                    await User.updateMany({ 'following.author': author._id }, {
                        $push: { notifications: notification }
                    })

                }

                return;
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
                        entry_id: sys.id,
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