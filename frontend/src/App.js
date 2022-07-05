import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';
import Loader from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const API_END_POINT = process.env.REACT_APP_RAND_ENDPOINT || '/new-image';
const UNSPLASH_RAND_PHOTO_URL = `${API_URL}${API_END_POINT}`;

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setSpinner] = useState(true);

  const UNSPLASH_RAND_QUERY_STRING = `${UNSPLASH_RAND_PHOTO_URL}?query=${word}`;
  const ALL_SAVED_IMAGE_ROUTE = `${API_URL}/images`;

  const getSavedImages = async () => {
    try {
      toast.success('Saved all downloaded images');
      const result = await axios.get(ALL_SAVED_IMAGE_ROUTE);
      setSpinner(false);
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
      toast.success(`Result for ${word} has been found`);
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
    const config = {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    };
    // post the data to route hosting img
    try {
      const result = await axios.delete(
        `${ALL_SAVED_IMAGE_ROUTE}/${id}`,
        config
      );
      if (result.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
        const del_img = images.find((image) => image.id === id);
        console.log(
          `Delete operation successful!  \n${JSON.stringify(
            result.data
          )} removed`
        );
        toast.warn(`Image ${del_img.title} has been deleted`);
      }
    } catch (err) {
      console.log(`during deletion, we encountered ${err}`);
      toast.error(`An error occurred: ${err.message}`);
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
        toast.info(`Image ${imageToBeSaved.title} has been saved successfully`);
      }
      console.log('operation successful', result.data);
    } catch (err) {
      console.log(err);
      toast.error(`An error occurred: ${err.message}`);
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
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Search
            word={word}
            setWord={setWord}
            queryEvent={handleSearchSubmit}
          />
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
      )}
    </div>
  );
};

export default App;
