import React from 'react';
import './App.css';
import NewCharacter from "./components/NewCharacter";
import CharactersTable from "./components/CharactersTable";
import Footer from "./components/Footer";

class App extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

        fetch('https://dnd-chars.herokuapp.com/character')
            // fetch("http://localhost:5000/api/character")

            .then(res => res.json()).then(data => {
            // setInit(data);
            this.setState( {
                "characters": data
            });
        }).catch(console.log);

        fetch("https://api.open5e.com/classes")
            .then(res => res.json())
            .then(data => {
                var classList = [];
                for (let prop in data['results']) {
                    classList.push(data['results'][prop]['name']);
                }
                this.setState( {
                    "classes": classList
                });
            }).catch(console.log);

        fetch("https://api.open5e.com/races")
            .then(res => res.json())
            .then(data => {
                var raceList = [];
                for (let prop in data['results']) {
                    raceList.push(data['results'][prop]['name']);
                }
                this.setState({
                    "races": raceList
                });
            }).catch(console.log);

        this.setState({
            updateList: () => {
                fetch('https://dnd-chars.herokuapp.com/character')
                    // fetch("http://localhost:5000/api/character")

                    .then(res => res.json()).then(data => {
                    // setInit(data);
                    this.setState( {
                        "characters": data
                    });
                    // setCharacters(data);
                }).catch(console.log);
            }
        })
    }

    render() {

        if(this.state && this.state.hasOwnProperty("characters")) {
            var characters = this.state.characters;
        }
        if(this.state && this.state.hasOwnProperty("classes")) {
            var classes = this.state.classes;
        }
        if(this.state && this.state.hasOwnProperty("races")) {
            var races = this.state.races;
        }
        if(this.state && this.state.hasOwnProperty("updateList")) {
            var updateList = this.state.updateList;
        }

        return (
            <div>
                <div className="main">
                <h1 className={"text-center"}>D&D Stuff</h1>
                <div className="row">
                    <div className={"col"}>
                        {characters && updateList
                            ? <CharactersTable characterList={characters} updateList={updateList}/>
                            : null}
                    </div>
                </div>
                <hr/>
                <div className={"row"}>
                    {/*{console.log("characters: " + (characters || "no characters loaded"))}*/}
                    <div className="col">
                        {classes && races && updateList
                            ? <NewCharacter classes={classes} races={races} updateList={updateList}/>
                            : null }
                    </div>
                </div>
                {/*<div className={"container"}>*/}
                {/*    <div style={*/}
                {/*        {*/}
                {/*            'display': 'block',*/}
                {/*            'padding': '20px',*/}
                {/*            'height': '60px',*/}
                {/*            'width': '100%'*/}
                {/*        }*/}
                {/*    } />*/}
                {/*    <div className={'fixed-bottom'}>*/}
                {/*        footer*/}
                {/*    </div>*/}
                {/*</div>*/}

                </div>
                <Footer />
            </div>

        );
    }
}

export default App;
