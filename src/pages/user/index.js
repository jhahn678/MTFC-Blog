import classes from './User.module.css'
import { useState, useEffect} from 'react'
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


export async function getServerSideProps({ req, query }){

    const { AUTH_TOKEN: token } = req.cookies;

    let tab = 0;

    switch(query.tab){
        case 'bookmarks':
            tab = 0;
            break;
        case 'notifications':
            tab = 1;
            break;
        case 'comments':
            tab = 2;
            break;
        case 'following':
            tab = 3;
            break;
        default:
            tab = 0;
            break;
    }

    const { data: user } = await axios.get('/auth/user/all', { 
        withCredentials: true ,
        headers: {
            cookie: serialize('AUTH_TOKEN', token)
        }
    })
    
    return {
        props: { user, tab }
    }
}

const User = ({ user, tab }) => {

    const [currentTab, setCurrentTab] = useState(tab)

    return (
        <div className={classes.page}>
            <div className='frab'>
                <UserAvatar user={user} textClass={classes.name} avatarStyles={{ fontSize: '1.4em' }}/>
                <p style={{ marginLeft: '4em'}}>Member since {formatDate(user.createdAt)}</p>
            </div>
            <Tabs value={currentTab} onChange={(_,v) => setCurrentTab(v)} className={classes.tabs}>
                <Tab label='Bookmarks'></Tab>
                <Tab label='Notifications'></Tab>
                <Tab label='Comments'></Tab>
                <Tab label='Following'></Tab>
            </Tabs>
            { currentTab === 0 && <BookmarksTab data={user.bookmarks}/> }
            { currentTab === 1 && <NotificationsTab data={user.notifications}/> }
            { currentTab === 2 && <CommentsTab data={user.comments}/> }
            { currentTab === 3 && <FollowingTab data={user.following}/> }
            
        </div>
    )
}

export default User;