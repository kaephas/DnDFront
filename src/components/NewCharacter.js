import React, {useState} from 'react';

const NewCharacter = (props) => {
    const [charName, setName] = useState("");
    const [charClass, setClass] = useState("Warlock");
    const [charRace, setRace] = useState("Gnome");

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

    // useEffect((props) => {
    //     fetch('https://dnd-chars.herokuapp.com/character')
    //         .then(res => res.json())
    //         .then(data => props.updateList(data))
    //         .catch(console.log);
    // }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        // props.updateList();
        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('race', race);
        // formData.append('class', charClass);
        // console.log("formData: " + formData);
        // for (let prop in formData) {
        //     console.log("form prop: " + prop + " => " + formData[prop]);
        // }
        if(charName && charName !== '') {
            fetch('https://dnd-chars.herokuapp.com/character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: charName,
                    race: charRace,
                    class: charClass
                })
            })
                .then(res => res.json())
                .catch(console.log);
        }

        fetch('https://dnd-chars.herokuapp.com/character')
            // fetch("http://localhost:5000/api/character")
            //
            .then(res => res.json())
            .then(data => props.updateList(data))
            .catch(console.log);

        let nameBox = document.getElementById('name');
        let raceBox = document.getElementById('race');
        let classBox = document.getElementById('class');

        nameBox.value = '';
        raceBox.value = 'Gnome';
        classBox.value = 'Warlock';

        // props.updateList();
    };

    return(
        <div className="container col-md-4 mx-auto">
            <h2>New Character</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name"
                           placeholder="Character Name" onChange={nameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="race">Race</label>
                    <select className="form-control" id="race" onChange={raceChange} defaultValue={"Gnome"}>
                        {
                            races.map((race, index) => {
                                return <option value={race} key={race}>{race}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <select className="form-control" id="class" onChange={classChange} defaultValue={"Warlock"}>
                        {
                            classes.map((chClass, index) => {
                                return <option value={chClass} key={chClass}>{chClass}</option>
                            })
                        }
                    </select>
                </div>
                <button className='btn btn-primary' onClick={onSubmit}>Create Character</button>
            </form>
        </div>
    )
};

export default NewCharacter;