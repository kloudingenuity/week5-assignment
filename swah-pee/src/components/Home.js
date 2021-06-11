import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(5),
        padding: theme.spacing(2),
        width: theme.spacing(80),
        height: theme.spacing(60),
      },
    },
  }));
  
export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <div>
                    <h1>SWAPI</h1>
                    <p>The Star Wars API</p>
                </div>
            </Paper>
        </div>
    );
}
