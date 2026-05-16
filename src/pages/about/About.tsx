import React from 'react';
import { Box, Container, Typography, Stack, Divider, Chip } from '@mui/material';

const ABOUT_POINTS = [
    'Backend-first full stack developer focused on system architecture and clean, scalable services.',
    'Designs multi-tenant microservices and autonomous workflows that solve real business problems.',
    'Strong emphasis on maintainable code, database performance, and observability under load.',
];

const CORE_STACK = [
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'MongoDB',
    'Prisma',
    'Docker',
    'Microservices',
    'Realtime streaming',
    'Gemini API',
];

const About: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    About Rahul Bharti
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 760 }}>
                    Hi, I am Rahul Bharti. I am a full stack developer with a deep focus on backend engineering,
                    system architecture, and building scalable software solutions from scratch. I specialize in
                    designing robust, multi-tenant platforms that stay fast and reliable as they grow.
                </Typography>
            </Box>

            <Stack spacing={5}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        What I do
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        I love the backend: structuring databases, securing APIs, and optimizing data pipelines.
                        I handle the full stack when needed, but I am happiest building the core that keeps a
                        product resilient and calm under pressure.
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
                        Entrepreneurial mindset
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Beyond features, I build products with business viability, multi-tenant security, and
                        user experience in mind. I created LibSpace, a multi-tenant library ERP that I designed,
                        developed, and scaled to serve active, paying institutional clients. Shipping real software
                        taught me a lot about product-market fit, cloud costs, and operational efficiency.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        My philosophy
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        I follow a "second brain" approach to engineering: organize knowledge, map systems, and
                        work from clear architecture. It helps me adapt fast, solve bottlenecks, and keep the
                        delivery pipeline clean.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        Simplicity is the ultimate sophistication in system design. Build it clean, make it scalable,
                        and always design with the end user in mind.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Looking forward
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Whether it is realtime video delivery, autonomous AI workflows, or the next big SaaS
                        platform, I am always ready to push technical boundaries.
                    </Typography>
                    <Stack spacing={1}>
                        {ABOUT_POINTS.map((point) => (
                            <Typography key={point} variant="body1" sx={{ color: 'text.secondary' }}>
                                {point}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default About;
