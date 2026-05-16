import React from 'react';
import { Container, Typography, Stack, Card, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AvailabilityPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                            Availability and CTA
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            I am currently accepting select opportunities for full-time backend/full-stack roles, as well as high-impact technical consulting.
                            If you are looking for an engineer who treats your codebase like a product and values system reliability above all else, let’s talk.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button variant="contained" component={RouterLink} to="/#contact">
                                Contact me
                            </Button>
                            <Button variant="outlined" href="mailto:rahul.kbharti2002@gmail.com">
                                Email directly
                            </Button>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="outlined"
                                href="https://drive.google.com/file/d/1EmUKATJ4TNC5cv098bKfTxZuttCY5Ukw/view?usp=drive_link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Download My Resume
                            </Button>
                            <Button variant="outlined" component={RouterLink} to="/#contact">
                                Schedule a Technical Discovery Call
                            </Button>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Email: rahul.kbharti2002@gmail.com
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                GitHub: https://github.com/rahulkbharti
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                LinkedIn: https://www.linkedin.com/in/rahul-kbharti
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AvailabilityPage;
