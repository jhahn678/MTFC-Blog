import { NextResponse } from "next/server";

export async function middleware(req){

    const { AUTH_TOKEN: token } = req.cookies;

    if(token){
        return NextResponse.redirect('/user')
    }

    return NextResponse.next()

}