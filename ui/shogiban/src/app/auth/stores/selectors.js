/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import { createSelector } from "@reduxjs/toolkit";

export const getUsername = state => state.auth.username;
export const getJwtToken = state => state.auth.jwt_token;