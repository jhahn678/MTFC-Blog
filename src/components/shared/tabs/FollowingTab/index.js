import classes from './FollowingTab.module.css'
import { useState, useEffect } from 'react'
import { useLazyGetMyFollowingQuery } from '../../../../store/api'
import AuthorCard from '../../AuthorCard'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

const FollowingTab = ({ data }) => {

    const [following, setFollowing] = useState([])

    const [ getFollowing, { isLoading }] = useLazyGetMyFollowingQuery()

    const refetch = async () => {
        try{
            const res = await getFollowing().unwrap()
            setFollowing(res.following)
        }catch(err){
            toast.error(err)
        }
    }

    useEffect(() => {
        if(!data){
            refetch()
        }else{
            setFollowing(data)
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
                        <p style={{ marginRight: 5 }}>{following.length}</p>
                        <p><i>Following</i></p>
                        <Button variant='outlined' 
                            sx={{ padding: '0px 4px', marginLeft: 2 }}
                            onClick={() => refetch()}
                        >Refresh</Button>
                    </div>
                    <div className={classes.followingContainer}>
                        { following.map(f => <AuthorCard author={f} key={f._id}/>) }
                    </div>
                </>
            }
        </main>
    )
}

export default FollowingTab