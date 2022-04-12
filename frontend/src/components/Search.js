import React from "react";
import { Container, Row, Col } from "react-bootstrap";
class Search extends React.Component {
    render() {
        return (
        <Container>
            <Row>
                <Col>Search</Col>
                <Col>This is a search box</Col>
            </Row>
        </Container>);
    }
};

export default Search;