import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import Gallery from "components/Gallery";
import HeaderDetail from "components/HeaderDetail";

const Detail = () => {
  const { get, response, loading, error } = useFetch(
    "https://dog.ceo/api/breed"
  );
  const { dog } = useParams();
  const [breed, subBreed] = dog.split("-");
  const url = subBreed ? `${breed}/${subBreed}` : `${breed}`;
  const [images, setImages] = useState(() => get(`/${url}/images/random/3`));

  useEffect(() => {
    loadInitialImages();
    // eslint-disable-next-line
  }, []);

  async function loadInitialImages() {
    const initialImages = await get(`/${url}/images/random/3`);
    if (response.ok) setImages(initialImages.message);
  }

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      {images.length > 0 && (
        <>
          <HeaderDetail {...{ breed, subBreed, image: images[0] }} />
          <Gallery {...{ images, breed, subBreed }} />
        </>
      )}
    </>
  );
};

export default Detail;
