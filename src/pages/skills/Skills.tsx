import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip, Stack, Grid, Button, Link } from '@mui/material';

interface SkillGroup {
    id: string;
    title: string;
    description: string;
    items: string[];
    tone?: 'primary' | 'secondary' | 'support';
}

const OVERVIEW =
    'Backend-first engineer focused on reliability, performance, and scalable SaaS architecture.';

const SKILL_GROUPS: SkillGroup[] = [
    {
        id: 'primary-backend',
        title: 'Primary: Backend Engineering',
        description: 'The core stack I use to build reliable, high throughput services.',
        items: ['Node.js', 'TypeScript', 'JavaScript (ES6+)', 'Express.js', 'NestJS'],
        tone: 'primary',
    },
    {
        id: 'primary-data',
        title: 'Primary: Data and Persistence',
        description: 'Storage, caching, and data access layers that scale cleanly.',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Mongoose'],
        tone: 'primary',
    },
    {
        id: 'secondary-frontend',
        title: 'Secondary: Product Delivery',
        description: 'Frontend toolset for shipping complete product experiences.',
        items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
        tone: 'secondary',
    },
    {
        id: 'secondary-arch',
        title: 'Secondary: Architecture and DevOps',
        description: 'System design, API structure, and scalable delivery workflows.',
        items: ['Microservices', 'Multi-tenant SaaS', 'REST APIs', 'RBAC', 'Docker', 'VPS Deployment'],
        tone: 'secondary',
    },
    {
        id: 'secondary-ai',
        title: 'Secondary: Media and AI Workflows',
        description: 'Specialized systems for streaming, delivery, and AI automation.',
        items: ['SRS', 'FFmpeg', 'Bunny.net CDN', 'Gemini API', 'Tool calling'],
        tone: 'secondary',
    },
    {
        id: 'supporting-business',
        title: 'Supporting: Product and Operations',
        description: 'Business-aware delivery and operational readiness for SaaS.',
        items: ['MVP scoping', 'Roadmaps', 'SaaS metrics', 'Cloud cost control', 'CI/CD mindset'],
        tone: 'support',
    },
    {
        id: 'supporting-knowledge',
        title: 'Supporting: Knowledge Systems',
        description: 'Structured documentation that keeps complex work organized.',
        items: ['Notion', 'Obsidian', 'Second brain workflows', 'System documentation'],
        tone: 'support',
    },
];

const toneStyles = {
    primary: {
        border: '1px solid rgba(255, 180, 84, 0.45)',
        boxShadow: '0 12px 30px rgba(255, 180, 84, 0.15)'
    },
    secondary: {
        border: '1px solid rgba(93, 214, 193, 0.35)'
    },
    support: {
        border: '1px solid rgba(255, 255, 255, 0.12)'
    },
} as const;

const Skills: React.FC = () => {
    return (
        <Container id="skills" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            {/* Page Header */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontWeight: 'bold' }}
                >
                    <Box component="span" sx={{ color: 'primary.main' }}>#</Box>Skills
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
                    {OVERVIEW}
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 3 }}>
                    <Chip
                        label="Primary: Backend and Data"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 180, 84, 0.12)',
                            color: 'primary.main',
                            border: '1px solid rgba(255, 180, 84, 0.32)'
                        }}
                    />
                    <Chip
                        label="Secondary: Architecture, AI, Product Delivery"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(93, 214, 193, 0.1)',
                            color: 'secondary.main',
                            border: '1px solid rgba(93, 214, 193, 0.32)'
                        }}
                    />
                    <Chip
                        label="Supporting: Product and Ops"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.06)',
                            color: 'text.secondary',
                            border: '1px solid rgba(255, 255, 255, 0.12)'
                        }}
                    />
                </Stack>
            </Box>

            {/* Decorative accent box (desktop) */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    border: '1px solid rgba(93, 214, 193, 0.3)',
                    borderRadius: 3,
                    top: 100,
                    left: '8%',
                    zIndex: 0,
                    opacity: 0.12,
                    display: { xs: 'none', md: 'block' },
                }}
            />

            <Grid container spacing={3}>
                {SKILL_GROUPS.map((group) => (
                    <Grid key={group.id} size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: '100%',
                                bgcolor: 'background.paper',
                                ...toneStyles[group.tone ?? 'support'],
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {group.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        {group.description}
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                    {group.items.map((item) => (
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button variant="outlined" component={Link} href="/rahulkbharti/skills">
                    View full skills profile
                </Button>
            </Box>

            {/* Decorative bottom-right square (Desktop only) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'fixed',
                    bottom: 40,
                    right: 40,
                    width: 100,
                    height: 100,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    zIndex: -1,
                }}
            />
        </Container>
    );
};

export default Skills;
