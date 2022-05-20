import connectMongo from '../../../utils/connectMongo'
import User from '../../../models/user'

export default async function handler(req, res){

    await connectMongo()

    const users = await User.find()

    res.status(200).json(users)
}