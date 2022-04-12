import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import '../css/index.css';
class Search extends React.Component {
  render() {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
          <Form onSubmit={this.props.queryEvent}>
            <Row>
              <Col xs={9} md={9} lg={9}>
                <Form.Control 
                    type="text"
                    value={this.props.word}
                    onChange={(e)=>this.props.setWord(e.target.value)}
                    placeholder="Search for new image" 
                    />
              </Col>
              <Col xs={3} md={3}>
                <Button type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
