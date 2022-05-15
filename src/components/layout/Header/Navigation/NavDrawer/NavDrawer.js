import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import classes from './NavDrawer.module.css'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import StoreIcon from '@mui/icons-material/Store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CreateIcon from '@mui/icons-material/Create';
import { createClient } from 'contentful'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const StyledDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paperAnchorLeft': {
        width: '100vw',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    '& .MuiDrawer-paper': {
        fontSize: '1.2em'
    }
}));

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})
       

const NavDrawer = ({ open, setOpen }) => {

    const [categories, setCategories] = useState([])

    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await client.getEntries({ content_type: 'category'})
            console.log(data.items)
            setCategories(data.items)
        }
        fetchCategories()
    },[])
    
    return (
        <StyledDrawer open={open} onClose={() => setOpen(false)}>
            <div className={classes.navDrawerHeader}>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon fontSize='large'/>
                </IconButton>
            </div>
            <List>
                {
                    categories.map(c => 
                        <ListItemButton 
                            key={c.sys.id}
                            sx={{ padding: '2vh 2vw', fontSize: '1.2em'}}
                            onClick={() => router.push(`/category/${c.fields.slug}`)}
                        >{c.fields.title}</ListItemButton>
                    )
                }
                <Divider sx={{ margin: '3vh 0 1vh'}}/>
                <ListItemButton>
                    <ListItemIcon><AccountCircleIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='Profile'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><NotificationsIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='Notifications'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><BookmarksIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='Bookmarks'/>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon><CreateIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='Compose'/>
                </ListItemButton>
                <Divider sx={{ margin: '1vh'}}/>
                <ListItemButton>
                    <ListItemIcon><StoreIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='MTFC Shop'/>
                </ListItemButton>
            </List>
        </StyledDrawer>
    )
}

export default NavDrawer;