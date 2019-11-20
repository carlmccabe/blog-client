import React from "react"

const Comment = props => {
	const { comment } = props
	const { username, content } = comment

	return (
		<div className="content">
			<p>{username}</p>
			<p>{content}</p>
		</div>
	)
}

export default Comment