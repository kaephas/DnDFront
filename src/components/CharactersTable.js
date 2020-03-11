import React, {useEffect} from 'react';
import './table.css';

const CharactersTable = (props) => {
    var characterList = props.characterList;

    useEffect(() => {
        props.updateList();
    }, []);

    const rowClick = (e) => {
        let cell = e.target.parentNode;
        let row = cell.parentNode;
        let id = row.firstChild.textContent;

        // delete
        fetch(`https://dnd-chars.herokuapp.com/character/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .catch(console.log);

        fetch('https://dnd-chars.herokuapp.com/character')
            // fetch("http://localhost:5000/api/character")
            //
            .then(res => res.json())
            .then(data => props.updateList(data))
            .catch(console.log);

        // props.updateList();
    };

    return(
        <div className={"container"}>
            {/*<h2>{characterList && characterList[0]['name'] ? "Characters" : "No characters found"}</h2>*/}
            <h2>Characters</h2>
            <table className={"table table-striped table-hover table-sm"}>
                <thead className={"thead-dark"}>
                <tr>
                    <th scope={"col"}>Name</th>
                    <th scope={"col"}>Class</th>
                    <th scope={"col"}>Race</th>
                    <th className="text-center" scope={"col"}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {characterList.map((value, index) => {
                    // if(value.name && value.class && value.race) {
                        return <tr key={index}>
                            <td className={"d-none"}>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{value.class}</td>
                            <td>{value.race}</td>
                            <td className="text-center">
                                <button className="delBtn" style={{'background': 'url("stop.svg")'}} onClick={rowClick}/>
                            </td>
                        </tr>
                    // }

                })}


                </tbody>
            </table>
        </div>
    );
};

export default CharactersTable;