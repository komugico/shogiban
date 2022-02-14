import React from 'react';
import { Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../store';
import ShogibanContainer from './containers/ShogibanContainer';

class ShogibanRouter extends React.Component {
    render() {
        return (
            <>
                <Route exact path="/shogiban/taikyoku">
                    <Provider store={store}>
                        <ShogibanContainer />
                    </Provider>
                </Route>
            </>
        )
    }
}

export default ShogibanRouter;