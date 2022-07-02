import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const API_END_POINT = process.env.REACT_APP_RAND_ENDPOINT || '/new-image';
const UNSPLASH_RAND_PHOTO_URL = `${API_URL}${API_END_POINT}`;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const UNSPLASH_RAND_QUERY_STRING = `${UNSPLASH_RAND_PHOTO_URL}?query=${word}`;
  const ALL_SAVED_IMAGE_ROUTE = `${API_URL}/images`;

  const getSavedImages = async () => {
    try {
      const result = await axios.get(ALL_SAVED_IMAGE_ROUTE);
      console.log(`print our result out:`, result.data);
      let data = result.data.length > 0 ? result.data : [];
      setImages(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getSavedImages(), []);

  const handleSearchSubmit = async (e) => {
    console.log(`now searching word: ${word}`);
    e.preventDefault();

    try {
      const result = await axios.get(UNSPLASH_RAND_QUERY_STRING);
      console.log(`print our result out:`, result.data);
      let data = result.data;
      setImages([{ ...data, title: word }, ...images]);
    } catch (error) {
      console.log(`the error is ${error}`);
    }

    // set the word to empty string
    console.log('clear search form');
    setWord('');
  };

  // function to trigger delete function
  const handleDeleteImage = async (id) => {
    setImages(images.filter((image) => image.id !== id));
    const imageToBeDeleted = images.find((img) => img.id === id);
    console.log(ALL_SAVED_IMAGE_ROUTE);
    const url = `${ALL_SAVED_IMAGE_ROUTE}\\${imageToBeDeleted}`;
    const result = await axios.delete(url);
    if (result.data?.deleted_id) {
      console.log(
        `Delete operation successful!  \n${JSON.stringify(result.data)} removed`
      );
    }
  };

  // function to trigger save function
  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((img) => img.id === id);
    // add save property to image
    imageToBeSaved.saved = true;
    try {
      console.log('the id is', id);
      // post the data to route hosting img
      const result = await axios.post(ALL_SAVED_IMAGE_ROUTE, imageToBeSaved);
      if (result.data?.inserted_id) {
        // Add saved field to all local image affected in state
        images.map((image) =>
          image.id === id ? { ...image, saved: true } : image
        );
      }
      console.log('operation successful', result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(`word is now: ${word}`);
  // images.forEach((element) => {
  //   console.log(`${element.title}: ${element.description}`);
  // });
  // console.log(UNSPLASH_RAND_PHOTO_URL);

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} queryEvent={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, index) => (
              <Col key={index} className="pb-4">
                <ImageCard
                  image={image}
                  deleteEvent={handleDeleteImage}
                  saveEvent={handleSaveImage}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
