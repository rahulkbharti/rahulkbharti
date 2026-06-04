import React from 'react';
import { Box, Container, Grid, Typography, Button, Link, Stack } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DnsIcon from '@mui/icons-material/Dns';
import HubIcon from '@mui/icons-material/Hub';
import StorageIcon from '@mui/icons-material/Storage';
import { TypingEffect } from '../../components/TypingEffect';
import Projects from '../projects/Projects';
import Skills from '../skills/Skills';
import Highlights from './Highlights';
import Contact from '../contact/Contact';
import BlogList from '../blog/BlogList';

const FULL_NAME = "Rahul Bharti";
const MY_ROLES = [
    "Backend Engineer",
    "SaaS Architect",
    "Platform Builder",
    "AI Integrations"
];

const SystemNode: React.FC<{
    icon: React.ReactNode;
    label: string;
    meta: string;
    accent?: 'primary' | 'secondary';
}> = ({ icon, label, meta, accent = 'secondary' }) => (
    <Box
        sx={{
            minWidth: 0,
            border: '1px solid',
            borderColor: accent === 'primary' ? 'rgba(73, 242, 165, 0.28)' : 'rgba(87, 199, 255, 0.23)',
            bgcolor: accent === 'primary' ? 'rgba(73, 242, 165, 0.045)' : 'rgba(87, 199, 255, 0.035)',
            px: 1.25,
            py: 1.15,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: accent === 'primary' ? 'primary.main' : 'secondary.main',
            },
        }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: accent === 'primary' ? 'primary.main' : 'secondary.main', display: 'flex' }}>
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography
                    sx={{
                        color: 'text.primary',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: 'text.secondary',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.58rem',
                        mt: 0.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {meta}
                </Typography>
            </Box>
        </Stack>
    </Box>
);

const FlowConnector: React.FC<{ label: string }> = ({ label }) => (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ py: 0.7 }}>
        <Box sx={{ height: 1, flex: 1, bgcolor: 'rgba(87, 199, 255, 0.16)' }} />
        <Typography
            sx={{
                color: 'text.secondary',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.08em',
            }}
        >
            {label}
        </Typography>
        <Box sx={{ height: 1, flex: 1, bgcolor: 'rgba(87, 199, 255, 0.16)' }} />
    </Stack>
);

const BackendTopology: React.FC = () => (
    <Box
        sx={{
            position: 'relative',
            border: '1px solid rgba(87, 199, 255, 0.24)',
            bgcolor: 'rgba(5, 10, 16, 0.92)',
            boxShadow: '0 28px 80px rgba(0, 0, 0, 0.48), 0 0 60px rgba(87, 199, 255, 0.05)',
            overflow: 'hidden',
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(125deg, rgba(73, 242, 165, 0.035), transparent 35%, rgba(87, 199, 255, 0.035))',
            },
        }}
    >
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                px: 1.75,
                py: 1.15,
                borderBottom: '1px solid rgba(87, 199, 255, 0.16)',
                bgcolor: 'rgba(87, 199, 255, 0.025)',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={0.75}>
                {['#ff6b6b', '#f7c948', '#49f2a5'].map((color) => (
                    <Box key={color} sx={{ width: 7, height: 7, bgcolor: color, opacity: 0.85 }} />
                ))}
                <Typography
                    sx={{
                        pl: 0.75,
                        color: 'text.secondary',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.62rem',
                    }}
                >
                    production.topology
                </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.7}>
                <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', boxShadow: '0 0 10px rgba(73, 242, 165, 0.8)' }} />
                <Typography sx={{ color: 'primary.main', fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.58rem' }}>
                    HEALTHY
                </Typography>
            </Stack>
        </Stack>

        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <SystemNode icon={<ApiIcon sx={{ fontSize: 17 }} />} label="api-gateway" meta="HTTPS :443 / rate-limited" accent="primary" />
            <FlowConnector label="ROUTE + AUTH" />
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 0.8 }}>
                <SystemNode icon={<DnsIcon sx={{ fontSize: 16 }} />} label="auth-svc" meta="JWT / RBAC" />
                <SystemNode icon={<HubIcon sx={{ fontSize: 16 }} />} label="core-svc" meta="tenant scoped" />
                <SystemNode icon={<CloudQueueIcon sx={{ fontSize: 16 }} />} label="job-worker" meta="async queue" />
            </Box>
            <FlowConnector label="DATA LAYER" />
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 0.8 }}>
                <SystemNode icon={<StorageIcon sx={{ fontSize: 16 }} />} label="postgres" meta="primary / replica" accent="primary" />
                <SystemNode icon={<DnsIcon sx={{ fontSize: 16 }} />} label="redis" meta="cache / queue" accent="primary" />
                <SystemNode icon={<StorageIcon sx={{ fontSize: 16 }} />} label="object-store" meta="media / assets" accent="primary" />
            </Box>
        </Box>

        <Box
            sx={{
                borderTop: '1px solid rgba(87, 199, 255, 0.16)',
                px: 1.75,
                py: 1.3,
                bgcolor: 'rgba(2, 6, 10, 0.82)',
            }}
        >
            {[
                ['12:08:41', 'GET /api/v1/tenants', '200', '42ms'],
                ['12:08:40', 'queue.transcode', 'active', '4 jobs'],
                ['12:08:39', 'db.replica', 'healthy', 'lag 8ms'],
            ].map(([time, event, status, latency]) => (
                <Box
                    key={`${time}-${event}`}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '58px minmax(0, 1fr) 45px 45px',
                        gap: 0.7,
                        py: 0.35,
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.56rem',
                        color: 'text.secondary',
                    }}
                >
                    <Box component="span" sx={{ color: '#536575' }}>{time}</Box>
                    <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event}</Box>
                    <Box component="span" sx={{ color: 'primary.main' }}>{status}</Box>
                    <Box component="span" sx={{ textAlign: 'right', color: 'secondary.main' }}>{latency}</Box>
                </Box>
            ))}
        </Box>
    </Box>
);

