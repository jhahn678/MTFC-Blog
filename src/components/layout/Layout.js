import Header from './Header/Header'
import Footer from './Footer/Footer'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function Layout({ children }){
    
    return(
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
}