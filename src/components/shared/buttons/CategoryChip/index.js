import Link from 'next/link'
import Chip from '@mui/material/Chip'

const CategoryChip = ({ title, slug, styles }) => {
    return (
        <Link href={`/category/${slug}`}>
            <Chip 
                label={title} 
                clickable={true} 
                sx={styles ? styles : { marginBottom: '2vh', fontSize: '1em'}}
            />
        </Link>
    )
}

export default CategoryChip