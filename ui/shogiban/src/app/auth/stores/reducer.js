/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import { createReducer } from '@reduxjs/toolkit';
import * as A from './actions';

/* ========================================================================== */
/* Actions                                                                    */
/* ========================================================================== */

/* ========================================================================== */
/* Reducer                                                                    */
/* ========================================================================== */
const initial_state = {
    username: "",
    jwt_token: ""
};

const reducer = createReducer(initial_state, (builder) => {
    builder
        .addCase(A.actSignIn, (state, action) => {
            state.username = action.payload.username;
            state.jwt_token = action.payload.jwt_token;
        })
});


export default reducer;