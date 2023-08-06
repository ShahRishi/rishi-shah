import * as React from 'react';
import {
  AppBar, Card, CardContent, CardActionArea, Grid, List, ListItem, ListItemText,
  Typography, Button, Toolbar, Container, Box
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';


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

function ProjectCard({ title, description, imageUrl }) {
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
  const { company, duration, tasks, position } = props;

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
            {duration}
          </Typography>
          <List dense>
            {tasks.map((task, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={task} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const aboutRef = React.useRef(null);
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);

  const navigateToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Rishi Shah</Typography>
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
            Hello! My name is Rishi.
          </Typography>
          <Typography variant="body1">
            I'm a passionate software developer with a love for all things tech!
          </Typography>
        </Box>
      </Container>

      <Container ref={experienceRef}>
        <Typography variant="h5" gutterBottom align="left" sx={{ mt: 4, mb: 3 }}>
          Experience
        </Typography>

        <Timeline position={isMobile ? 'right' : 'alternate-reverse'}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ExperienceCard
                company="Google"
                duration="Jan 2022 - Present"
                tasks={[
                  "Developed feature X in the main app.",
                  "Collaborated with design team to enhance UI/UX.",
                  "Optimized backend API calls for better performance."
                ]}
                position="left"
              />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ExperienceCard
                company="Apple"
                duration="Jan 2021 - Dec 2021"
                tasks={[
                  "Worked on iOS app optimization.",
                  "Introduced new AR features.",
                  "Improved security protocols."
                ]}
                position="right"
              />
            </TimelineContent>
          </TimelineItem>
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
    </>
  );
}

export default App;