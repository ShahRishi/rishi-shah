import * as React from 'react';
import {
  AppBar, Card, CardContent, CardActionArea, Grid, List, ListItem, ListItemIcon, ListItemText, Chip,
  Typography, Button, Toolbar, Container, Box
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/lato';
import experiences from './assets/experiences';



const pages = ['About', 'Experience', 'Projects'];

const projects = [
  {
    title: "Project 1",
    description: "This is a brief description for project 1.",
    tags: ["React", "Node.js"]
  },
  {
    title: "Project 2",
    description: "This is a brief description for project 2.",
    tags: ["JavaScript", "Express"]
  },
  // ... add more projects as needed
];



function ProjectCard({ title, description }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.3s"
        }
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ExperienceCard(props) {
  const { company, duration, tasks, position, role, techStack } = props;

  const cardAlignment = position === 'left'
    ? { display: 'flex', justifyContent: 'flex-end' }
    : {};

  return (
    <Box m={0} p={0} sx={cardAlignment}>
      <Card sx={{ maxWidth: 500, mt: 0, mb: 0, width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {company}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            {role}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={2}>
            {duration}
          </Typography>
          <List dense>
            {tasks.map((task, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon style={{ minWidth: '25px' }}>
                  <span style={{ fontSize: '2em' }}>&bull;</span>
                </ListItemIcon>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </List>

          {/* Tech stack bubbles */}
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
            {techStack.map((tech, index) => (
              <Chip 
                key={index} 
                label={tech} 
                size="small" 
                style={{ margin: '5px' }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}


function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'lato',
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const aboutRef = React.useRef(null);
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);

  const navigateToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  };

  return (
    <>
    <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: '#e6e1d3' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#025906', borderRadius: 2, opacity: 0.5, fontWeight: 1000 }}> 
        <Toolbar sx={{ justifyContent: 'center'}}>
          {pages.map((page) => {
            let sectionRef;
            if (page === "About") sectionRef = aboutRef;
            else if (page === "Experience") sectionRef = experienceRef;
            else if (page === "Projects") sectionRef = projectsRef;

            return (
              <Button key={page} color="inherit" onClick={() => navigateToSection(sectionRef)}>
                {page}
              </Button>
            )
          })}
        </Toolbar>
      </AppBar>


      <Container ref={aboutRef}>
        <Box sx={{ mt: 4, pt: 3, pb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Hello, I'm Rishi!
          </Typography>
          <Typography variant="body1">
            I'm a rising senior at Boston University looking for new grad positions 
          </Typography>
        </Box>
      </Container>

      <Container ref={experienceRef}>
      <Typography variant="h5" gutterBottom align="left" sx={{ mt: 4, mb: 3 }}>
        Experience
      </Typography>

      <Timeline position={isMobile ? 'right' : 'alternate-reverse'}>
        {experiences.map((exp, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ExperienceCard {...exp} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>

      <Container ref={projectsRef}>
        <Typography variant="h5" gutterBottom align="left" sx={{ mt: 4, mb: 3 }}>
          Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <ProjectCard
                title={project.title}
                description={project.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    </ThemeProvider>
    </>
  );
}

export default App;