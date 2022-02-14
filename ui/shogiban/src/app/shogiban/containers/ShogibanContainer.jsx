import React from 'react';
import { connect } from 'react-redux';

import { Grid } from '@mui/material';

import * as actions from '../stores/actions';
import KifuModule from '../components/modules/KifuModule';
import ShogibanModule from '../components/modules/ShogibanModule';

import HeaderModule from '../../shared/HeaderModule';

class ShogibanContainer extends React.Component {
    render() {
        return (
            <>
                <HeaderModule />
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <KifuModule />
                    </Grid>
                    <Grid item xs={9}>
                        <ShogibanModule />
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(ShogibanContainer);