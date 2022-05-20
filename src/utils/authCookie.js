import { serialize } from 'cookie'

export const setAuthCookie = (res, value, opts={}) => {

    if(!opts.maxAge){
        opts.maxAge = 60 * 60 * 24 * 30
    }

    if(!opts.httpOnly){
        opts.httpOnly = true;
    }

    if(!opts.path){
        opts.path = '/'
    }

    if(process.env.NODE_ENV !== 'DEVELOPMENT'){
        opts.secure = true
    }

    res.setHeader('Set-Cookie', serialize('AUTH_TOKEN', value, opts))

}

export const removeAuthCookie = (res) => {
    res.setHeader('Set-Cookie', serialize('AUTH_TOKEN', 'expired', {
        maxAge: 0,
        path: '/',
        httpOnly: true
    }))
}

