import classes from './BookmarksTab.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BookmarksTab = ({ data }) => {

    const [bookmarks, setBookmarks] = useState(data)

    return (
        <section>
            {
                bookmarks.map(b => 
                    <Link href={`/post/${b.slug}`} key={b._id}>
                        <p>{b.title}</p>
                    </Link>
                )
            }
        </section>
    )
}

export default BookmarksTab