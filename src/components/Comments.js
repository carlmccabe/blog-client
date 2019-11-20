import React from "react"
import { Heading, Button } from "react-bulma-components"
import Comment from "./Comment"

const Comments = props => {
	const { comments, showAddComment} = props
	
	return (
		<div >		
            <div className="level">
                <Heading className="level-left">Comments</Heading>
                {showAddComment && (<Button className="level-right" notification="true" color="info">Add Comment</Button>)}
            </div>	
            {comments.map(comment => (                                    
                <Comment key={comment._id} comment={comment} />                                    
            ))}        
		</div>
	)
}

export default Comments