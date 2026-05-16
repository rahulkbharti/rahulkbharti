import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Divider } from '@mui/material';

const TESTIMONIALS = [
    {
        quote: 'Rahul has an exceptional ability to take complex system requirements and turn them into clean, scalable backend reality. His work on our core services proved he doesn\'t just write code—he thinks deeply about architecture and future scale.',
        source: 'Engineering Lead, Nexteir Technologies',
    },
    {
        quote: 'Working with Rahul on product deployment showed me his true strength as a founder-engineer. He bridges the gap between technical complexity (like video engineering and multi-tenancy) and actual business value seamlessly.',
        source: 'Manish Kumar, Startup COO & Partner',
    },
];

const TestimonialsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Testimonials
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Feedback from people I have collaborated with.
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {TESTIMONIALS.map((item) => (
                    <Grid key={item.quote} size={{ xs: 12, md: 6 }}>
                        <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                            <CardContent>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    "{item.quote}"
                                </Typography>
                                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.source}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TestimonialsPage;
