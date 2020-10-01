import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import data from './Internationale.json';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
  
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const image = <AccountCircleIcon style={{height:'150px',width:'150px' , color:"gray"}}/>
 
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
        image
        }
      />
     
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
       <strong>    {props.nom}   </strong> 
       </Typography>
       <Typography variant="body2" color="textSecondary" component="p">
       {props.titre}
       </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.email}
       </Typography>
       <Typography variant="body2" color="textSecondary" component="p">
          {props.phone}
       </Typography>
      </CardContent>
      <CardActions disableSpacing>
      
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {props.diplomes.map((diplome, ind)=>
          <Typography key={ind} variant="body2" gutterBottom>
              {diplome}
          </Typography>
          )}   
          <div className="card-body">
              <Typography variant="subtitle2" gutterBottom>
                <strong>Biographie</strong> 
              </Typography>
          {props.biographie} </div>
          <div className="card-body">
            <Typography variant="subtitle2" gutterBottom>
            <strong>Cours</strong> 
            </Typography>
            {props.cours.map((cour,ind)=>
              <Typography key={ind} variant="body2" gutterBottom>
              {cour}
            </Typography>
            )}
        </div>
        <div className="card-body">
            <Typography variant="subtitle2" gutterBottom>
            <strong>Expertise</strong> 
            </Typography>
            {props.expertise.map((ex, ind)=>
            <Typography key={ind} variant="body2" gutterBottom>
                {ex}
            </Typography>
            )} 
        </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
