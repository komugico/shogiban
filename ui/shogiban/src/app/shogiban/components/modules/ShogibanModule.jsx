import React from 'react';
import { connect, useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as S from '../../stores/selectors';
import * as C from '../../stores/constants';
import * as actions from '../../stores/actions';
import BoardBlock from '../blocks/BoardBlock';
import KomadaiBlock from '../blocks/KomadaiBlock';

const ShogibanModule = () => {
    const mochigoma_sente = useSelector(S.selectMochigomaSente)
    const mochigoma_gote = useSelector(S.selectMochigomaGote)

    return (
        <Grid container>
            <Grid item xs={2}>
                {KomadaiBlock(mochigoma_gote, C.PLAYER_GOTE)}
            </Grid>
            <Grid item xs={8}>
                {BoardBlock()}
            </Grid>
            <Grid item xs={2}>
                {KomadaiBlock(mochigoma_sente, C.PLAYER_SENTE)}
            </Grid>
        </Grid>
    )
}

export default ShogibanModule;