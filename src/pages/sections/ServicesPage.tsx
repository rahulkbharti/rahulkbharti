import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ServiceCards from '../../components/ServiceCards';
import { SERVICES } from '../../data/services';

const ServicesPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Services
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 760 }}>
                    I help teams build reliable backend systems, SaaS products, AI workflows, and media infrastructure with a product-first engineering mindset.
                </Typography>
            </Box>
            <ServiceCards services={SERVICES} />
        </Container>
    );
};

export default ServicesPage;
