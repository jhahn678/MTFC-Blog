import classes from './UserWidget.module.css'
import { useState, useEffect } from 'react'
import { useLazyGetMeQuery } from '../../../store/api'
import { formatDate } from '../../../utils/formatDate'
import { useAuthContext } from '../../../store/context/auth'
import { useModalContext } from '../../../store/context/modal'
import Avatar from '@mui/material/Avatar'
import Button from '../buttons/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const UserWidget = ({ containerClass }) => {

    const { authStatus, resetAuthStatus } = useAuthContext()
    const { setShowLogin, setShowRegister } = useModalContext()

    const [tab, setTab] = useState(0)

    return (
        <div className={containerClass}>
            { authStatus.isAuthenticated && authStatus.user?.account &&
            <>
                <div className='frac'>
                     <Avatar sx={{ backgroundColor: 'var(--primary)'}}
                        src={authStatus.user.account?.avatar} 
                        alt={authStatus.user.account.displayName}>
                        {authStatus.user.account.displayName.slice(0,1)}
                    </Avatar>
                    <h3 className={classes.name}>{authStatus.user.account.displayName}</h3>
                    <Button variant='outlined' size='small' 
                        sx={{ marginLeft: 3, fontSize: 10}} 
                        onClick={() => resetAuthStatus()}
                    >Sign out</Button>
                </div>
                <Tabs value={tab} onChange={(e,v) => setTab(v)}>
                    <Tab label="Profile"/>
                    <Tab label="Notifications"/>
                    <Tab label="Bookmarks"/>
                </Tabs>
                { tab === 0 && <div className={classes.tab}>{formatDate(authStatus.user.createdAt)}</div> }
                { tab === 1 && <div className={classes.tab}></div> }
                { tab === 2 && <div className={classes.tab}></div> }
            </>
            }
            { !authStatus.isAuthenticated &&
                <>
                    <h3 className={classes.header}>Don't have an account?</h3>
                    <p className={classes.text}>Create an account for a more <i>personalized </i>
                     experience. Bookmark posts, follow authors, leave comments and more.</p>
                    <div className='frac'>
                        <Button variant='contained' sx={{ marginRight: 1 }}
                        onClick={() => setShowRegister(true)}>Sign up</Button>
                        <span>or</span>
                        <Button variant='outlined' sx={{ marginLeft: 1 }}
                        onClick={() => setShowLogin(true)}>Sign in</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default UserWidget