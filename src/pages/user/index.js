import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { axios } from '../../utils/axios'
import Link from 'next/link'

export async function getServerSideProps({ req, query }){
    const { data: user } = await axios.get('/user')
    return {
        props: { user }
    }
}

const User = ({ user }) => {
    return (
        <div>
            <h1>{user.account.displayName}</h1>
            {/* <h1>{user.account.}</h1>
            <h1>{user.}</h1>
            <h1>{user.}</h1> */}
        </div>
    )
}

export default User;