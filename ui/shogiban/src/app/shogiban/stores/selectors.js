/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import * as C from './constants';

import { createSelector } from '@reduxjs/toolkit';

export const getTurnCount = state => state.shogiban.turn_count;
export const getNextPlayer = state => state.shogiban.next_player;
export const getBoard = state => state.shogiban.board;
export const getMochigoma = state => state.shogiban.mochigoma;
export const getGrabbedKoma = state => state.shogiban.grabbed_koma;
export const getLegalMoves = state => state.shogiban.legal_moves;
export const getView = state => state.shogiban.view;
export const getKifu = state => state.shogiban.kifu;

export const selectMochigomaSente = createSelector(
    getMochigoma,
    (mochigoma) => mochigoma[0]
);

export const selectMochigomaGote = createSelector(
    getMochigoma,
    (mochigoma) => mochigoma[1]
);

export const selectShogiban = createSelector(
    getBoard,
    getGrabbedKoma,
    getLegalMoves,
    (board, grabbed_koma, leagl_moves) => (
        board.map((row, dan) => {
            return row.map((col, suji) => {
                let koma = C.KOMA_NONE;
                let owner = C.PLAYER_NONE;
                let grabbed = false;
                let legal = false;

                /* 駒 */
                koma = Math.abs(board[dan][suji]);

                /* 持ち主 */
                if (board[dan][suji] >= C.PLAYER_SENTE) {
                    owner = C.PLAYER_SENTE;
                }
                else if (board[dan][suji] <= C.PLAYER_GOTE) {
                    owner = C.PLAYER_GOTE;
                }
                else {
                    owner = C.PLAYER_NONE;
                }

                /* 選択中 */
                if (grabbed_koma.source === C.SRC_BOARD) {
                    if ((dan === grabbed_koma.index.dan) && (suji === grabbed_koma.index.suji)) {
                        grabbed = true;
                    }
                }

                /* 合法手 */
                if (leagl_moves[dan][suji] === C.MOVE_TRUE) {
                    legal = true;
                }
                else {
                    legal = false;
                }

                return {
                    koma: koma,
                    owner: owner,
                    grabbed: grabbed,
                    legal: legal
                }
            });
        })
    )
);