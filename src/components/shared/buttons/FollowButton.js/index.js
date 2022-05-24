import { useState, useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { useAuthContext } from '../../../../store/context/auth'
import { useFollowAuthorMutation } from '../../../../store/api'

const FollowButton = ({ author }) => {

    const { authStatus, setFollowing } = useAuthContext()

    const [isFollowed, setIsFollowed] = useState(false)

    const [ followAuthor ] = useFollowAuthorMutation()

    useEffect(() => {
        if(authStatus?.user?.following?.includes(author._id)){
            setIsFollowed(true)
        }
    },[authStatus.user])

    const handleFollow = async () => {
        setIsFollowed(f => !f)
        const res = await followAuthor(author._id).unwrap()
        setFollowing(res.user.following)
    }

    return (
        <Button 
            startIcon={ isFollowed ? <CheckCircleIcon color='success'/> : <AddIcon/>}
            onClick={handleFollow}
        >{isFollowed ? 'Unfollow' : 'Follow' }</Button>
    )
}

export default FollowButton