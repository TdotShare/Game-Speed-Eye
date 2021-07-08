import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux'

import GameScreen from './../components/screen/game/index'
import ScoreListScreen from './../components/screen/score/index'

function Index(props) {
    return (

        <Router  >
            <Switch>
                <Route exact path={`/`} component={() => <GameScreen />} />
                <Route exact path={`/scoreList`} component={() => <ScoreListScreen />} />
                <Route path={`*`} component={() => <p>404 ERROR</p>} />
            </Switch>
        </Router>

    )
}


export default connect(null, null)(Index)