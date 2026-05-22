import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { FEATURED_CERTIFICATIONS } from '../../data/certifications';
import CertificationMasonry from './CertificationMasonry';

const Certifications: React.FC = () => {
    const featured = FEATURED_CERTIFICATIONS.filter((certification) => certification.imageUrl).slice(0, 3);

    if (featured.length === 0) {
        return null;
    }

    return (
        <Container id="certifications" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontWeight: 'bold' }}
                >
                    Featured Certifications
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 760 }}>
                    Selected certificate previews.
                </Typography>
            </Box>

            <CertificationMasonry certifications={featured} featured />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button variant="outlined" component={RouterLink} to="/certifications" endIcon={<ArrowForwardIcon />}>
                    View all certifications
                </Button>
            </Box>
        </Container>
    );
};

export default Certifications;
