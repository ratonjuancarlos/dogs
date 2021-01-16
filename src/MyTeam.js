import React, {useState} from "react";
import PropTypes from "prop-types";
import ls from "local-storage";
import groupBy from "lodash/groupBy";

const MyTeam = (props) => {
const [myDogs, setMyDogs] = useState(ls("dogs"))
  const removeDog = (id) => {
      const updatedDogs = myDogs.filter(dog=>dog.id!==id);
      ls("dogs", updatedDogs)
      setMyDogs(updatedDogs)
  };
  const groupedDogs = groupBy(myDogs, 'breed')
  const dogsKeys = Object.entries(groupedDogs)

  return (
    <div>
        <h1>My Team</h1>
        {
            dogsKeys.map(([breed, subBreeds])=><div>
                <h3>{breed}</h3>
                { subBreeds.map(sb=><div data-test="dog-in-team">
                    <h4>{sb.subBreed}</h4>
                    <img src={`${sb.image}`}/>
                    <button  data-test="remove-dog" onClick={()=>removeDog(sb.id)}>Remove</button>
                </div>)}
            </div>)
        }
      {/* {myDogs ? <table>
        <tbody>
          {myDogs.map((dog) => (
            <tr>
              <td>{dog.breed}</td>
              <td>{dog.subBreed}</td>
              <td><img src={`${dog.image}`}/></td>
              <td><button onClick={()=>removeDog(dog.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table> : 'Sin perros'} */}
    </div>
  );
};

MyTeam.propTypes = {};

export default MyTeam;
