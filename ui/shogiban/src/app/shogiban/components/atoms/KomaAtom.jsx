import * as C from '../../stores/constants';

const koma_style = {
    fontSize: "2rem",
    width: "100%",
    height: "100%",
    margin: 0,
    position: "absolute",
    top: "50%",
    transform: "translate(0, -25%)",
    textAlign: "center",
    zIndex: 0
}

const KomaAtom = ({koma, owner, grabbed, legal}) => {
    let style = { ...koma_style };
    if (owner === C.PLAYER_GOTE) {
        style = { ...style, transform: "translate(0, -75%) rotate(180deg)"};
    }
    if (grabbed === true) {
        style = { ...style, fontWeight: "bold" }
    }

    return (
        <>
            <p style={style}>
                {C.KOMA_TEXTS[koma]}
            </p>
        </>
    );
}

export default KomaAtom;