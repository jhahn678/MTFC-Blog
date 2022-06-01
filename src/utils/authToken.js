import AuthError from './AuthError'
import * as jose from 'jose'

export const generateAuthToken = async (_id, displayName, avatar, expiresIn='30d') => {

    const jwk = await jose.importJWK({ kty: 'oct', k: process.env.JWT_SECRET }, 'HS256')

    const token = await new jose.SignJWT({ _id, displayName, avatar })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(jwk)

    return token;

}

export const verifyAuthToken = async (token) => {

    const jwk = await jose.importJWK({ kty: 'oct', k: process.env.JWT_SECRET }, 'HS256')

    try{
        const { payload } = await jose.jwtVerify(token, jwk)
        return payload;
    }catch(err){
        throw new AuthError(400, 'Invalid token')
    }

}
