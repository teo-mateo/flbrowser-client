import React from 'react'
import WebAPI from '../../util/WebAPI'
import CookieUtil from '../../util/CookieUtil'
import { 
        Button as SemButton, Divider,
        Input as SemInput,
        Grid, Container } from 'semantic-ui-react'

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
        let cookieUsernamePassword = CookieUtil.GetUsernamePasswordFromCookie();
        this.setState(cookieUsernamePassword);
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

        return (

        <Grid rows={5}>
            <Grid.Row columns={3}>
                <Grid.Column width={3}/>
                <Grid.Column width={10}><h3>Log in to FILELIST browser</h3></Grid.Column>
                <Grid.Column width={3}/>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column width={16}><hr /></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    <h4>Use your Username and Password:</h4>
                </Grid.Column>
                <Grid.Column width={3}/>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    <SemInput label="?" placeholder="username" fluid
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                onKeyPress={this.handleKeyPress} />                    
                </Grid.Column>
                <Grid.Column width={3}/>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    <SemInput label="?" placeholder="password" type="password" fluid
                                    value={this.state.password} 
                                    onChange={this.handlePasswordChange} 
                                    onKeyPress={this.handleKeyPress}/>
                </Grid.Column>
                <Grid.Column width={3}/>
            </Grid.Row>
            <Grid.Row columns={3} >
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    <SemButton.Group>
                        <SemButton onClick={this.handleSubmitClick}  className="float-right margin5px" primary>Login</SemButton>                    
                        <SemButton.Or />
                        <SemButton onClick={this.handleForgetMeClick}  className="float-right margin5px">Forget me</SemButton> 
                    </SemButton.Group>
                    {/*
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <SemButton onClick={this.handleSubmitClick}  className="float-right margin5px">Login</SemButton>                    
                            </Grid.Column>                        
                            <Grid.Column>
                                <SemButton onClick={this.handleForgetMeClick}  className="float-right margin5px">Forget me</SemButton> 
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>*/}
                </Grid.Column> 
                <Grid.Column width={3}/>
            </Grid.Row>
            
        </Grid>
        )
    }
}

module.exports = Login