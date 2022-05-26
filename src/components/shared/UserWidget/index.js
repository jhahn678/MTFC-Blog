import classes from './UserWidget.module.css'
import { useAuthContext } from '../../../store/context/auth'
import { useModalContext } from '../../../store/context/modal'
import Avatar from '@mui/material/Avatar'
import Button from '../buttons/Button'
import Link from 'next/link'
import TextHover from '../TextHover'

const UserWidget = ({ containerClass }) => {

    const { authStatus, resetAuthStatus } = useAuthContext()
    const { setShowLogin, setShowRegister } = useModalContext()

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
                    <div className={classes.divider}/>
                    <Button variant='outlined' size='small' 
                        sx={{ fontSize: 10}} 
                        onClick={() => resetAuthStatus()}
                    >Sign out</Button>
                </div>
                <div className='frsb' style={{ width: '23vw' }}>
                    <TextHover>
                        <Link href='/user/following'>
                            <p className={classes.detail}>{authStatus.user.following.length} Following</p>
                        </Link>
                    </TextHover>
                    <TextHover>
                        <Link href='/user/bookmarks'>
                            <p className={classes.detail}>
                                { authStatus.user.bookmarks.length}
                                { authStatus.user.bookmarks.length === 1 ? ' Bookmark' : ' Bookmarks' }
                            </p>
                        </Link>
                    </TextHover>
                </div>
                <div className='frsb' style={{ width: '23vw'}}>
                    <TextHover>
                        <Link href='/user/comments'>
                            <p className={classes.detail}>
                                { authStatus.user.comments.length}
                                { authStatus.user.comments.length === 1 ? ' Comment' : ' Comments' }
                            </p>
                        </Link>
                    </TextHover>
                    <TextHover>
                        <Link href='/user/notifications'>
                            <p className={classes.detail}>
                                { authStatus.user.notifications.length }
                                { authStatus.user.notifications.length === 1 ? ' Notification' : ' Notification' }
                            </p>
                        </Link>
                    </TextHover>
                </div>
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