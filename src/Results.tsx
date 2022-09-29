import Pet from "./Pet";
import {Pet as PetType} from "./APIResponsesTypes";
import {FunctionComponent} from "react";

const Results: FunctionComponent<{pets: PetType[]}> = ({pets}) => {
    return(
        <div>
            {
                !pets.length ? (
                    <h1>No Pets Found</h1>
                ) : (
                    pets.map((pet) => (
                        <Pet
                            animal={pet.animal}
                            key={pet.id}
                            name={pet.name}
                            breed={pet.breed}
                            images={pet.images}
                            location={`${pet.city}, ${pet.state}`}
                            id={pet.id}/>
                    ))
                )
            }
        </div>
    )
}

export default Results;
