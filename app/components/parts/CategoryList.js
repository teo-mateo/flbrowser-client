import React from 'react'
//import { withRouter } from 'react-router-dom'
import CategoryLink from './CategoryLink'
import WebAPI from '../../util/WebAPI'
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';

class CategoryList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            searchTerm: ""
        };

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

        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    }

    onSearchFieldChange(event){
        this.setState({searchTerm: event.target.value});
    }

    onSearchClick(event){
        if (this.state.searchTerm.length < 3){
            return;
        } else {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    render(){
        return (
            <Container >
                <Row className="margin5px">
                    <Col>
                        <ButtonGroup>
                        {this.state.categories.map((v,i)=>(
                                <Button key={v.id} 
                                    onClick={(event) =>{
                                        this.props.onCategoryChange(v.id);
                                        //this.props.history.push( '/browse/'+v.id + '/0')
                                }}>{v.name}</Button>
                            ))}
                    </ButtonGroup>
                    </Col>
                    <Col>
                        <p>Pagination...</p>
                    </Col>                    
                    <Col>
                        <InputGroup>
                            <Input value={this.props.searchTerm} onChange={this.onSearchFieldChange}/>
                            <InputGroupAddon addonType="append">
                                <Button onClick={this.onSearchClick}>Search</Button>
                            </InputGroupAddon>
                        </InputGroup>                    
                    </Col>

                </Row>
            </Container>
        )
    }
}


module.exports = withRouter(CategoryList)