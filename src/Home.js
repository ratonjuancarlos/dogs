import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import { Link } from "react-router-dom";
import toPairs from "lodash/toPairs";
import groupBy from "lodash/groupBy";

var miMapa = new Map();

const Home = (props) => {
  const [breeds, setBreeds] = useState();
  const [filteredBreeds, setFilteredBreeds] = useState();
  const { loading, error, data = [] } = useFetch(
    "https://dog.ceo/api/breeds/list/all",
    []
  );

  useEffect(() => {
    let breeds = data.message ? toPairs(data.message) : false;

    if (breeds) {
      breeds.map(([breed, subBreed]) => {
        subBreed.length > 0
          ? subBreed.map((sb) => {
              miMapa.set(`${breed}-${sb}`, { breed, sb });
            })
          : miMapa.set(`${breed}`, { breed });
      });
    }

    setBreeds(breeds);
    setFilteredBreeds(breeds);
  }, [data]);

  const filterDogs = (e) => {
    const search = e.target.value;
    if (search !== "") {
      const filteredMap = [];
      for (var [clave, valor] of miMapa.entries()) {
        if (clave.includes(search)) {
          filteredMap.push(valor);
        }
      }
      const groupFiltered = groupBy(filteredMap, "breed");
      const arranged = {};
      for (const property in groupFiltered) {
        arranged[property] = groupFiltered[property]
          .reduce((acc, curr) => acc.concat([curr.sb]), [])
          .filter((sb) => sb);
      }
      const pairedGroup = toPairs(arranged);
      setFilteredBreeds(pairedGroup);
    } else {
      setFilteredBreeds(breeds);
    }
  };

  const getTitle = (subbreed, breed) =>
    subbreed.length > 0 ? breed : <Link to={`/detail/${breed}`} data-test="dog-link" data-dog={`${breed}`} >{breed}</Link>;

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      <div>
        <input type="text" onChange={filterDogs} />
        <ul>
          {filteredBreeds &&
            filteredBreeds.map(([breed, subbreed]) => (
              <li key={breed}>
                {getTitle(subbreed, breed)}
                {subbreed.length > 0 &&
                  subbreed.map((sb) => (
                    <ul>
                      <li>
                        <Link to={`/detail/${breed}-${sb}`} data-dog={`${breed}-${sb}`} data-test="dog-link">{sb}</Link>
                      </li>
                    </ul>
                  ))}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
