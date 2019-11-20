import React from "react"

const SignIn = props => {
	const { handleLogin, loginError } = props

	function loginUser(event) {
		handleLogin(event,props)
	}

	return (
		<form onSubmit={loginUser}>
			{ loginError && <p className="has-text-danger">{ loginError }</p>}
			<label className="label">Username</label>
			<input type="text" className="input" name="username" placeholder="Username" required></input>
			<label className="label">Password</label>
			<input type="password" className="input" name="password" placeholder="Password" required></input>
			<input type="submit" value="Login" className="button is-info"></input>
		</form>
	)
}

export default SignIn
