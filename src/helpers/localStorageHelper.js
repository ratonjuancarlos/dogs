import ls from "local-storage";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";


export const checkLimitsBreed = (breed) => {
  const myDogs = ls("dogs");
  return myDogs.filter((dog) => dog.breed === breed).length < 3
}
export const checkLimitsDogs = () => {
  const myDogs = ls("dogs");
  return myDogs.length < 10
}

export const saveDog = (breed, subBreed, image) => {

    const currentDogs = ls("dogs");
    const subBreedObj = subBreed
      ? { id: `${breed}${subBreed}`, breed, subBreed, image }
      : { id: breed, breed, image };
    const updatedDogs = [...currentDogs, subBreedObj];
    ls("dogs", uniqWith(updatedDogs, isEqual));
    return true

};

export const removeDog = (id) => {
  const myDogs = ls("dogs");
  const updatedDogs = myDogs.filter((dog) => dog.id !== id);
  ls("dogs", updatedDogs);
  return updatedDogs;
};

export const isInMyTeam = (breed, sb='') => {
  const currentDogs = ls("dogs");
  const id = `${breed}${sb}`;
  const isInMyTeam = currentDogs.filter((dog) => dog.id === id).length > 0;
  return isInMyTeam;
};
