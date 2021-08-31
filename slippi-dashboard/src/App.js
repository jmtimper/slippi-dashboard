import React, {useState} from "react";
import Header from "./components/header/header";
import Home from "./views/home/home";
import {Route, BrowserRouter as Router} from "react-router-dom";
import Seeding from "./views/seeding/metrics";

const App = () => {
    const [files, setFiles] = useState(['test'])

    const smashgg = require('smashgg.js');

    const {Event} = smashgg;

    smashgg.initialize('f47d6474126d27ddd3b1046bd3773dc1');

    (async function(){
        let tournamentSlug = 'function-1-recursion-regional';
        let eventSlug = 'melee-singles';
        let meleeAtFunction = await Event.get(tournamentSlug, eventSlug);

        let sets = await meleeAtFunction.getSets();
        let phaseGroups = await meleeAtFunction.getPhaseGroups();

        console.log('Function 1 had %s sets played in %s phase groups',
            sets.length, phaseGroups.length);

        console.log('Set Results:')
        for(var i in sets){
            console.log(`${String(sets[i].getFullRoundText()).magenta}: ${String(sets[i].getDisplayScore()).green}`);
        }

        return true; // exit async
    })()

    return (
        <div>
            <Header/>
            <Router>
                <div className="content-wrapper">
                    <Route exact path="/" render={() => (<Home files={files}/>)}/>
                    <Route path="/home" render={() => (<Home files={files}/>)}/>
                    <Route path="/seeding" component={Seeding}/>
                </div>
            </Router>
        </div>
    )
}

export default App