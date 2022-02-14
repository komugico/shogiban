import React from 'react';
import { Route } from "react-router-dom";
import { Provider } from 'react-redux';

import ShogibanStore from './stores/store'
import ShogibanContainer from './containers/ShogibanContainer';

class ShogibanRouter extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/shogiban">
                    <Provider store={ShogibanStore} >
                        <ShogibanContainer />
                    </Provider>
                </Route>
            </div>
        )
    }
}

export default ShogibanRouter;