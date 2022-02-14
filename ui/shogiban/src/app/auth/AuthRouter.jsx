import React from 'react';

import { Route } from "react-router-dom";
import { Provider } from 'react-redux';

import store from '../store';
import SignInContainer from './containers/SigninContainer';

const AuthRouter = () => {
    return (
        <>
            <Route exact path="/auth/signin">
                <Provider store={store}>
                    <SignInContainer />
                </Provider>
            </Route>
        </>
    )
}

export default AuthRouter;