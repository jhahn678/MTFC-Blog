import connectMongo from '../../../utils/connectMongo'
import User from '../../../models/user'

export default async function handler(req, res){

    const { id } = req.query;

    await connectMongo()

    const user = await User.findById(id)

    let displayName = user.account.displayName

    res.status(200).json({ displayName })
}