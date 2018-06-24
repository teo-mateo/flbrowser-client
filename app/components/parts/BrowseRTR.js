import React from 'react'
import WebAPI from '../../util/WebAPI'
import { 
    Button as SemButton, Divider,
    Input as SemInput,
    Grid, Container } from 'semantic-ui-react'

class BrowseRTR extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rtorrents: []
        };
    }

    loadRTRTorrents(){
        WebAPI.getRtrTorrents()
            .then((response) =>{
                console.log('--getRtrTorrents.then--');
                console.log(response);
                this.setState({rtorrents:response.data});
            })
            .catch((error) => {
                console.log('--getRtrTorrents.error--');
                console.log(error);
            })
    }

    render(){
        return (
            <Container>
                <h3>Active (RTORRENT) Torrents</h3>
            </Container>
        );
    }

    componentDidMount(){
        this.loadRTRTorrents()
    }
}

module.exports = BrowseRTR