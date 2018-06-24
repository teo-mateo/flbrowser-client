import React from 'react'
{/*import {Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'; */}
import { Menu, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router';

class FlbrowserNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {};

        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick(){
        this.props.onLogout();  
    }

    handleHomeClick(){
        console.log('handleHomeClick');
        console.log(this.props);
        this.props.history.push("/");
    }

    handleActiveClick(){
        console.log('handleActiveClick');
        console.log(this.props);
        this.props.history.push("/active");
    }

    render(){
        if (this.props.isLoggedIn){
            return(
                <Menu>
                    <Menu.Item name="home" onClick={this.handleHomeClick}>
                        <Icon name="home"/> Home
                    </Menu.Item>
                    <Menu.Item name="active" onClick={this.handleActiveClick}>
                        <Icon name="exclamation"/> Active
                    </Menu.Item>
                    <Menu.Item name="logout" onClick={this.handleLogoutClick}>
                        <Icon name="log out" /> Log out
                    </Menu.Item>
                </Menu>
            );
        } else {
            return (<div></div>);
        }
    }
}

module.exports=withRouter(FlbrowserNav);