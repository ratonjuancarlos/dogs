
import { isInMyTeam, checkLimitsDogs, checkLimitsBreed } from "helpers/localStorageHelper";



export function reducer(state, action) {
  switch (action.type) {
    case "save":
      const newState = calculateState(action.payload)
      return {...newState, message: "Added to your team"};
    default:
      throw new Error();
  }
}


export function calculateState({ breed, subBreed }) {
    let buttonMessage = "Add this dog to your team";
    let message = "";
    let isEnabled = true;
    let inMyTeam = false;
    const canAddMoreDogs = checkLimitsDogs();
    const canAddMoreBreed = checkLimitsBreed(breed);
    const canAddDog = isInMyTeam(breed, subBreed);

    switch (true) {
      case !canAddMoreDogs:
        buttonMessage = "You can not add more dogs";
        isEnabled = false;
        inMyTeam= true;
        break;
      case !canAddMoreBreed:
        buttonMessage = "You can not add more dogs of this breed";
        isEnabled = false;
        inMyTeam= true;
        break;
      case canAddDog:
        buttonMessage = "This dog is in your team";
        isEnabled = false;
        inMyTeam= true;
        break;
      default:
        buttonMessage = "Add this dog to your team";
        break;
    }
    return {
      buttonMessage,
      message,
      inMyTeam,
      isEnabled,
    };
  }
