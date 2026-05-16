import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const ACHIEVEMENTS = [
    'Architected & Scaled LibSpace: Successfully built and launched a production-ready, multi-tenant library ERP system from scratch, scaling it to secure paid institutional contracts.',
    'Production Media Pipelines: Designed and deployed a resilient, real-time video transcoding and streaming infrastructure handling live classrooms with automated FFmpeg processing.',
    'Play Store Deployment: Successfully navigated and fulfilled Google Play’s strict 20-tester closed testing guidelines to launch a student-centric mobile application.',
    'Internship-to-Full-Time Transition: Fast-tracked from a Full Stack Internship to a permanent, full-time engineering role at Nexteir Technologies due to high performance and backend ownership.',
];

const AchievementsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Key Achievements
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Highlights that show impact, ownership, and execution.
                </Typography>
            </Box>
            <Stack spacing={2}>
                {ACHIEVEMENTS.map((item) => (
                    <Card key={item} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>{item}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default AchievementsPage;
