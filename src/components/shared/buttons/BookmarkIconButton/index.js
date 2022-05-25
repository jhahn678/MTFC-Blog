import { useState, useEffect } from 'react'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import IconButton from '@mui/material/IconButton'
import { useAuthContext } from '../../../../store/context/auth'
import { useBookmarkPostMutation } from '../../../../store/api'

const BookmarkIconButton = ({ post }) => {

    const [ bookmarkPost ] = useBookmarkPostMutation()

    const { authStatus, setBookmarks } = useAuthContext()

    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        if(authStatus?.user?.bookmarks?.includes(post._id)){
            setIsBookmarked(true)
        }
    },[authStatus.user])

    const handleBookmark = async (e) => {
        e.stopPropagation()
        setIsBookmarked(f => !f)
        const res = await bookmarkPost(post._id).unwrap()
        setBookmarks(res.user.bookmarks)
    } 

    return (
        <IconButton onClick={handleBookmark}>
            { isBookmarked ? <BookmarkAddedIcon color='success'/> : <BookmarkAddIcon/>}
        </IconButton>
    )
}

export default BookmarkIconButton