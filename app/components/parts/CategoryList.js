import React from 'react'
//import { withRouter } from 'react-router-dom'
import CategoryLink from './CategoryLink'
import WebAPI from '../../util/WebAPI'
import { withRouter } from 'react-router';
import { Container, Dropdown, Grid, Input } from 'semantic-ui-react'


class CategoryList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            searchTerm: ""
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    }

    componentDidMount(){
        WebAPI.getCategories()
            .then((result) =>{
                console.log(result);
                this.setState({
                    categories: result.data
                });
            })
            .catch((error)=>{
                console.log(error)
            });        
    }

    handleSearchFieldChange(event){
        this.setState({searchTerm: event.target.value}, () =>{
            //this.props.onSearch(this.state.searchTerm);
        });
    }

    handleSearchClick(event){
        if (this.state.searchTerm.length < 3){
            return;
        } else {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    render(){

        let categoriesOptions = this.state.categories.map((v,i) => ({text: v.name, value: v.id}));

        return (
                <Container>
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column width={3}>
                                <Dropdown options={categoriesOptions} 
                                    placeholder="Select category"
                                    onChange={(event, data)=>{
                                        this.props.onCategoryChange(data.value);
                                    }}/>
                            </Grid.Column>
                            <Grid.Column width={8}></Grid.Column>
                            <Grid.Column width={5}>
                                <Input 
                                    size="small"
                                    action='Search' 
                                    placeholder='Search...'
                                    value={this.state.searchTerm} 
                                    onChange={this.handleSearchFieldChange} 
                                    onKeyPress={() => {
                                        console.log("on key press!");
                                    }} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
        )
    }
}


module.exports = withRouter(CategoryList)