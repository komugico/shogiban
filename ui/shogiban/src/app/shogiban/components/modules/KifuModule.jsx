import React from 'react';
import { connect } from 'react-redux';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TourIcon from '@mui/icons-material/Tour';

import * as actions from '../../stores/actions';

class KifuModule extends React.Component {

    tlItem(turn, move, final) {
        let icon = null;
        let color = null;
        if (final) {
            if (turn % 2 == 1) {
                icon = <TourIcon />;
                color = "grey";
            }
            else {
                icon = <TourIcon />;
                color = "inherit";
            }
        }
        else {
            if (turn % 2 == 1) {
                icon = <ChevronRightIcon />;
                color = "grey";
            }
            else {
                icon = <ChevronLeftIcon />;
                color = "inherit"
            }
        }

        return (
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    {turn}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color={color}>
                        {icon}
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:'auto 0', py: '12px', px: 2 }}>
                    <Typography>{move}</Typography>
                </TimelineContent>
            </TimelineItem>
        );
    }

    render() {
        return (
            <Paper elevation={6}>
                <Timeline position="alternate">
                    {this.tlItem(1, "７六歩", false)}
                    {this.tlItem(2, "３四歩", false)}
                    {this.tlItem(3, "６六歩", false)}
                    {this.tlItem(4, "８二歩", false)}
                    {this.tlItem(5, "６八飛", true)}
                </Timeline>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, actions)(KifuModule);