import React,{ useReducer, useEffect} from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Nav from "./Nav"
import BlogPosts from "./BlogPosts"
import Title from "./Title"
import About from "./About"
import NotFound from "./NotFound"
import SignIn from "./SignIn"
import RegisterUser from "./RegisterUser"
import stateReducer from "../config/stateReducer"
import { getAllBlogPosts,addBlogPost } from "../services/blogPostsServices"
import { loginUser, logoutUser } from "../services/authServices"
import NewBlogPost from "./NewBlogPost"


const App = () => {

	// Get loggedInUser from localStorage
	function getLoggedInUser() {
		return localStorage.getItem("loggedInUser")
	}

	// Store loggedInUser username in local storage
	function setLoggedInUser(user) {
		user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
	}

	// handles login
	// TODO: refactor to function as callback passed to SignIn form component
	// 	- get username and password from form event
	//	- authenticate with express server
	// 	- update loginError in state if there is one and re-render SignIn form component
	//	- update loggedInUser if successful (and save to local storage)
	function handleLogin(event, props) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value
		// TBD: Authenticate with server. If successful:
		loginUser({username: username, password: password}).then(
			(response) => {
				dispatchLoggedInUser({
					type: "setLoggedInUser",
					data: username
				})
				setLoggedInUser(username)
				props.history.push("/posts")
			}).catch((error) => {
				const status = error.response.status
				console.log(`An error occurred authenticating: ${error} with status: ${status}`)
				dispatchLoginError({
					type: "setLoginError",
					data: "Authentication failed! Please check username and password"

				})
			})
	}

	// handles logout
	// TODO: call server to log out
	function handleLogout() {
		logoutUser()
		dispatchLoggedInUser({
			type: "setLoggedInUser",
			data:  null
		})
		setLoggedInUser(null)
		return <Redirect to="/posts" />
	}

	// Fetches blog posts from server and updates state
	function fetchBlogPosts() {
		getAllBlogPosts().then((response) => {
			const allPosts = response
			console.log("all posts from server:", allPosts)
			dispatchBlogPosts ({
				type: "setBlogPosts",
				data: allPosts
			})
		}).catch((error) =>{
			console.log(`oops! Something is wrong - check the server. We got an error: ${error}`)
		})
	}

	function addNewBlogPost(event, props) {
		event.preventDefault()
		const date = new Date()

		const form = event.target
		const post = {
			title: form.title.value,
			date: date,
			username: loggedInUser,
			category: form.category.value,
			content: form.content.value
		}

		// call to server to add blog post
		addBlogPost(post).then((response) => {
			const newPost = response
			// update the state
			dispatchBlogPosts({
				type: "setBlogPosts",
				data: [...blogPosts, newPost]
			})
			props.history.push(`/posts/${newPost._id}`)
		}).catch((error) => {
			const status = error.response.status
			console.log(`An error occured adding the post: ${error} with status ${status}`)
		})
	}

	// Use reducer hook to handle state items
	const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
	const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, [])
	const [loginError, dispatchLoginError] = useReducer(stateReducer, null)

	// Use effect hook to initialise component on mount and when blog posts are updated
	useEffect(()=> {
        // for any initialisation to be performed when component mounts, or on update of state values in the second argument
		fetchBlogPosts()
		// If we have login information persisted, set the state
		dispatchLoggedInUser({
			type: "setLoggedInUser",
			data: getLoggedInUser()
		})
        // return a function that specifies any actions on component unmount
		return () => {}
	}, [])

	return (

			<div className="container">
				<BrowserRouter>
					<Nav loggedInUser={loggedInUser}/>
					<Title />
					<Switch>
						<Route exact path="/" render ={ () => <Redirect to="/posts" />} />
						<Route exact path="/posts/new" render={(props) => <NewBlogPost {...props} addNewBlogPost={addNewBlogPost} />} />
						<Route exact path="/posts/:id" render ={ (props) => <BlogPosts {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
						<Route exact path="/posts" render ={ (props) => <BlogPosts {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
						<Route exact path="/auth/login" render={ (props) => <SignIn {...props} handleLogin={handleLogin} loginError={loginError}/> }/>
						<Route exact path="/auth/register" render={ (props) => <RegisterUser {...props} />} />
						<Route exact path="/auth/logout" render={() => handleLogout()} />
						<Route exact path="/about" component={About} />
						<Route component={NotFound} />
					</Switch>

			</BrowserRouter>
		</div>

	)
}
export default App
