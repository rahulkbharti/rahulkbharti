import React, { useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Stack,
    Chip,
    Button,
    Card,
    Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import { PROJECTS } from '../../data/projects';

const Section: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
            {title}
        </Typography>
        <Stack spacing={1}>
            {items.map((item) => (
                <Typography key={item} variant="body1" sx={{ color: 'text.secondary' }}>
                    {item}
                </Typography>
            ))}
        </Stack>
    </Box>
);

const ProjectDetail: React.FC = () => {
    const { slug = '' } = useParams();
    const project = useMemo(() => PROJECTS.find((p) => p.slug === slug), [slug]);

    if (!project) {
        return (
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Project not found
                </Typography>
                <Button component={RouterLink} to="/projects" variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back to projects
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Button component={RouterLink} to="/projects" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
                Back to projects
            </Button>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'white' }}>
                    {project.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 820 }}>
                    {project.subtitle}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 3 }}>
                {project.stack.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 180, 84, 0.12)',
                            color: 'primary.main',
                            border: '1px solid rgba(255, 180, 84, 0.35)',
                        }}
                    />
                ))}
            </Stack>

            <Card sx={{ mb: 4, border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Case study overview
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {project.overview}
                    </Typography>
                </Box>
            </Card>

            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 4 }}>
                {project.liveUrl && (
                    <Button
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                        href={project.liveUrl}
                        target="_blank"
                        sx={{
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'rgba(255, 180, 84, 0.12)' },
                        }}
                    >
                        Live demo
                    </Button>
                )}
                {project.githubUrl && (
                    <Button
                        variant="outlined"
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
            </Stack>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Role and focus
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {project.role}
                </Typography>
            </Box>

            <Stack spacing={4}>
                <Section title="Key highlights" items={project.highlights} />
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <Section title="Architecture" items={project.architecture} />
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <Section title="Challenges" items={project.challenges} />
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <Section title="Decisions and trade-offs" items={project.decisions} />
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <Section title="Outcomes" items={project.outcomes} />
            </Stack>
        </Container>
    );
};

export default ProjectDetail;
