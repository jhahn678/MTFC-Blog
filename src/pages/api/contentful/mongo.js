import { createClient } from "contentful";
import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Category from '../../../models/category'
import Author from '../../../models/author'

export default async function handler(req, res){
    
    // await connectMongo()
    
    // const client = createClient({
    //     space: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    // })

    // const items = await client.getAsset('55CDSo8R6GwoSaVDSNJOgv')
    // const { items } = await client.getEntries({
    //     content_type: 'category',
    //     include: 10
    // })
    if(req.method === 'POST'){
        console.log(req.body.fields.thumbnail['en-US'].sys.id )
        res.status(200).json({ thumbnail: req.body.fields.thumbnail['en-US'].sys.id })
    }
    
}