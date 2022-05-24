import { useState, useEffect } from 'react'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdd'
import Button from '@mui/material/Button'
import { useAuthContext } from '../../../../store/context/auth'
import { useBookmarkPostMutation } from '../../../../store/api'

const BookmarkButton = ({ post }) => {

    const [ bookmarkPost ] = useBookmarkPostMutation()

    const { authStatus, setBookmarks } = useAuthContext()

    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        if(authStatus?.user?.bookmarks?.includes(post._id)){
            setIsBookmarked(true)
        }
    },[authStatus.user])

    const handleBookmark = async () => {
        setIsBookmarked(f => !f)
        const res = await bookmarkPost(post._id).unwrap()
        setBookmarks(res.user.bookmarks)
    } 

    return (
        <Button 
            startIcon={ isBookmarked ? <BookmarkAddedIcon color='success'/> : <BookmarkAddIcon/>}
            onClick={handleBookmark}
        >{isBookmarked ? 'Unbookmark' : 'Bookmark' }</Button>
    )
}

export default BookmarkButton