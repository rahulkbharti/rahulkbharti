import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const SERVICES = [
    {
        title: 'SaaS MVP Development',
        detail: 'Building secure, multi-tenant SaaS platforms from the ground up using Node.js, TypeScript, and robust relational databases.',
    },
    {
        title: 'Backend Scaling & Code Audits',
        detail: 'Transitioning monolithic apps to microservices, optimizing slow SQL queries, implementing Redis caching, and securing REST APIs.',
    },
    {
        title: 'AI & Media Pipeline Integrations',
        detail: 'Integrating autonomous Gemini API workflows into existing products or setting up custom video streaming/transcoding servers (SRS/FFmpeg).',
    },
];

const ServicesPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Services and Offerings
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    I am available for select freelance contracts, technical consulting, and dedicated engineering roles focusing on:
                </Typography>
            </Box>
            <Stack spacing={2}>
                {SERVICES.map((item) => (
                    <Card key={item.title} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{item.detail}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default ServicesPage;
