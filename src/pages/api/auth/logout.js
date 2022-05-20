import { removeAuthCookie } from '../../../utils/authCookie'

export default async function handler(req, res){
    removeAuthCookie(res)
    res.status(200).json({ message: 'Successfully logged out' })
}