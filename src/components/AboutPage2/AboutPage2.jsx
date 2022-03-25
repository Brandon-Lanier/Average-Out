import { Stack, Box, Button, Typography, Container, Slide } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import fam from './fam.JPG';
import liz from './liz.png';
import adams from './fester.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function AboutPage2() {

    return (
        <div>
        <Slide direction="up" in="open" mountOnEnter unmountOnExit>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <Stack spacing={5}>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant='h5'>
                            Challenges:
                        </Typography>
                        <Typography variant="b1">
                            Combining live API data and Database data to create calculations dynamically.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Future Goals:
                        </Typography>
                        <Typography variant="b1">
                            Implement more exit strategies and allow users to access historical sales data to analyze how the exit strategy played out.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h5'>
                            Shout Outs:
                        </Typography>
                        <List sx={{ width: '100%%', maxWidth: 370, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="adams" src={adams} />
                                </ListItemAvatar>
                                <ListItemText primary="The Adam's Cohort" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="liz" src={liz} />
                                </ListItemAvatar>
                                <ListItemText primary="Liz and all the prime instructors" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="family" src={fam} />
                                </ListItemAvatar>
                                <ListItemText primary="My Wife, Daughter and friends who have helped with this journey" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}> 
                            <Typography variant='h5' sx={{ mt: 4}}>
                                App Developed By Brandon Lanier
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <a href="https://www.linkedin.com/in/brandon-lanier/" target="_blank"><LinkedInIcon fontSize="large" sx={{color: 'blue'}} /></a>
                                <a href="https://github.com/Brandon-Lanier" target="_blank"><GitHubIcon fontSize="large" sx={{color: 'black'}}/></a>
                            </Box>
                            <Typography variant="b2" sx={{textAlign: 'center', mt: 4}}>
                               © 2022 Brandon Lanier 
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>
            </Slide>
        </div>
    )
}

export default AboutPage2;