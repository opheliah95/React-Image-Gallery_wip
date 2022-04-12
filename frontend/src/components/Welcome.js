import { Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <div className="container-fluid text-sm-center p-5 bg-light">
      <h1>Image Gallery</h1>
      <p>
        This is a simple application that retrieves photos using Unsplash API.
        In order to start, enter any items in the search input field
      </p>
      <p>
        <Button bsStyle="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </div>
  );
};

export default Welcome;
