import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'

const FadeModal = ({ open, setOpen, children }) => {
    

    
    return (
        <Backdrop open={open}>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Fade in={open} unmountOnExit>
                    {children}
                </Fade>
            </Modal>
        </Backdrop>
    )
}

export default FadeModal