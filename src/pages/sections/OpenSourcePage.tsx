import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const PROJECTS = [
    {
        title: 'Custom Video Transcoding Pipeline',
        detail: 'Open-sourced a lightweight boilerplate for integrating SRS (Simple Realtime Server) and FFmpeg for developers looking to build localized live-streaming solutions.',
    },
];

const OpenSourcePage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Open Source
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Projects and experiments shared with the community.
                </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                Projects & Open Source
            </Typography>
            <Stack spacing={2}>
                {PROJECTS.map((item) => (
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

export default OpenSourcePage;
