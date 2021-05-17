import React from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    color: 'white',
    textDecoration: 'none'
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Link className={classes.menuButton} to='/' color="inherit">Home</Link>
                {/* <Link className={classes.menuButton} to='/1' color="inherit">Details</Link> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}
