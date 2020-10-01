import React,{ Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormComment from './FormComment';
import AllComments from './AllComments';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Lire article
      </Button>
      <Dialog  open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            {props.article.title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose} >
              Voir tous les articles
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary={ props.article.author} secondary={props.article.created_at}/>
          </ListItem>
          <Divider />
          <ListItem >
            <DialogContent >
              <h1>{props.article.title}</h1><br />
            <img src={"/articles_images/"+props.article.image} width={300} height={300} />
                <Fragment>
                    <div className="content" dangerouslySetInnerHTML={{__html:props.article.body} }></div>   
                </Fragment>   
            </DialogContent>
          </ListItem>
        </List>
        <Divider />
        <AllComments idArticle={props.article.id} canDelete={false}/>
        <Divider />
        <FormComment article= { props.article }/>
      </Dialog>
    </div>
  );
}