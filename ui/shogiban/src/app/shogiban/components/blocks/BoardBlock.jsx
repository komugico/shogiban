import { useStore, useDispatch, useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as A from '../../stores/actions';
import * as C from '../../stores/constants';
import * as S from '../../stores/selectors';
import * as actions from '../../stores/actions';
import KomaAtom from '../atoms/KomaAtom';

const cell_style = {
    border: 1,
    borderColor: 'text.primary',
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    zIndex: 1
}

const BoardColumn = (info, view, dan, suji) => {
    const store = useStore();

    let grid_style = { };
    let box_style = { ...cell_style };
    let callback = null;

    let first_cell = ( view === C.PLAYER_SENTE ) ? 0 : 8;
    if ( dan != first_cell ) {
        box_style = { ...box_style, borderTop: 0 };
    }
    if ( suji != first_cell ) {
        box_style = { ...box_style, borderLeft: 0 };
    }

    if ( info.grabbed === true ) {
        grid_style = { ...grid_style, backgroundColor: "#DDDDDD" };
        callback = () => store.dispatch(
            A.actGrabKoma(
                C.SRC_NONE,
                {
                    dan: 0,
                    suji: 0,
                    koma: C.KOMA_NONE
                }
            )
        );
    }
    else {
        callback = () => store.dispatch(
            A.actGrabKoma(
                C.SRC_BOARD,
                {
                    dan: dan,
                    suji: suji,
                    koma: C.KOMA_NONE
                }
            )
        );
    }

    if ( info.legal === true ) {
        grid_style = { ...grid_style, backgroundColor: "#EEEEEE" };
    }

    return (
        <>
            <Grid item xs={1} sx={grid_style} onClick={() => callback()}>
                <Box sx={box_style}>
                    {KomaAtom(info.koma, info.owner, info.grabbed, info.legal)}
                </Box>
            </Grid>
        </>
    );
}

const BoardRow = (shogiban, view, dan) => {
    const dan_texts = [
        "一", "二", "三", "四", "五", "六", "七", "八", "九"
    ]

    if (view === C.PLAYER_SENTE) {
        return (
            <>
                <Grid item xs={1}></Grid>
                {BoardColumn(shogiban[dan][0], view, dan, 0)}
                {BoardColumn(shogiban[dan][1], view, dan, 1)}
                {BoardColumn(shogiban[dan][2], view, dan, 2)}
                {BoardColumn(shogiban[dan][3], view, dan, 3)}
                {BoardColumn(shogiban[dan][4], view, dan, 4)}
                {BoardColumn(shogiban[dan][5], view, dan, 5)}
                {BoardColumn(shogiban[dan][6], view, dan, 6)}
                {BoardColumn(shogiban[dan][7], view, dan, 7)}
                {BoardColumn(shogiban[dan][8], view, dan, 8)}
                <Grid item xs={1}  style={{position: "relative"}}>
                    <p style={{width: "100%", margin: 0, position: "absolute", top: "50%", transform: "translate(0, -50%)", marginLeft: ".5rem"}}>
                        {dan_texts[dan]}
                    </p>
                </Grid>
                <Grid item xs={1}></Grid>
            </>
        )
    }
    else {
        return (
            <>
                <Grid item xs={1}></Grid>
                {BoardColumn(shogiban[8 - dan][8], view, 8 - dan, 8)}
                {BoardColumn(shogiban[8 - dan][7], view, 8 - dan, 7)}
                {BoardColumn(shogiban[8 - dan][6], view, 8 - dan, 6)}
                {BoardColumn(shogiban[8 - dan][5], view, 8 - dan, 5)}
                {BoardColumn(shogiban[8 - dan][4], view, 8 - dan, 4)}
                {BoardColumn(shogiban[8 - dan][3], view, 8 - dan, 3)}
                {BoardColumn(shogiban[8 - dan][2], view, 8 - dan, 2)}
                {BoardColumn(shogiban[8 - dan][1], view, 8 - dan, 1)}
                {BoardColumn(shogiban[8 - dan][0], view, 8 - dan, 0)}
                <Grid item xs={1}  style={{position: "relative"}}>
                    <p style={{margin: 0, position: "absolute", top: "50%", transform: "translate(0, -50%)", marginLeft: ".5rem"}}>
                        {dan_texts[8 - dan]}
                    </p>
                </Grid>
                <Grid item xs={1}></Grid>
            </>
        )
    }
}

const BoardHeader = (view) => {
    if (view === C.PLAYER_SENTE) {
        return (
            <>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}><Typography align="center">９</Typography></Grid>
                <Grid item xs={1}><Typography align="center">８</Typography></Grid>
                <Grid item xs={1}><Typography align="center">７</Typography></Grid>
                <Grid item xs={1}><Typography align="center">６</Typography></Grid>
                <Grid item xs={1}><Typography align="center">５</Typography></Grid>
                <Grid item xs={1}><Typography align="center">４</Typography></Grid>
                <Grid item xs={1}><Typography align="center">３</Typography></Grid>
                <Grid item xs={1}><Typography align="center">２</Typography></Grid>
                <Grid item xs={1}><Typography align="center">１</Typography></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
            </>
        );
    }
    else {
        return (
            <>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}><Typography align="center">１</Typography></Grid>
                <Grid item xs={1}><Typography align="center">２</Typography></Grid>
                <Grid item xs={1}><Typography align="center">３</Typography></Grid>
                <Grid item xs={1}><Typography align="center">４</Typography></Grid>
                <Grid item xs={1}><Typography align="center">５</Typography></Grid>
                <Grid item xs={1}><Typography align="center">６</Typography></Grid>
                <Grid item xs={1}><Typography align="center">７</Typography></Grid>
                <Grid item xs={1}><Typography align="center">８</Typography></Grid>
                <Grid item xs={1}><Typography align="center">９</Typography></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
            </>
        );
    }
}

const BoardBlock = () => {
    const view = useSelector(S.getView);
    const shogiban = useSelector(S.selectShogiban);

    return (
        <>
            <Grid container rowSpacing={0} columnSpacing={0}>
                {BoardHeader(view)}
                {BoardRow(shogiban, view, 0)}
                {BoardRow(shogiban, view, 1)}
                {BoardRow(shogiban, view, 2)}
                {BoardRow(shogiban, view, 3)}
                {BoardRow(shogiban, view, 4)}
                {BoardRow(shogiban, view, 5)}
                {BoardRow(shogiban, view, 6)}
                {BoardRow(shogiban, view, 7)}
                {BoardRow(shogiban, view, 8)}
            </Grid>
        </>
    )
}

export default BoardBlock;