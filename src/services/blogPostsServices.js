import api from "../config/api"

// Returns a single blog post with the specified id
export const getBlogPost = (blogPosts, id) => {
    return blogPosts.filter(post => post._id == id)
}

// Gets all blog posts from the server
export const getAllBlogPosts = async () => {
    try {
        const response = await api.get("/posts")
        return response.data
    }
    catch (error) {
        console.log("got an error from the server fetching posts:", error)
        throw(error)
    }

}

// Returns blog posts filtered by specified attributes
export const getFilteredBlogPosts = (blogPosts, filters) => {
    let filteredPosts = blogPosts
    for(let attr of Object.keys(filters)) {
        filteredPosts = filteredPosts.filter((post) => post[attr] === filters[attr])
    }
    return filteredPosts
}

// Adds a new blog post to the database
export const addBlogPost = async (postInfo) => {
    // call to server to add new post
    // will return the new post

    const newPost = {
        title: postInfo.title,
        username: postInfo.username,
        create_date: postInfo.date,
        modified_date: postInfo.date,
        category: postInfo.category,
        content: postInfo.content,
        comments: []
    };
    try {
        const response = await api.post("/posts", newPost)
        return response.data
    }
    catch (error) {
        console.log("Error adding post:", error)
        throw(error)
    }
}
