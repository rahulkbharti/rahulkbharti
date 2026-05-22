import React from 'react';
import { Box, Container, Grid, Typography, Button, Link } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { TypingEffect } from '../../components/TypingEffect';
import Projects from '../projects/Projects';
import Skills from '../skills/Skills';
import Highlights from './Highlights';
import Certifications from '../certifications/Certifications';
import Contact from '../contact/Contact';
import BlogList from '../blog/BlogList';

const FULL_NAME = "Rahul Bharti";
const MY_ROLES = [
    "Backend Engineer",
    "SaaS Architect",
    "Platform Builder",
    "AI Integrations"
];

const Home: React.FC = () => {
    return (
        <>
            <Container id="home" maxWidth="lg" sx={{ flexGrow: 1, margin: "0 auto", py: { xs: 4, md: 10 } }}>
                <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">

                    {/* Left Column: Hero Text */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ px: { xs: 1, md: 2 } }}>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 1.5,
                                    py: 0.6,
                                    borderRadius: 999,
                                    border: '1px solid rgba(255, 180, 84, 0.35)',
                                    bgcolor: 'rgba(255, 180, 84, 0.08)',
                                    color: 'primary.main',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                }}
                            >
                                Open to backend and platform roles
                            </Box>

                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.4rem', md: '3.4rem' },
                                    fontWeight: 700,
                                    lineHeight: 1.05,
                                    mt: 2
                                }}
                            >
                                I build calm, resilient backend systems for ambitious products.
                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    color: 'text.secondary',
                                    mt: 2
                                }}
                            >
                                Hello, I'm <Box component="span" sx={{ color: 'primary.main' }}>{FULL_NAME}</Box>. I design scalable services,
                                clean data pipelines, and AI-ready platforms that stay fast under real-world load.
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 3 }}>
                                From API design to observability, I care about the invisible details that make your product feel effortless.
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                [<TypingEffect roles={MY_ROLES} />]
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                                <Button variant="contained" component={Link} href="#contact">
                                    Book a call
                                </Button>
                                <Button variant="outlined" component={Link} href="#works">
                                    View projects
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, mt: 5, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Production apps shipped', value: '12+' },
                                    { label: 'Avg. API latency wins', value: '35%' },
                                    { label: 'Years building platforms', value: '4+' },
                                ].map((item) => (
                                    <Box key={item.label} sx={{ minWidth: 140 }}>
                                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                            {item.value}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.03em' }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Column: Image & Banner */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: -24,
                                    borderRadius: 6,
                                    background: 'linear-gradient(140deg, rgba(255, 180, 84, 0.18), rgba(93, 214, 193, 0.16))',
                                    filter: 'blur(32px)',
                                    opacity: 0.8,
                                    zIndex: 0,
                                }}
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 120,
                                    height: 120,
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255, 180, 84, 0.3)',
                                    top: -10,
                                    left: '6%',
                                    zIndex: 1,
                                    opacity: 0.4,
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 90,
                                    height: 90,
                                    borderRadius: '50%',
                                    border: '1px solid rgba(93, 214, 193, 0.35)',
                                    bottom: 10,
                                    right: '4%',
                                    zIndex: 1,
                                    opacity: 0.4,
                                }}
                            />

                            <Box
                                component="img"
                                src="/rahulkbharti/easlo-laptop.svg"
                                alt="Laptop illustration"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    position: 'relative',
                                    zIndex: 2,
                                    borderRadius: 4,
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.45)',
                                    filter: 'grayscale(20%) contrast(1.05)',
                                }}
                            />

                            <Box
                                sx={{
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    p: 2.5,
                                    mt: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    zIndex: 3,
                                    background: 'rgba(15, 17, 21, 0.8)',
                                    borderRadius: 2,
                                    position: { xs: 'absolute', md: 'relative' },
                                    bottom: { xs: 16, md: 'auto' },
                                    left: { xs: 16, md: 'auto' },
                                    right: { xs: 16, md: 'auto' },
                                    backdropFilter: { xs: 'blur(6px)', md: 'none' }
                                }}
                            >
                                <Box sx={{ width: 10, height: 10, bgcolor: 'secondary.main', borderRadius: '50%', flexShrink: 0 }} />
                                <Box>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                        Currently shipping
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                        Nexus Core platform refresh
                                    </Typography>
                                </Box>
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
                    <FormatQuoteIcon sx={{ position: 'absolute', top: -16, left: 24, fontSize: '2rem', color: 'rgba(255, 180, 84, 0.4)', transform: 'scaleX(-1)' }} />
                    <Typography variant="h6" sx={{ color: 'white', fontStyle: 'italic', textAlign: 'center' }}>
                        Good systems feel boring. I build the boring parts well.
                    </Typography>
                    <FormatQuoteIcon sx={{ position: 'absolute', bottom: -16, right: 24, fontSize: '2rem', color: 'rgba(93, 214, 193, 0.4)' }} />
                    <Typography sx={{ color: 'text.secondary', textAlign: 'right', mt: 2, mr: 2 }}>
                        - Rahul Bharti
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
                border: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: -1,
            }} />
            <Skills />
            <Projects />
            <Certifications />
            <Highlights />
            <BlogList />
            <Contact />
        </>
    );
};

export default Home;
