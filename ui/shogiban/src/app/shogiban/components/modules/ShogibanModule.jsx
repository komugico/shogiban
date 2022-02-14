import React from 'react';
import { connect, useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import * as S from '../../stores/selectors';
import * as C from '../../stores/constants';
import BoardBlock from '../blocks/BoardBlock';
import KomadaiBlock from '../blocks/KomadaiBlock';

const ShogibanModule = () => {
    const mochigoma_sente = useSelector(S.selectMochigomaSente)
    const mochigoma_gote = useSelector(S.selectMochigomaGote)

    return (
        <Grid container m={2}>
            <Grid item xs={2}>
                <KomadaiBlock mochigoma={mochigoma_gote} player={C.PLAYER_GOTE} />
            </Grid>
            <Grid item xs={8}>
                <BoardBlock />
            </Grid>
            <Grid item xs={2}>
                <KomadaiBlock mochigoma={mochigoma_sente} player={C.PLAYER_SENTE} />
            </Grid>
        </Grid>
    )
}

export default ShogibanModule;