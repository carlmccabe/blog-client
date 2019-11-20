import React from "react"
import {Heading, Button} from "react-bulma-components"

const BlogPostTitle = props => {
    const {title, showEditDelete} = props
    return (
        <div>
        <Heading>{title}</Heading>
        {showEditDelete && (
            <div className="level-right">
            <Button className="add-margin" color="info">Edit</Button>
            <Button className="add-margin" color="info">Delete</Button>
            </div>
        )}
        </div>
    )
}

export default BlogPostTitle