import mongoose from 'mongoose'
const { OAuth2Client } = require('google-auth-library');

export default async function handler(req, res){

    if(req.method === 'POST'){
        const { token } = req.body

        const client = new OAuth2Client({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET
        })

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT
        })
        if(!ticket) res.status(400).json({ message: 'Error authenticating with google'})
        const payload = ticket.getPayload()

        const { sub, name, email, picture } = payload;
        res.json({ payload }).status(200)
    }else{
        res.status(400).json({ message: 'Invalid request method'})
    }
}
