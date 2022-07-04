import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const footer_style = {
  marginTop: '1em',
  textAlign: 'center',
};

const ImageCard = ({ image, deleteEvent, saveEvent }) => {
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
          {image.user?.name ? (
            <div>{`${image.user.name}`}</div>
          ) : (
            <div> No author name</div>
          )}
          {image.user?.portfolio_url ? (
            <Nav.Link
              href={image.user.portfolio_url}
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              Portfolio
            </Nav.Link>
          ) : (
            <div></div>
          )}
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
