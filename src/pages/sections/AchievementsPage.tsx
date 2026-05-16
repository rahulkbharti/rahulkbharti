import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const ACHIEVEMENTS = [
    "Top 0.5% in TCS CodeVita (2024): Achieved a global rank of 1,961 out of over 537,000+ global participants in one of the world's largest competitive coding competitions.",
    "Google Cloud Generative AI Virtual Internship: Completed a intensive, 2-month project-based program focused on designing, deploying, and scaling practical Generative AI solutions directly on the Google Cloud Platform.",
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
                {ACHIEVEMENTS.map((item) => {
                    const [text, _buttonText] = item.split('$$');
                    return (
                        <Card key={item} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                            <CardContent>
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>{text}</Typography>
                                    {/* {buttonText && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            href="#"
                                            target="_blank"
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {buttonText}
                                        </Button>
                                    )} */}
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Container>
    );
};

export default AchievementsPage;
