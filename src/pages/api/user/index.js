import connectMongo from '../../../utils/connectMongo'
import User from '../../../models/user'

export default async function handler(req, res){

    await connectMongo()

    const allUsers = await User.find()

    const users = allUsers.map(u => ({ displayName: u.account.displayName}))

    res.status(200).json(users)
}