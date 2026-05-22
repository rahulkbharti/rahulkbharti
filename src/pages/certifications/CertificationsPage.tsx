import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { CERTIFICATIONS } from '../../data/certifications';
import CertificationMasonry from './CertificationMasonry';

const CertificationsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Certifications
                </Typography>
            </Box>

            <CertificationMasonry certifications={CERTIFICATIONS} />
        </Container>
    );
};

export default CertificationsPage;
