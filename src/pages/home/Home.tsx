import React from 'react';
import { Box, Container, Grid, Typography, Button, Link } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { TypingEffect } from '../../components/TypingEffect';
import Projects from '../projects/Projects';
import Skills from '../skills/Skills';
import Contact from '../contact/Contact';
import BlogList from '../blog/BlogList';

const FULL_NAME = "Rahul Kumar Bharti";
const MY_ROLES = [
    "Software Developer",
    "MERN Stack",
    "SaaS Architect",
    "Microservices"
];

const Home: React.FC = () => {
    return (
        <>
            <Container maxWidth="lg" sx={{ flexGrow: 1, margin: "0 auto", py: { xs: 3, md: 8 } }}>
                <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

                    {/* Left Column: Hero Text */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ px: { xs: 1, md: 2 } }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3rem' }, // Naam ko bada karein
                                    fontWeight: 700,
                                    lineHeight: 1.2
                                }}
                            >
                                Hey, I'm
                                <Box component="span" sx={{ color: 'primary.main' }}> {FULL_NAME}</Box>.
                            </Typography>

                            <Typography
                                variant="h3" // Ise h2 banayein
                                sx={{
                                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                                    color: 'text.secondary', // Role ko thoda subtle karein
                                    mt: 1
                                }}
                            >
                                Full Stack Developer & AI Engineer.
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 3 }}>
                                I build and scale end-to-end, intelligent SaaS platforms. Expert in architecting microservice-based MERN applications and deploying advanced NLP models from research to production.
                            </Typography>
                            <Typography variant='body1'>[<TypingEffect roles={MY_ROLES} />]</Typography>
                            {/* New "Contact me" button for desktop */}
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                href="#contact"
                                sx={{
                                    mt: 4,
                                    display: { xs: 'none', md: 'inline-flex' } // Hide on mobile
                                }}
                            >
                                Contact me !!
                            </Button>
                        </Box>
                    </Grid>

                    {/* Right Column: Image & Banner */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                            {/* Decorative Squares */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 100,
                                    height: 100,
                                    border: '2px solid #C86DD7',
                                    top: 20,
                                    left: '10%',
                                    zIndex: 0,
                                    opacity: 0.3,
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 100,
                                    height: 100,
                                    border: '2px solid #C86DD7',
                                    top: 40,
                                    left: '15%',
                                    zIndex: 0,
                                    opacity: 0.3,
                                }}
                            />
                            {/* Decorative Dots */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 80,
                                    height: 80,
                                    top: 50,
                                    right: '10%',
                                    zIndex: 0,
                                    background: 'radial-gradient(#fff 1.5px, transparent 1.5px)',
                                    backgroundSize: '10px 10px',
                                    opacity: 0.2,
                                }}
                            />
                            {/* Main Image Placeholder */}
                            <Box
                                component="img"
                                src="/rahulkbharti/s.png"
                                alt="A person in a hoodie"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'grayscale(80%) contrast(1.1)',
                                }}
                            />

                            {/* Bottom Banner (Repositioned) */}
                            <Box
                                sx={{
                                    border: '1px solid #555',
                                    p: 2,
                                    mt: 2, // Placed below image
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    zIndex: 2,
                                    background: 'rgba(33, 36, 40, 0.8)',
                                    borderRadius: 1,
                                    // On mobile, keep it at the bottom
                                    position: { xs: 'absolute', md: 'relative' },
                                    bottom: { xs: 16, md: 'auto' },
                                    left: { xs: 16, md: 'auto' },
                                    right: { xs: 16, md: 'auto' },
                                    backdropFilter: { xs: 'blur(5px)', md: 'none' }
                                }}
                            >
                                <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                                    Currently working on <Box component="span" sx={{ color: 'white', fontWeight: 'bold' }}>Portfolio</Box>
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* --- Quote Section (Desktop only) --- */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' }, // Hide on mobile
                    py: 6,
                    px: 4,
                    mt: 'auto', // Pushes to the bottom
                }}
            >
                <Box sx={{
                    border: '1px solid #444',
                    p: 4,
                    position: 'relative',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}>
                    <FormatQuoteIcon sx={{ position: 'absolute', top: -16, left: 24, fontSize: '2rem', color: '#777', transform: 'scaleX(-1)' }} />
                    <Typography variant="h6" sx={{ color: 'white', fontStyle: 'italic', textAlign: 'center' }}>
                        With great power comes great electricity bill
                    </Typography>
                    <FormatQuoteIcon sx={{ position: 'absolute', bottom: -16, right: 24, fontSize: '2rem', color: '#777' }} />
                    <Typography sx={{ color: '#999', textAlign: 'right', mt: 2, mr: 2 }}>
                        - Dr. Who
                    </Typography>
                </Box>
            </Box>

            {/* Decorative bottom-right square (Desktop only) */}
            <Box sx={{
                display: { xs: 'none', md: 'block' },
                position: 'fixed',
                bottom: 40,
                right: 40,
                width: 100,
                height: 100,
                border: '1px solid #444',
                zIndex: -1,
            }} />
            <Skills />
            <Projects />
            <BlogList />
            <Contact />
        </>
    );
};

export default Home;