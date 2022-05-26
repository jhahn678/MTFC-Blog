import classes from './FollowingTab.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const FollowingTab = ({ data }) => {

    const [following, setFollowing] = useState(data)

    return (
        <section>
            {
                following.map(f => 
                    <Link href={`/author/${f._id}`} key={f._id}>
                        <p>{f.displayName}</p>
                    </Link>
                )
            }
        </section>
    )
}

export default FollowingTab