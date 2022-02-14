/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

/* ========================================================================== */
/* Action Types                                                               */
/* ========================================================================== */
const GRAB_KOMA = 'shogiban/grab_koma';

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