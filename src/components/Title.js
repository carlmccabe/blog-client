import React from "react"
import { Heading } from "react-bulma-components"

export default function Title() {
	return (
		<div className="level">
			<Heading>Many mumbling mice</Heading>
			<img alt="Four little cartoon mice" className="mice" src="/mice.png" />
		</div>
	)
}
