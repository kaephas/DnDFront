import React, {useEffect, useState} from 'react';
import './App.css';
import NewCharacter from "./components/NewCharacter";

function App() {
    const [characters, setCharacters] = useState([{name: "none found"}]);
    const [classes, setClasses] = useState([]);
    const [races, setRaces] = useState([]);

    useEffect(() => {
        fetch('https://dnd-chars.herokuapp.com/character')
        // fetch("http://localhost:5000/api/character")
        //
            .then(res => res.json())
            .then(data => setCharacters(data))
            .catch(console.log);

        fetch("https://api.open5e.com/classes")
            .then(res => res.json())
            .then(data => {
                var classList = [];
                for(let prop in data['results']) {
                    console.log("apiProp: " + prop + " => " + data[prop]);
                    classList.push(data['results'][prop]['name']);
                }
                setClasses(classList);
            }).catch(console.log);

        fetch("https://api.open5e.com/races")
            .then(res => res.json())
            .then(data => {
                var raceList = [];
                for(let prop in data['results']) {
                    console.log("apiProp: " + prop + " => " + data[prop]);
                    raceList.push(data['results'][prop]['name']);
                }
                setRaces(raceList);
            }).catch(console.log);
        },
        []
    );

    for(let prop in characters) {
        console.log("prop: " + prop + ": " + characters[prop]);
    }
    console.log(characters[0]);
    // for(let prop in characters['results']) {
    //     console.log("prop1: " + prop + ": " + characters['results'][prop]['name']);
    // }
var characterList = [];
for(let prop in characters) {
    characterList.push(characters[prop]['name']);
}

  return (

    <div className="Container">
        <div className="row">
            <div className="col-sm-2">
        <h1>D&D Stuff</h1>
        <h2>{characters && characters[0]['name'] ? "Characters" : "No characters found"}</h2>
        <div>
            {characterList.map((value, index) => {
                return <div>{value}</div>
            })}
        </div>
            </div>
        {console.log("characters: " + (characters || "no characters loaded"))}
        <div className="col">
        <NewCharacter classes={classes} races={races}/>
        </div>
        </div>
    </div>
  );
}

export default App;
