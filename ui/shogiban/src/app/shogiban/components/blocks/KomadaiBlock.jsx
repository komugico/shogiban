import { useStore, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { lightGreen } from '@mui/material/colors';

import * as A from '../../stores/actions';
import * as C from '../../stores/constants';
import { CardHeader, CardContent } from '@mui/material';

const Mochigoma = (type, count, player) => {
    const store = useStore();

    let sx = {};
    let badge_color = "default";
    let callback = null;

    if (count > 0) {
        sx = { bgcolor: lightGreen[500] };
        badge_color = "success";
    }

    if (player === C.PLAYER_SENTE) {
        callback = () => store.dispatch(
            A.actGrabKoma(
                C.SRC_MOCHIGOMA_SENTE,
                {
                    dan: 0,
                    suji: 0,
                    koma: type
                }
            )
        );
    }
    else {
        callback = () => store.dispatch(
            A.actGrabKoma(
                C.SRC_MOCHIGOMA_SENTE,
                {
                    dan: 0,
                    suji: 0,
                    koma: type
                }
            )
        );
    }

    return (
        <Stack direction="row">
            <Badge
                badgeContent={String(count)}
                color={badge_color}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Avatar sx={sx} onClick={() => callback()}>
                    {C.KOMA_TEXTS[type]}
                </Avatar>
            </Badge>
        </Stack>
    )
}

const KomadaiBlock = ({ mochigoma, player }) => {
    return (
        <Card>
            <CardHeader
                title="player"
                subheader="rating"
            />
            <CardContent>
                <Stack direction="column" spacing={1}>
                    {Mochigoma(C.KOMA_FU, mochigoma[0], player)}
                    {Mochigoma(C.KOMA_KYOSHA, mochigoma[1], player)}
                    {Mochigoma(C.KOMA_KEIMA, mochigoma[2], player)}
                    {Mochigoma(C.KOMA_GIN, mochigoma[3], player)}
                    {Mochigoma(C.KOMA_KIN, mochigoma[4], player)}
                    {Mochigoma(C.KOMA_KAKU, mochigoma[5], player)}
                    {Mochigoma(C.KOMA_HISHA, mochigoma[6], player)}
                </Stack>
                <br />
                <hr />
                <Stack direction="row" spacing={1}>
                    <IconButton>
                        <FlagCircleIcon color="error" />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default KomadaiBlock;