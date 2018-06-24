import React from 'react'
import WebAPI from '../../util/WebAPI'
import { 
    Button as SemButton, Divider,
    Input as SemInput,
    Grid, Container, Table, Label } from 'semantic-ui-react'

class BrowseRTR extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rtorrents: [],
            loading: true
        };

        this._doRTRAction = this._doRTRAction.bind(this);
    }

/*
    {
    "id": "0A1581B84A1F5AAC5726129934162238B272013F",
    "name": "Westworld.S02E02.1080i.HDTV.H.264.DD5.1.RoHardSubbed-playTV.ts",
    "creationdate": 1525046295,
    "isopen": true,
    "isactive": true,
    "ishashchecked": true,
    "ishashchecking": false,
    "ismultifile": false,
    "downtotal": 0,
    "uptotal": 131365809,
    "directory": "/root/rtorrent/rDownloads",
    "completedbytes": 3689376672,
    "leftbytes": 0,
    "sizefiles": 1,
    "sizebytes": 3689376672
  },


*/


    _doRTRAction(id, action){
        WebAPI.rtrAction(id, action)
        .then((result) => {
            this.loadRTRTorrents();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    loadRTRTorrents(){
        WebAPI.getRtrTorrents()
            .then((response) =>{
                console.log('--getRtrTorrents.then--');
                console.log(response);
                this.setState({rtorrents:response.data, loading: false});
            })
            .catch((error) => {
                console.log('--getRtrTorrents.error--');
                console.log(error);
            })
    }

    render(){
        let rows = this.state.rtorrents.map((torrent,i) =>(
            <Table.Row key={i}>
                <Table.Cell>
                    <h5>{torrent.name}</h5>
                    <Label as='a' color={torrent.isopen ? "green" : "red"} tag> 
                        {torrent.isopen ? "open" : "closed"}
                    </Label>
                    <Label as='a' color={torrent.isactive ? "green" : "red"} tag>
                        {torrent.isactive ? "active" : "inactive"}
                    </Label>
                </Table.Cell>
                <Table.Cell>  
                    
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "open")}>open</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "close")}>close</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "resume")}>resume</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "pause")}>pause</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "start")}>start</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "stop")}>stop</a> |&nbsp;
                    <a href="#" onClick={(e) => this._doRTRAction(torrent.id, "erase")}>erase</a>
                </Table.Cell>
            </Table.Row>
        ))
        return (
            <Container>
                <h3>Active (RTORRENT) Torrents</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rows}
                    </Table.Body>
                    
                </Table>
            </Container>
        );
    }

    componentDidMount(){
        this.loadRTRTorrents()
    }
}

module.exports = BrowseRTR