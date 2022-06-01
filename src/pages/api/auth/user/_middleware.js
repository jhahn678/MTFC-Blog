import { NextResponse } from 'next/server'
import { verifyAuthToken, generateAuthToken } from '../../../../utils/authToken'
import AuthError from '../../../../utils/AuthError';

export async function middleware(req){

    const { AUTH_TOKEN: token } = req.cookies;

    let res = NextResponse.next();

    if(token){
        const payload = await verifyAuthToken(token)
        const { exp, _id, displayName, avatar } = payload;

        if((exp - Date.now()) < (40 * 60 * 24 * 30)){
            const newToken = await generateAuthToken(_id, displayName, avatar)
            res.cookie('AUTH_TOKEN', newToken, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'DEVELOPMENT' ? true : false
            })
        }

    }else{
        throw new AuthError(400, 'Authentication Invalid')
    }

    return res;

}