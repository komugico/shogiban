/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { jsx } from '@emotion/react';

/* ========================================================================== */
/* Action Types                                                               */
/* ========================================================================== */
const GRAB_KOMA = '@shogiban/grab_koma';

/* ========================================================================== */
/* Actions                                                                    */
/* ========================================================================== */
export const actGrabKoma = createAction(
    GRAB_KOMA,
    (source, index) => ({payload : { source: source, index: index } })
)

/* ========================================================================== */
/* Asynchronous Actions (API)                                                 */
/* ========================================================================== */
export const apiGetTaikyoku = (token) => {
    return (dispatch) => {
        axios.get(
            "http://localhost:8000/shogiapi/kifu",
            {
                headers: {
                    "Authorization": "JWT " + token,
                    "Content-Type": "Application/json"
                }
            }
        )
        .then(res => {
            console.dir(res);
        })
        .catch(err => {
            console.dir(err);
        });
    }
}