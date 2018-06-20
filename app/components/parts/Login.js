import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Container, Row, Col } from 'reactstrap';
import WebAPI from '../../util/WebAPI'
import CookieUtil from '../../util/CookieUtil'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleForgetMeClick = this.handleForgetMeClick.bind(this);
    } 

    handleForgetMeClick(){
        CookieUtil.RemoveUsernamePasswordCookie();
        this.setState({username:"", password:""});
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    handleKeyPress(event){
        if (event.charCode === 13){
            if (this.state.username !== "" && this.state.password !== ""){
                this.handleSubmitClick(null)
            }
        }
    }

    componentDidMount(){
        this.setState(CookieUtil.GetUsernamePasswordFromCookie());
    }

    handleSubmitClick(event){
        if(this.state.username === "" || this.state.password === ""){
            return
        }
        WebAPI.login(this.state)
            .then((response) => {
                console.log("-in then");
                console.log(response); 
                CookieUtil.SetAccessTokenCookie(response.data.accessToken, new Date(Date.now()+30*24*3600*1000)); // 30 days 
                CookieUtil.SetUsernamePasswordCookie(this.state.username, this.state.password);
                this.props.onLogin()
            })
            .catch((error) => {
                console.log("-in catch");
                console.log(error);
                console.log(error.response);
            });
    }

    render(){

        var floatRightStyle={
            "display": "block !important",
            "marginRight": "0 !important",
            "marginLeft": "auto !important"
        };
        var borderStyle={
            "border": "2px blue dashed"
        }

        return (<div className="centered">
            <Container>
                <Row>
                    <InputGroup className="marg5px">
                        <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
                        <Input placeholder="username" 
                            value={this.state.username} 
                            onChange={this.handleUsernameChange} 
                            onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="marg5px">
                    <InputGroupAddon addonType="prepend">Login</InputGroupAddon>
                        <Input placeholder="password" type="password" 
                            value={this.state.password} 
                            onChange={this.handlePasswordChange} 
                            onKeyPress={this.handleKeyPress}/>
                    </InputGroup>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.handleForgetMeClick} outline color="secondary" className="float-right margin5px">Forget me</Button> {' '}
                        <Button onClick={this.handleSubmitClick} color="primary" className="float-right margin5px">Login</Button>
                    </Col>
                </Row>
            </Container>
            <br />
        </div>)
    }
}

module.exports = Login