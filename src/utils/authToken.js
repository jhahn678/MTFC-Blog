import jwt from 'jsonwebtoken'
import User from '../models/user'
import AuthError from './AuthError'

export const generateAuthToken = (id, displayName, expiresIn='30d') => {
    return jwt.sign({ _id: id, displayName: displayName, issuedAt: Date.now()}, process.env.JWT_SECRET, { expiresIn: expiresIn })
}

export const verifyAuthToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded) throw new AuthError(400, 'Invalid token')
    return decoded;
}