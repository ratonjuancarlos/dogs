import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import Gallery from "components/Gallery";
import HeaderDetail from "components/HeaderDetail";
import Actions from "components/Actions";

const Detail = () => {
  const { get, response, loading, error } = useFetch(
    "https://dog.ceo/api/breed"
  );
  const { dog } = useParams();
  const [breed, subBreed] = dog.split("-");
  const url = subBreed ? `${breed}/${subBreed}` : `${breed}`;
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadInitialImages();
    // eslint-disable-next-line
  }, []);

  async function loadInitialImages() {
    const initialImages = await get(`/${url}/images/random/7`);
    if (response.ok) setImages(initialImages.message);
  }

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      {images.length > 0 && (
        <>
          <HeaderDetail {...{ breed, subBreed }} />
          <Gallery {...{ images, breed, subBreed, dog }} />
          <Actions {...{ breed, subBreed, image: images[0] }}/>
        </>
      )}
    </>
  );
};

export default Detail;
