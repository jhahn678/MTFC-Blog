import { google } from 'googleapis'
import User from '../../../models/user'
import { generateAuthToken } from '../../../utils/authToken'
import { setAuthCookie } from '../../../utils/authCookie'

export default async function handler(req, res){

    if(req.method === 'POST'){
        const { token } = req.body

        const client = new google.auth.OAuth2(
            process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT, 
            process.env.GOOGLE_OAUTH_SECRET
        )

        client.setCredentials({ access_token: token })

        google.options({ auth: client })

        const people = google.people('v1')

        try{
            const { data } = await people.people.get({
                resourceName: 'people/me',
                personFields: 'emailAddresses,photos,names',
            })

            const googleId = data.emailAddresses[0].metadata.source.id
            const user = await User.findOne({ 'account.googleId': googleId }).select('-account.password')

            if(user){
                const token = await generateAuthToken(user._id, user.account.displayName, user.account.avatar)
                setAuthCookie(res, token)
                return res.status(200).json({
                    message: 'Successfully signed in with Google',
                    user: user
                })
            }else{
                const userObject = new User({
                    account: {
                        displayName: data.names[0].displayName,
                        email: data.emailAddresses[0].value,
                        avatar: data.photos[0].url,
                        googleId: data.emailAddresses[0].metadata.source.id
                    }
                })
                const user = await userObject.save()
                const token = await generateAuthToken(user._id, user.account.displayName, user.account.avatar)
                setAuthCookie(res, token)
                return res.status(200).json({
                    message: 'Successfully signed in with Google',
                    user: user
                })
            }

        }catch(err){
            res.status(err.status || 400).json({ message: err.message || 'Authentication error'})
        }

    }else{
        res.status(400).json({ message: 'Invalid request method'})
    }
}
