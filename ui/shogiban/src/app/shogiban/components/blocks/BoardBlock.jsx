import { useStore, useDispatch, useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as A from '../../stores/actions';
import * as C from '../../stores/constants';
import * as S from '../../stores/selectors';
import KomaAtom from '../atoms/KomaAtom';

import * as AuthSelectors from '../../../auth/stores/selectors';

const cell_style = {
    border: 1,
    borderColor: 'text.primary',
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    zIndex: 1
}

const BoardColumn = ({info, view, dan, suji}) => {
    const store = useStore();

    let grid_style = { };
    let box_style = { ...cell_style };
    let callback = null;
    let f = null;

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

    let token = useSelector(AuthSelectors.getJwtToken);
    f = () => store.dispatch(
        A.apiGetTaikyoku(token)
    );

    if ( info.legal === true ) {
        grid_style = { ...grid_style, backgroundColor: "#EEEEEE" };
    }

    return (
        <>
            <Grid item xs={1} sx={grid_style} onClick={() => f()}>
                <Box sx={box_style}>
                    <KomaAtom koma={info.koma} owner={info.owner} grabbed={info.grabbed} legal={info.legal} />
                </Box>
            </Grid>
        </>
    );
}

const BoardRow = ({shogiban, view, dan}) => {
    const dan_texts = [
        "一", "二", "三", "四", "五", "六", "七", "八", "九"
    ]

    if (view === C.PLAYER_SENTE) {
        return (
            <>
                <Grid item xs={1}></Grid>
                <BoardColumn info={shogiban[dan][0]} view={view} dan={dan} suji={0} />
                <BoardColumn info={shogiban[dan][1]} view={view} dan={dan} suji={1} />
                <BoardColumn info={shogiban[dan][2]} view={view} dan={dan} suji={2} />
                <BoardColumn info={shogiban[dan][3]} view={view} dan={dan} suji={3} />
                <BoardColumn info={shogiban[dan][4]} view={view} dan={dan} suji={4} />
                <BoardColumn info={shogiban[dan][5]} view={view} dan={dan} suji={5} />
                <BoardColumn info={shogiban[dan][6]} view={view} dan={dan} suji={6} />
                <BoardColumn info={shogiban[dan][7]} view={view} dan={dan} suji={7} />
                <BoardColumn info={shogiban[dan][8]} view={view} dan={dan} suji={8} />
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
                <BoardColumn info={shogiban[8 - dan][8]} view={view} dan={8 - dan} suji={8} />
                <BoardColumn info={shogiban[8 - dan][7]} view={view} dan={8 - dan} suji={7} />
                <BoardColumn info={shogiban[8 - dan][6]} view={view} dan={8 - dan} suji={6} />
                <BoardColumn info={shogiban[8 - dan][5]} view={view} dan={8 - dan} suji={5} />
                <BoardColumn info={shogiban[8 - dan][4]} view={view} dan={8 - dan} suji={4} />
                <BoardColumn info={shogiban[8 - dan][3]} view={view} dan={8 - dan} suji={3} />
                <BoardColumn info={shogiban[8 - dan][2]} view={view} dan={8 - dan} suji={2} />
                <BoardColumn info={shogiban[8 - dan][1]} view={view} dan={8 - dan} suji={1} />
                <BoardColumn info={shogiban[8 - dan][0]} view={view} dan={8 - dan} suji={0} />
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

const BoardHeader = ({view}) => {
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
        <Grid container>
            <BoardHeader view={view} />
            <BoardRow shogiban={shogiban} view={view} dan={0} />
            <BoardRow shogiban={shogiban} view={view} dan={1} />
            <BoardRow shogiban={shogiban} view={view} dan={2} />
            <BoardRow shogiban={shogiban} view={view} dan={3} />
            <BoardRow shogiban={shogiban} view={view} dan={4} />
            <BoardRow shogiban={shogiban} view={view} dan={5} />
            <BoardRow shogiban={shogiban} view={view} dan={6} />
            <BoardRow shogiban={shogiban} view={view} dan={7} />
            <BoardRow shogiban={shogiban} view={view} dan={8} />
        </Grid>
    )
}

export default BoardBlock;