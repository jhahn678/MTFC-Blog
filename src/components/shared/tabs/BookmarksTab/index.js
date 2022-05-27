import classes from './BookmarksTab.module.css'
import { useState, useEffect } from 'react'
import { useLazyGetMyBookmarksQuery } from '../../../../store/api'
import PostList from '../../PostList'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { useAuthContext } from '../../../../store/context/auth'

const BookmarksTab = ({ data }) => {

    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({ next: false, page: 1 })

    const { authStatus } = useAuthContext()
    const [ getBookmarks, { isLoading } ] = useLazyGetMyBookmarksQuery()

    const loadMore = async (page=1, limit=10) => {
        setLoading(true)
        try{
            const res = await getBookmarks({ limit, page }).unwrap()
            setBookmarks((state) => state.concat(res.bookmarks))
            setPagination({
                next: res.bookmarks.length === limit,
                page: page
            })
        }catch(err){
            toast.error(err)
        }
        setLoading(false)
    }

    const refresh = async (limit=10) => {
        setLoading(true)
        try{
            const res = await getBookmarks({ limit, page: 1 }).unwrap()
            setBookmarks(res.bookmarks)
            setPagination((state) => ({
                ...state,
                next: res.bookmarks.length === limit,
            }))
        }catch(err){
            toast.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!data){
            loadMore()
        }else{
            setBookmarks(data)
            setPagination({
                next: data.length === 10,
                page: 1
            })
        }
    },[])

    return (
        <main className={classes.container}>
            { isLoading ? 
                <div style={{ padding: '12vh 15vw'}}>
                    <CircularProgress size={100} thickness={1}/>
                </div> : 
                <>
                <div className={classes.refresh}>
                <p style={{ marginRight: 5 }}>{authStatus.user?.bookmarks?.length}</p>
                    <p><i>{authStatus.user?.bookmarks?.length === 1 ? 'Bookmark' : 'Bookmarks'}</i></p>
                    <Button variant='outlined'
                        sx={{ padding: '0px 8px', marginLeft: 2 }}
                        onClick={() => refresh(bookmarks.length)}>Refresh</Button>
                </div>
                <PostList 
                    posts={bookmarks} 
                    containerClass={classes.postList} 
                    postClass={classes.post}
                />
                </>
            }
            { pagination.next  &&
                <Button variant='outlined' 
                    sx={{ 
                        width: 'fit-content', 
                        height: '50px',
                        width: '200px',
                        alignSelf: 'center',
                        margin: '3vh 0 1vh'
                    }}
                    onClick={() => loadMore(pagination.page + 1)}
                >{ loading ? <CircularProgress size={30}/> : 'Load more'}</Button>
            }
        </main>
    )
}

export default BookmarksTab