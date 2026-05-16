import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const WRITING = [
    'Architecting True Multi-Tenancy in Node.js with Prisma and PostgreSQL (Forthcoming / Blog)',
    'Building Resilient Video Pipelines Without Breaking the Bank: A Bunny.net & FFmpeg Guide (Blog)',
];

const TalksWritingPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Talks and Writing
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Articles and topics I am actively documenting.
                </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                Technical Writing
            </Typography>
            <Stack spacing={2}>
                {WRITING.map((item) => (
                    <Card key={item} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{item}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default TalksWritingPage;
