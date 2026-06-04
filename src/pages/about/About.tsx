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

const EDUCATION = [
    {
        institution: 'Rajkiya Engineering College, Ambedkar Nagar',
        program: 'Bachelor of Technology, Information Technology',
    },
    {
        institution: 'Board of Technical Education, Uttar Pradesh (BTEUP)',
        program: 'Diploma, Electrical Engineering',
        period: 'November 2020 - June 2022',
        distinction: 'Honors',
    },
    {
        institution: 'Adarsh Inter College Mahubag Ghazipur',
        program: 'Secondary Education, Mathematics',
        period: 'April 2017 - April 2019',
        distinction: 'First Topper',
    },
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

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 5, md: 6 },
                    alignItems: 'start',
                }}
            >
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
                                        bgcolor: 'rgba(73, 242, 165, 0.08)',
                                        color: 'primary.main',
                                        border: '1px solid rgba(73, 242, 165, 0.28)',
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                            Education
                        </Typography>
                        <Stack spacing={2}>
                            {EDUCATION.map((item) => (
                                <Box
                                    key={item.institution}
                                    sx={{
                                        pl: 2,
                                        borderLeft: '2px solid rgba(73, 242, 165, 0.4)',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {item.institution}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                        {item.program}
                                    </Typography>
                                    {item.distinction && (
                                        <Chip
                                            label={item.distinction}
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'rgba(73, 242, 165, 0.08)',
                                                color: 'primary.main',
                                                border: '1px solid rgba(73, 242, 165, 0.3)',
                                                fontWeight: 700,
                                            }}
                                        />
                                    )}
                                    {item.period && (
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                            {item.period}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Stack>

                <Stack spacing={5}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                            Product mindset
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Beyond features, I build products with business viability, multi-tenant security, and
                            user experience in mind. I created LibSpace, a multi-tenant library ERP that I designed,
                            developed, and scaled to serve active, paying institutional clients. Shipping real software
                            taught me a lot about product-market fit, cloud costs, and operational efficiency.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

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

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

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
            </Box>
        </Container>
    );
};

export default About;
