import React from 'react';
import { Box, Container, Typography, Stack, Chip, Divider } from '@mui/material';

const CORE_STACK = [
    'Node.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Express.js',
    'NestJS',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Prisma',
    'Mongoose',
    'React.js',
    'Next.js',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
];

const ARCHITECTURE_DEVOPS = [
    'Multi-tenant SaaS architecture',
    'Microservices',
    'RESTful API design',
    'RBAC',
    'Docker',
    'Container isolation',
    'VPS deployment',
    'Database indexing',
    'Query optimization',
    'Connection pooling',
];

const MEDIA_AI = [
    'SRS realtime streaming servers',
    'FFmpeg pipelines',
    'Bunny.net CDN',
    'Object storage management',
    'Gemini API',
    'Tool calling',
    'Agentic automation',
];

const PROFESSIONAL = [
    'MVP scoping',
    'Feature roadmaps',
    'Product transitions',
    'SaaS metrics and strategy',
    'Cloud cost management',
    'Git and GitHub',
    'Branch management',
    'CI/CD mindset',
    'Notion and Obsidian workflows',
    'Second brain methodology',
];

const SkillsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Skills Overview
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 820 }}>
                    I believe in using the right tool for the job. Over years of building production-ready
                    applications and scaling SaaS platforms, I have developed a strong, backend-focused stack
                    centered around reliability, performance, and scalability.
                </Typography>
            </Box>

            <Stack spacing={4}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Core development stack
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Backend engineering is my core, with full stack delivery when the product requires it.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {CORE_STACK.map((item) => (
                            <Chip
                                key={item}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255, 180, 84, 0.12)',
                                    color: 'primary.main',
                                    border: '1px solid rgba(255, 180, 84, 0.32)',
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Architecture and DevOps
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Reliable systems need strong architecture, sane delivery pipelines, and careful performance
                        work across the stack.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {ARCHITECTURE_DEVOPS.map((item) => (
                            <Chip
                                key={item}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(93, 214, 193, 0.12)',
                                    color: 'secondary.main',
                                    border: '1px solid rgba(93, 214, 193, 0.32)',
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Media engineering and AI workflows
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        I build specialized pipelines for realtime media delivery and AI automation.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {MEDIA_AI.map((item) => (
                            <Chip
                                key={item}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.06)',
                                    color: 'text.secondary',
                                    border: '1px solid rgba(255, 255, 255, 0.14)',
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Professional and business skills
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Building software products has taught me how to think about value, usability, and long-term
                        operations.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {PROFESSIONAL.map((item) => (
                            <Chip
                                key={item}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.06)',
                                    color: 'text.secondary',
                                    border: '1px solid rgba(255, 255, 255, 0.14)',
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default SkillsPage;
