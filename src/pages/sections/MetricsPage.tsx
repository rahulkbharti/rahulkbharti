import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const METRICS = [
    {
        label: '99.9% Data Isolation',
        detail: 'Designed a multi-tenant SaaS schema handling multiple distinct organizations on a single database instance with zero cross-tenant data leaks.',
    },
    {
        label: '30% Reduction in Latency',
        detail: 'Optimized complex PostgreSQL indexing and Prisma queries, cutting API response times significantly for heavy reporting features.',
    },
    {
        label: '0 to Paid Validation',
        detail: 'Successfully converted alpha testing concepts into recurring revenue by validating and selling software directly to local business owners/institutions.',
    },
    {
        label: '100% Automated Workflows',
        detail: 'Reduced manual operational overhead by integrating Gemini API autonomous agents to handle repetitive system workflows and support triggers.',
    },
];

const MetricsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Impact Metrics
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    Quantifiable outcomes from backend and product work.
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {METRICS.map((metric) => (
                    <Grid key={metric.label} size={{ xs: 12, md: 6 }}>
                        <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{metric.label}</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{metric.detail}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MetricsPage;
