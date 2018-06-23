import React from 'react'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class FlbrowserNav extends React.Component{
    constructor(){
        super();
        this.state = {};
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(){
        this.props.onLogout();  
    }

    render(){
        if (this.props.isLoggedIn){
            return(
                <Navbar color="faded">
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/active">Active</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={this.handleLogoutClick}>Log out</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>

                    </Nav>
                    <Nav className="ml-2" navbar>

                    </Nav>
                </Navbar>
            );
        } else {
            return (<div></div>);
        }
    }
}

module.exports=FlbrowserNav;