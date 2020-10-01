import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        <Typography variant="h6">Semestre 1/ Axe thematique</Typography>
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider />
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider />
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider />
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider variant="inset" component="li" /> <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary="Cours X - X credits"
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
    
    
    </List>
  );
}
