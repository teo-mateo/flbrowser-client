import React from 'react'
import CategoryList from './CategoryList'
import WebAPI from '../../util/WebAPI'
import { Table } from 'reactstrap'

class BrowseFL extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchTerm: "",
            category: 0,
            page: 0,
            torrents: [], 
            rtorrents: []
        }

        this.loadTorrents = this.loadTorrents.bind(this);
        this.loadFLTorrents = this.loadFLTorrents.bind(this);
        this.loadRTRTorrents = this.loadRTRTorrents.bind(this);
        this.onCategoryChange =  this.onCategoryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(searchTerm){
        this.setState({
            searchTerm: searchTerm, 
            page: 0}, this.loadTorrents);
    }

    onCategoryChange(category){
        this.setState({
            searchTerm: "", 
            category: category,
            page: 0,
        }, this.loadTorrents)
    }

    componentDidMount(){
        this.loadTorrents();
    }

    loadTorrents(){
        this.loadFLTorrents();
        this.loadRTRTorrents();
    }

    compo

    loadFLTorrents(){

        let searchTerm = this.state.searchTerm;
        let category = this.state.category;
        let page = this.state.page;

        if (searchTerm === ""){
            WebAPI.getFlTorrents(category, page)
            .then((response) => {
                console.log('--getFlTorrents.then--');
                console.log(response);
                this.setState({
                    torrents:response.data, 
                    category: category,
                    page: page,
                });
                //console.log(this.state);
            })
            .catch ((error) => {
                console.log('--getFlTorrents.error--');
                console.log(error);
            });
        } else {
            WebAPI.searchFlTorrents(searchTerm, category, page)
            .then((response) => {
                console.log('--searchFlTorrents.then--');
                console.log(response);
                this.setState({
                    torrents:response.data, 
                    category: category,
                    page: page,
                });
                //console.log(this.state);
            })
            .catch ((error) => {
                console.log('--searchFlTorrents.error--');
                console.log(error);
            });
        }

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

        return(
            <div className="marg5px">
                <CategoryList 
                    onCategoryChange={this.onCategoryChange} 
                    onSearch={this.onSearch}
                    searchTerm={this.state.searchTerm}/>
                <Table responsive dark>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Downloaded</th>
                            <th>Seeds/Leechs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.torrents.map((v,i) => 
                             (<tr key={i}>
                                <th scope="row">
                                    {i+1}
                                </th>
                                <td> 
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        var id = e.target.innerText;
                                        WebAPI.downloadTorrent(id);
                                        alert("Torrent " + id + " was sent for download.");
                                    }}> {v.id} </a> </td>
                                <td> <a href={"https://filelist.ro/details.php?id=" + v.id} target="_blank">{v.name}</a></td>
                                <td> {v.size}</td>
                                <td> {v.timesdownloaded}</td>
                                <td> L/S {v.leechers} / {v.seeders}</td>
                            </tr>)
                        )}
                    </tbody>
                </Table>
            </div>
            

        );
    }

}

module.exports = BrowseFL