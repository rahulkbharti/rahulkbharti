import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionIcon from '@mui/icons-material/Description';
import { PROJECTS } from '../../data/projects';

const Projects: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }} id="works">
            {/* Page Header */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        mb: 2,
                        fontWeight: 'bold'
                    }}
                >
                    Featured Projects
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    A curated selection of projects that highlight my core backend and platform work.
                </Typography>
            </Box>

            {/* Decorative Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 110,
                    height: 110,
                    border: '1px solid rgba(255, 180, 84, 0.25)',
                    borderRadius: 3,
                    top: 100,
                    right: '10%',
                    zIndex: 0,
                    opacity: 0.3,
                    display: { xs: 'none', md: 'block' }
                }}
            />

            {/* Projects Grid */}
            <Grid container spacing={4}>
                {PROJECTS.map((project) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 34px rgba(255, 180, 84, 0.2)',
                                    borderColor: 'primary.main'
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                {/* Project Title */}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    {project.title}
                                </Typography>

                                {/* Project Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2,
                                        flexGrow: 1,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {project.overview}
                                </Typography>

                                {/* Technologies */}
                                <Box sx={{ mb: 2 }}>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {project.stack.map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(255, 180, 84, 0.12)',
                                                    color: 'primary.main',
                                                    border: '1px solid rgba(255, 180, 84, 0.35)',
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', gap: 1, mt: 'auto', flexWrap: 'wrap' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<DescriptionIcon />}
                                        component={RouterLink}
                                        to={`/projects/${project.slug}`}
                                        sx={{
                                            flex: '0 0 auto',
                                            minHeight: 30,
                                            px: 1.25,
                                            py: 0.4,
                                            fontSize: '0.75rem',
                                            textTransform: 'none',
                                            borderColor: 'rgba(255, 255, 255, 0.18)',
                                            color: 'text.secondary',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                bgcolor: 'rgba(255, 180, 84, 0.08)'
                                            }
                                        }}
                                    >
                                        Case study
                                    </Button>
                                    {project.liveUrl && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<LaunchIcon />}
                                            href={project.liveUrl}
                                            target="_blank"
                                            sx={{
                                                flex: '0 0 auto',
                                                minHeight: 30,
                                                px: 1.25,
                                                py: 0.4,
                                                fontSize: '0.75rem',
                                                textTransform: 'none',
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    bgcolor: 'rgba(255, 180, 84, 0.12)'
                                                }
                                            }}
                                        >
                                            Live
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<GitHubIcon />}
                                            href={project.githubUrl}
                                            target="_blank"
                                            sx={{
                                                flex: '0 0 auto',
                                                minHeight: 30,
                                                px: 1.25,
                                                py: 0.4,
                                                fontSize: '0.75rem',
                                                textTransform: 'none',
                                                borderColor: 'rgba(255, 255, 255, 0.18)',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                    bgcolor: 'rgba(255, 180, 84, 0.08)'
                                                }
                                            }}
                                        >
                                            GitHub
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button variant="outlined" component={RouterLink} to="/projects">
                    View all projects
                </Button>
            </Box>

            {/* Decorative bottom square */}
            <Box sx={{
                display: { xs: 'none', md: 'block' },
                position: 'fixed',
                bottom: 40,
                right: 40,
                width: 100,
                height: 100,
                border: '1px solid #444',
                zIndex: -1,
            }} />
        </Container>
    );
};

export default Projects;
