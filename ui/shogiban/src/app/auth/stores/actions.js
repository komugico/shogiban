/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

/* ========================================================================== */
/* Action Types                                                               */
/* ========================================================================== */
const SIGN_IN = '@auth/sign_in';

/* ========================================================================== */
/* Actions                                                                    */
/* ========================================================================== */
export const actSignIn = createAction(
    SIGN_IN,
    (username, jwt_token) => ({ payload : { username: username, jwt_token: jwt_token } })
)

/* ========================================================================== */
/* Asynchronous Actions (API)                                                 */
/* ========================================================================== */
const ROOT_API_URL = "http://localhost:8000/";

export const apiSignIn = (username, password, url) => {
    return (dispatch) => {
        axios
        .post(ROOT_API_URL + "jwt/token/obtain", {
            username: username,
            password: password
        })
        .then(res => {
            dispatch(actSignIn(
                username,
                res.data.token
            ));
            window.location.href = url;
        })
        .catch(err => {
            alert(err.response.request.responseText);
            console.dir(err)
        });
    }
}