import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const footer_style = {
  marginTop: '1em',
  textAlign: 'center',
};

const ImageCard = ({ image, deleteEvent, saveEvent }) => {
  const author_name = image.user?.name || 'no author name';
  const proto_url = image.user?.portfolio_url;
  return (
    <Card style={{ width: '18rem' }}>
      {image.urls.small && <Card.Img variant="top" src={image.urls.small} />}
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="secondary" onClick={() => deleteEvent(image.id)}>
          Delete
        </Button>{' '}
        <Card.Footer style={footer_style} className="text-muted">
          {proto_url && (
            <Nav.Link
              href={image.user.portfolio_url}
              target="_blank"
              rel="noreferrer"
            >
              {author_name}
            </Nav.Link>
          )}
          {!proto_url && author_name}
        </Card.Footer>
        {!image.saved && (
          <Button variant="primary" onClick={() => saveEvent(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
