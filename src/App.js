import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [characters, setCharacters] = useState({});
    var classes = [];
    var races = [];

    useEffect(() => {
        fetch('https://dnd-char.herokuapp.com/character')
            .then(res => res.json())
            .then(data => setCharacters(data))
            .catch(console.log);
        } , []
    );

    for(let prop in characters) {
        console.log("prop: " + prop + ": " + characters[prop]);
    }


  return (
    <div className="Container">
        {characters.name ? "characters found" : "no characters found"}
        {console.log("characters: " + (characters || "no characters loaded"))}
    </div>
  );
}

export default App;
