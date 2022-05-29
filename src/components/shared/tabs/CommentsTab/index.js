import classes from './CommentsTab.module.css'
import { useState, useEffect } from 'react'
import { useLazyGetMyCommentsQuery } from '../../../../store/api'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { useAuthContext } from '../../../../store/context/auth'
import ActivityFeed from '../../ActivityFeed'

const CommentsTab = ({ data }) => {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({ next: false, page: 1 })
    
    const { authStatus } = useAuthContext()
    const [ getComments, { isLoading }] = useLazyGetMyCommentsQuery()

    const loadMore = async (page=1, limit=10) => {
        setLoading(true)
        try{
            const res = await getComments({ limit, page }).unwrap()
            setComments((state) => state.concat(res.comments))
            setPagination({
                next: res.comments.length === limit,
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
            const res = await getComments({ limit, page: 1 }).unwrap()
            setComments(res.comments)
            setPagination((state) => ({
                ...state,
                next: res.comments.length === limit,
            }))
        }catch(err){
            toast.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!data){
            refresh()
        }else{
            setComments(data)
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
                        <p style={{ marginRight: 5 }}>{authStatus.user?.comments?.length}</p>
                        <p><i>{authStatus.user?.comments?.length === 1 ? 'Comment' : 'Comments'}</i></p>
                        <Button variant='outlined'
                            sx={{ padding: '0px 8px', marginLeft: 2 }}
                            onClick={() => refresh(comments.length)}>Refresh</Button>
                    </div>
                    <ActivityFeed comments={comments}/>
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

export default CommentsTab