export const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric'})
}


export const formatDateAuthor = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString([], { month: 'long', year: 'numeric'})
}

export const formatDateComment = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleString([], { dateStyle: 'long', timeStyle: 'short'})
}