import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import UnePublication from './UnePublication';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
         <UnePublication  />       
 
    </div>
  );
}
