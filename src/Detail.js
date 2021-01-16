import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import ls from "local-storage";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

const Breed = () => {
  const { get, response, loading, error } = useFetch(
    "https://dog.ceo/api/breed"
  );
  const [number, setNumber] = useState(3);
  const { dog } = useParams();
  const [breed, subBreed] = dog.split("-");
  const url = subBreed ? `${breed}/${subBreed}` : `${breed}`;
  const [images, setImages] = useState(() => get(`/${url}/images/random/3`));


  useEffect(() => {
    loadInitialImages();
    // eslint-disable-next-line
  }, []);

  async function loadInitialImages() {
    const initialImages = await get(`/${url}/images/random/${number}`);
    if (response.ok) setImages(initialImages.message);
  }

  async function onChangeNumber(e) {
    const newNumber = e.target.value;
    setNumber(newNumber);
    const newImages = await get(`/${url}/images/random/${newNumber}`);
    if (response.ok) setImages(newImages.message);
  }

  const saveDog = (breed, subBreed) => {
    if (!ls("dogs")) {
      ls("dogs", []);
    }
    let myDogs = ls("dogs");
    myDogs = [
      ...myDogs,
      subBreed
        ? { id: `${breed}${subBreed}`, breed, subBreed, image: images[0] }
        : { id: breed, breed, image: images[0] },
    ];
    ls("dogs", uniqWith(myDogs, isEqual));
  };

  return (
    <>
      <h2 data-test="detail-title">
        {breed}-{subBreed}
      </h2>
      {error && "Error!"}
      {loading && "Loading..."}

      {images.length > 0 && (
        <div>
          <label for="pictures">Set how many pictures</label>
          <input
            type="number"
            name="pictures"
            min="1"
            value={number}
            onChange={onChangeNumber}
          />
          <div>
            <button
            data-test="save-dog"
              disabled={!images.length > 0}
              onClick={() => saveDog(breed, subBreed)}
            >
              Save to my team
            </button>
          </div>
          {images.map((image) => (
            <img src={`${image}`} alt="pipi" />
          ))}
        </div>
      )}
    </>
  );
};


export default Breed;
