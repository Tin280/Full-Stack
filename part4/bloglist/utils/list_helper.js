const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}
const favoriteBlog = (blogs) => {
    const mostlike = blogs.reduce((maxlike,currentlike) => {
        if(currentlike.likes > maxlike.likes) {
            return currentlike
        } else {
            return maxlike
        }
    },blogs[0])
    return {
        title: mostlike.title,
        author: mostlike.author,
        likes: mostlike.likes,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}