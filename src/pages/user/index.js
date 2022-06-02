import classes from './User.module.css'
import { useEffect, useState } from 'react'
import { serialize } from 'cookie'
import { axios } from '../../utils/axios'
import { formatDate } from '../../utils/formatDate'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import UserAvatar from '../../components/shared/UserAvatar'
import BookmarksTab from '../../components/shared/tabs/BookmarksTab';
import CommentsTab from  '../../components/shared/tabs/CommentsTab';
import FollowingTab from '../../components/shared/tabs/FollowingTab';
import NotificationsTab from '../../components/shared/tabs/NotificationsTab'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuthContext } from '../../store/context/auth'


export async function getServerSideProps({ req, query }){

    const { AUTH_TOKEN: token } = req.cookies;

    if(!token){
        return{
            redirect: {
                destination: '/user/login',
                permanent: false
            }
        }
    }

    const auth = { 
        withCredentials: true ,
        headers: {
            cookie: serialize('AUTH_TOKEN', token)
        }
    }

    let tab = 0;
    let bookmarks = null;
    let notifications = null;
    let comments = null;
    let following = null;

    if(query.tab === 'bookmarks'){
        const { data } = await axios.get('/auth/user/bookmarks', auth)
        bookmarks = data.bookmarks;
        tab = 0;
    }
    else if(query.tab === 'notifications'){
        const { data } = await axios.get('/auth/user/notifications', auth)
        notifications = data.notifications;
        tab = 1;
    }
    else if(query.tab === 'comments'){
        const { data } = await axios.get('/auth/user/comments', auth)
        comments = data.comments;
        tab = 2;
    }
    else if(query.tab === 'following'){
        const { data } = await axios.get('/auth/user/following', auth)
        following = data.following;
        tab = 3;
    }
    else{
        const { data } = await axios.get('/auth/user/bookmarks', auth)
        bookmarks = data.bookmarks;
        tab = 0;
    }       

    const { data: user } = await axios.get('/auth/user', auth)
    
    return {
        props: { user, tab, bookmarks, notifications, comments, following }
    }
}

const User = ({ user, tab, bookmarks, notifications, comments, following }) => {

    const { authStatus } = useAuthContext()

    const [currentTab, setCurrentTab] = useState(tab)

    const router = useRouter()

    useEffect(() => {
        if(router.query.tab === 'bookmarks') return setCurrentTab(0)
        if(router.query.tab === 'notifications') return setCurrentTab(1)
        if(router.query.tab === 'comments') return setCurrentTab(2)
        if(router.query.tab === 'following') return setCurrentTab(3)
    },[router.query.tab])

    useEffect(() => {
        if(!authStatus.isAuthenticated){
            router.push('/')
        }
    },[authStatus.isAuthenticated])

    const onTabChange = (e, v) => {
        switch (e.target.firstChild.data){
            case 'Bookmarks':
                setCurrentTab(v)
                router.push('/user?tab=bookmarks')
                break;
            case 'Notifications':
                setCurrentTab(v)
                router.push('/user?tab=notifications')
                break;
            case 'Comments':
                setCurrentTab(v)
                router.push('/user?tab=comments')
                break;
            case 'Following':
                setCurrentTab(v)
                router.push('/user?tab=following')
                break;
        }
    }

    return (
        <>
        <Head>
            <title>My Profile | MTFC Blog</title>
        </Head>
        <div className={classes.page}>
            <div className={classes.user}>
                <UserAvatar user={user} textClass={classes.name} avatarStyles={{ fontSize: '1.4em' }}/>
                <p style={{ marginLeft: '4em'}}>Member since {formatDate(user.createdAt)}</p>
            </div>
            <Tabs value={currentTab} onChange={onTabChange} className={classes.tabs} variant='scrollable'>
                <Tab label='Bookmarks'></Tab>
                <Tab label='Notifications'></Tab>
                <Tab label='Comments'></Tab>
                <Tab label='Following'></Tab>
            </Tabs>
            { currentTab === 0 && <BookmarksTab data={bookmarks}/> }
            { currentTab === 1 && <NotificationsTab data={notifications}/> }
            { currentTab === 2 && <CommentsTab data={comments}/> }
            { currentTab === 3 && <FollowingTab data={following}/> }
            
        </div>
        </>
    )
}

export default User;