import {useState, useEffect, useContext, FunctionComponent} from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import {Animal, Pet, PetAPIResponse} from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird","cat","reptile","rabbit","dog"];

const SearchParams: FunctionComponent = () => {
  //  const location = "Nigeria";
    const [location,setLocation] = useState("")
    const [animal,setAnimal] = useState("" as Animal)
    const [breed,setBreed] = useState("")
    const [breeds] = useBreedList(animal)
    const [pets,setPets] = useState([] as Pet[]);
    const [theme,setTheme] = useContext(ThemeContext);

    useEffect(() => {
        void requestPets();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = (await res.json()) as PetAPIResponse;
        setPets(json.pets)
    }

    return (
        <div className="search-params">
            <form
            onSubmit={e => {
                e.preventDefault();
                void requestPets()
            }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value) }
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value as Animal)
                            setBreed("")
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value as Animal)
                            setBreed("")
                        }}
                    >
                        <option/>
                            {
                                ANIMALS.map((animal) => {
                                    return (
                                        <option key={animal} value={animal}>
                                            {animal}
                                        </option>
                                    );
                                    })}

                    </select>


                </label>
                <label htmlFor="bread">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e) => {
                            setBreed(e.target.value)

                        }}
                        onBlur={(e) => {
                            setBreed(e.target.value)
                        }}
                    >
                        <option/>
                        {
                            breeds.map((allBreed) => {
                                return (
                                    <option key={allBreed} value={allBreed}>
                                        {allBreed}
                                    </option>
                                );
                            })}

                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        onBlur={(e) => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}

export default SearchParams