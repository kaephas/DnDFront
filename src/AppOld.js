import React, {useEffect, useState} from 'react';
import './App.css';
import NewCharacter from "./components/NewCharacter";
import CharactersTable from "./components/CharactersTable";

function App() {
    const [characters, setCharacters] = useState([{name: "none found"}]);
    // const [classes, setClasses] = useState([]);
    // const [races, setRaces] = useState([]);
    const [initialList, setInit] = useState([{name: "none found"}]);

    var classes = {};
    var races = {};

    useEffect(() => {
        // fetch('https://dnd-chars.herokuapp.com/character')
        //     // fetch("http://localhost:5000/api/character")
        //     //
        //     .then(res => res.json())
        //     .then(data => setCharacters(data))
        //     .catch(console.log);

        fetch('https://dnd-chars.herokuapp.com/character')
            // fetch("http://localhost:5000/api/character")
            //
            .then(res => res.json())
            .then(data => {
                setInit(data);
                // setCharacters(data);
            })
            .catch(console.log);

        // setCharacters(initialList);

        fetch("https://api.open5e.com/classes")
            .then(res => res.json())
            .then(data => {
                var classList = [];
                for(let prop in data['results']) {
                    // console.log("apiProp: " + prop + " => " + data[prop]);
                    classList.push(data['results'][prop]['name']);
                }
                classes = classList;
            }).catch(console.log);

        fetch("https://api.open5e.com/races")
            .then(res => res.json())
            .then(data => {
                var raceList = [];
                for(let prop in data['results']) {
                    // console.log("apiProp: " + prop + " => " + data[prop]);
                    raceList.push(data['results'][prop]['name']);
                }
                races = raceList;
            }).catch(console.log);
    },[]);

    // for(let prop in characters) {
    //     console.log("prop: " + prop + ": " + characters[prop]);
    // }
    // console.log(characters[0]);
    // for(let prop in characters['results']) {
    //     console.log("prop1: " + prop + ": " + characters['results'][prop]['name']);
    // }
    // var characterList = [];
    // for(let prop in characters) {
    //     characterList.push(characters[prop]['name']);
    // }

    const updateList = (data) => {
        setCharacters(data);
        // fetch('https://dnd-chars.herokuapp.com/character')
        //     // fetch("http://localhost:5000/api/character")
        //     //
        //     .then(res => res.json())
        //     .then(data => setCharacters(data))
        //     .catch(console.log);
    };

    return (
        <div className="Container">
            <h1 className={"text-center"}>D&D Stuff</h1>
            <div className="row">
                {/*<div className="col-sm-2">*/}
                {/*    <h1>D&D Stuff</h1>*/}
                {/*    <h2>{characters && characters[0]['name'] ? "Characters" : "No characters found"}</h2>*/}
                {/*    <div>*/}
                {/*        {characterList.map((value, index) => {*/}
                {/*            return <div key={index}>{value}</div>*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"col"}>
                    <CharactersTable characterList={characters ? characters : initialList} updateList={updateList}/>
                </div>
            </div>
            <hr/>
            <div className={"row"}>
                {/*{console.log("characters: " + (characters || "no characters loaded"))}*/}
                <div className="col">
                    <NewCharacter classes={classes} races={races} updateList={updateList}/>
                </div>
            </div>
            <div className={"footer"}>Icons made by <a href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez">Alfredo Hernandez</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
}

export default App;
