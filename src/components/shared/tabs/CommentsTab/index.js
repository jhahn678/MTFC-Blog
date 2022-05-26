import classes from './CommentsTab.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CommentsTab = ({ data }) => {

    const [comments, setComments] = useState(data)

    return (
        <section>
            {
                comments.map(b => 
                    <Link href={`/post/${b.post.slug}`} key={b._id}>
                        <p>{b.body}</p>
                    </Link>
                )
            }
        </section>
    )
}

export default CommentsTab