import React from "react"
import {Heading, Button} from "react-bulma-components"

const CommentsTitle = props => {
    const {showAddComment} = props
    return (
        <div className="level">
            <Heading >Comments</Heading>
            {showAddComment && (
                <Button className="level" color="info">Add Comment</Button>
            )}
        </div>
    )
}

export default CommentsTitle