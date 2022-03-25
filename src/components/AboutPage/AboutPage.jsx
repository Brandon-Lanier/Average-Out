import React from 'react';
import { Stack, Box, Button } from '@mui/material';
import reacticon from './images/icons8-react-50-2.png';
import reduxicon from './images/icons8-redux-50.png';
import nodeicon from './images/icons8-nodejs-50.png';
import jsicon from './images/icons8-javascript-50.png';
import postgresql from './images/icons8-postgresql-50.png';
import muiicon from './images/icons8-material-ui-50.png';
import htmlicon from './images/icons8-html-50.png';
import cssicon from './images/icons8-css-50.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  const history = useHistory();
  
  return (
    <Box>
      <Typography variant="h5" sx={{textAlign: 'center', mt: 2}}>
        Built with the following tech stacks:
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="react" src={reacticon} />
          </ListItemAvatar>
          <ListItemText primary="React" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="javascript" src={jsicon} />
          </ListItemAvatar>
          <ListItemText primary="Javascript" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="redix" src={reduxicon} />
          </ListItemAvatar>
          <ListItemText primary="Redux" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="node" src={nodeicon} />
          </ListItemAvatar>
          <ListItemText primary="Node.JS" />
        </ListItem>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="node" src={nodeicon} />
          </ListItemAvatar>
          <ListItemText primary="Node Cron" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="postgresql" src={postgresql} />
          </ListItemAvatar>
          <ListItemText primary="PostgreSQL" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="MaterialUI" src={muiicon} />
          </ListItemAvatar>
          <ListItemText primary="Material UI" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="html" src={htmlicon} />
          </ListItemAvatar>
          <ListItemText primary="HTML" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="CSS" src={cssicon} />
          </ListItemAvatar>
          <ListItemText primary="CSS" />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Button variant="contained" onClick={(() => history.push('/about2'))}>Continue </Button>
    </Box>
  );
}

export default AboutPage;
