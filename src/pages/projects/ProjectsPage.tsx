import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
import { PROJECTS } from '../../data/projects';

const ProjectsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Projects
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 820 }}>
                    I build products end to end, but my core is backend architecture, reliability, and scalable
                    SaaS platforms. Every project below includes a case study that walks through the architecture,
                    trade-offs, and challenges.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {PROJECTS.map((project) => (
                    <Grid key={project.id} size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        {project.subtitle}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {project.stack.map((tech) => (
                                        <Chip
                                            key={tech}
                                            label={tech}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(255, 180, 84, 0.12)',
                                                color: 'primary.main',
                                                border: '1px solid rgba(255, 180, 84, 0.35)',
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {project.overview}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<DescriptionIcon />}
                                        component={RouterLink}
                                        to={`/projects/${project.slug}`}
                                        sx={{
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
        </Container>
    );
};

export default ProjectsPage;