const Home: React.FC = () => {
    return (
        <>
            <Container id="home" maxWidth="lg" sx={{ flexGrow: 1, margin: "0 auto", py: { xs: 5, md: 11 } }}>
                <Grid container spacing={{ xs: 4, md: 10 }} alignItems="center">

                    {/* Left Column: Hero Text */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ px: { xs: 1, md: 2 } }}>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 1.25,
                                    py: 0.65,
                                    borderRadius: 1,
                                    border: '1px solid rgba(73, 242, 165, 0.3)',
                                    bgcolor: 'rgba(73, 242, 165, 0.045)',
                                    color: 'primary.main',
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    '&::before': {
                                        content: '""',
                                        width: 6,
                                        height: 6,
                                        bgcolor: 'primary.main',
                                        boxShadow: '0 0 12px rgba(73, 242, 165, 0.75)',
                                    },
                                }}
                            >
                                system.available = true
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
                                I build <Box component="span" sx={{ color: 'primary.main' }}>backend systems</Box> that survive production.
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
                                <Box component="span" sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono", monospace' }}>$ role --current </Box>
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

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }, gap: 1, mt: 5 }}>
                                {[
                                    { label: 'services.shipped', value: '12+' },
                                    { label: 'latency.reduced', value: '35%' },
                                    { label: 'uptime.mindset', value: '24/7' },
                                ].map((item) => (
                                    <Box
                                        key={item.label}
                                        sx={{
                                            minWidth: 0,
                                            border: '1px solid rgba(87, 199, 255, 0.14)',
                                            bgcolor: 'rgba(7, 13, 20, 0.64)',
                                            px: 1.4,
                                            py: 1.2,
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1rem' }}>
                                            {item.value}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.58rem' }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Column: Backend system topology */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
                            <Box sx={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle, rgba(87, 199, 255, 0.09), transparent 62%)', filter: 'blur(20px)' }} />
                            <Box sx={{ position: 'relative' }}>
                                <BackendTopology />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* --- Engineering principle (Desktop only) --- */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' }, // Hide on mobile
                    py: 6,
                    px: 4,
                    mt: 'auto', // Pushes to the bottom
                }}
            >
                <Box sx={{
                    border: '1px solid rgba(87, 199, 255, 0.16)',
                    borderLeft: '2px solid',
                    borderLeftColor: 'primary.main',
                    bgcolor: 'rgba(5, 10, 16, 0.68)',
                    p: 3,
                    position: 'relative',
                    maxWidth: '680px',
                    margin: '0 auto',
                }}>
                    <Typography sx={{ color: 'secondary.main', fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.65rem', mb: 1 }}>
                        // engineering-principle.ts
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.95rem' }}>
                        const goodSystem = reliable + observable + boringInProduction;
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
            <Highlights />
            <BlogList />
            <Contact />
        </>
    );
};

export default Home;
