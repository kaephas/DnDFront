import React, {useEffect, useState} from 'react';

const NewCharacter = (props) => {
    const [charName, setName] = useState("");
    const [charClass, setClass] = useState("");
    const [charRace, setRace] = useState("");

    var classes = props.classes;
    var races = props.races;

    const nameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const raceChange = (e) => {
        e.preventDefault();
        setRace(e.target.value);
    };

    const classChange = (e) => {
        e.preventDefault();
        setClass(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('race', race);
        // formData.append('class', charClass);
        // console.log("formData: " + formData);
        // for (let prop in formData) {
        //     console.log("form prop: " + prop + " => " + formData[prop]);
        // }

        fetch('https://dnd-chars.herokuapp.com/character', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data'},
            body: JSON.stringify({
                name: charName,
                race: charRace,
                class: charClass
            })
        })
            .then(res => res.json())
            .catch(console.log)


    };

    return(
        <div className="container">
            <h1>New Character</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name"
                           placeholder="Character Name" onChange={nameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="race">Race</label>
                    <select className="form-control" id="race" onChange={raceChange}>
                        {
                            races.map((race, index) => {
                                return <option value={race}>{race}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <select className="form-control" id="class" onChange={classChange}>
                        {
                            classes.map((charClass, index) => {
                                return <option value={charClass}>{charClass}</option>
                            })
                        }
                    </select>
                </div>
                <button onClick={onSubmit}>Create Character</button>
            </form>
        </div>
    )
};

export default NewCharacter;