import React, { Fragment, useState } from "react"
import { NavLink } from "react-router-dom"
import { Navbar } from "react-bulma-components"

// The Nav component renders the nav bar at the top of the page
// It is a class component because it requires state to manage the hamburger menu toggle
const Nav = (props) => {

    // forces a state change to hide the hamburger menu
    function hideMenu() {
        setActive(false)
    }

    function navLoggedIn() {
        return (
            <Fragment>
            
                <Navbar.Container position="start">
                    <NavLink to="/auth/logout" className="navbar-item" onClick={hideMenu}>Logout</NavLink>
                </Navbar.Container>
                <Navbar.Container position="end">
                    
                        <NavLink to="/posts/new" className="navbar-item" onClick={hideMenu}>Add Post</NavLink>
                        <NavLink to="#" className="navbar-item" onClick={hideMenu}>Categories</NavLink>
                        <NavLink to="/about" className="navbar-item" onClick={hideMenu}>About</NavLink>
                        <NavLink to="/" className="navbar-item" onClick={hideMenu}>Home</NavLink>
                        <NavLink to={`/posts?username=${loggedInUser}`} className="navbar-item" onClick={hideMenu}>
                            My Blog
                        </NavLink>
                   
                </Navbar.Container>
            
            </Fragment>
        )
    }
    
    function navLoggedOut() {
        return (
            <Fragment>
                <Navbar.Container position="start">
                    <NavLink to="/auth/login" className="navbar-item" onClick={hideMenu}>Login</NavLink>
                    <NavLink to="/auth/register" className="navbar-item" onClick={hideMenu}>Register</NavLink>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <NavLink to="#" className="navbar-item" onClick={hideMenu}>Categories</NavLink>
                    <NavLink to="/about" className="navbar-item" onClick={hideMenu}>About</NavLink>
                    <NavLink to="/" className="navbar-item" onClick={hideMenu}>Home</NavLink>
                </Navbar.Container>
            </Fragment>
        )
    }
    

    const [active, setActive] = useState(false)
    const {loggedInUser} = props

    return (
        // active is stored in state, and used to toggle the hamburger menu  
        <Navbar color="info" fixed="top"  active={active}>
            <Navbar.Brand>
                <Navbar.Item renderAs="p">{loggedInUser || "guest"}</Navbar.Item>
                <Navbar.Burger onClick={() => {setActive(!active)}} />
            </Navbar.Brand>
            <Navbar.Menu>
                {/* Render the relevant NavLinks depending on whether or not a user is logged in  */}
                {loggedInUser ? navLoggedIn() : navLoggedOut()}
            </Navbar.Menu>
        </Navbar>
        
    )
}
export default Nav