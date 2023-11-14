const _ = require ('lodash')
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

const mostProlificAuthorBlogCount  = (blogs) => {
    const authorBlogCounts  = _.countBy(blogs, 'author')
    const mostProlificAuthor  = _.maxBy(
        _.keys(authorBlogCounts),
        author => authorBlogCounts[author]
    )
    return  {
        author: mostProlificAuthor,
        blogs: authorBlogCounts[mostProlificAuthor]
    }
}

const authorWithMostLikes = (blogs) => {
    // Gom nhóm bài viết theo tác giả bằng hàm _.groupBy
    const authorLikes = _.groupBy(blogs, 'author')
    // Tìm tác giả có nhiều lượt thích nhất bằng hàm _.maxBy
    const authorWithMost = _.maxBy(_.keys(authorLikes), author => {
    // Tính tổng số lượt thích cho mỗi tác giả bằng hàm _.sumBy
        const totalLikes = _.sumBy(authorLikes[author], 'likes')
        return totalLikes
    })
    // Trả về đối tượng chứa tác giả có nhiều lượt thích nhất và tổng số lượt thích của họ
    return {
        author: authorWithMost,
        likes: _.sumBy(authorLikes[authorWithMost], 'likes')
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostProlificAuthorBlogCount,
    authorWithMostLikes
}