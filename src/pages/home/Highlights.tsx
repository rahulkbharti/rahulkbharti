import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Card,
    CardContent,
    Grid,
    Button,
    Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ServiceCards from '../../components/ServiceCards';
import { SERVICES } from '../../data/services';

const ACHIEVEMENTS = [
    "Top 0.5% in TCS CodeVita (2024): Achieved a global rank of 1,961 out of over 537,000+ global participants in one of the world's largest competitive coding competitions.",
    "Google Cloud Generative AI Virtual Internship: Completed a intensive, 2-month project-based program focused on designing, deploying, and scaling practical Generative AI solutions directly on the Google Cloud Platform.",
    'Architected & Scaled LibSpace: Successfully built and launched a production-ready, multi-tenant library ERP system from scratch, scaling it to secure paid institutional contracts.',
    'Production Media Pipelines: Designed and deployed a resilient, real-time video transcoding and streaming infrastructure handling live classrooms with automated FFmpeg processing.',
    'Play Store Deployment: Successfully navigated and fulfilled Google Play’s strict 20-tester closed testing guidelines to launch a student-centric mobile application.',
    'Internship-to-Full-Time Transition: Fast-tracked from a Full Stack Internship to a permanent, full-time engineering role at Nexteir Technologies due to high performance and backend ownership.',
];
const TIMELINE = [
    {
        title: 'Nexteir Technologies | Full Stack Developer (Backend Focused) · April 2026 – Present',
        detail: 'Owned and optimized core backend services, microservices architecture, and database schemas using Node.js, TypeScript, and PostgreSQL. Collaborated on scaling system infrastructure to handle increased user loads securely.',
    },
    {
        title: 'Nexteir Technologies | Full Stack Engineering Intern · January 2026 – April 2026',
        detail: 'Developed end-to-end features using the TypeScript/Node.js stack, demonstrating strong architectural intuition. Proved high technical capability in optimizing database queries and API response times, leading to a swift full-time return offer.',
    },
    {
        title: 'LibSpace (Self-Started SaaS Platform) | Founder & Lead Architect · May 2025 – November 2025',
        detail: 'Engineered a secure, multi-tenant database architecture using Prisma and PostgreSQL to keep institutional data completely isolated. Implemented custom, high-utility features including QR-code-based autonomous attendance systems and robust role-based access controls (RBAC).',
    },
    {
        title: 'Ekalsutra Edtech Pvt. Ltd. | Web Developer Intern · Oct. 2023 – Dec. 2023',
        detail: 'Developed a 15-module Admin Panel from Figma designs, improving workflow efficiency. Secured 20+ routes using JWT authentication. Improved code quality by 15% through peer reviews and optimized performance using Lazy Loading.',
    },
];

const METRICS = [
    { label: 'Data Isolation', value: '99.9%' },
    { label: 'Reduction in Latency', value: '30%' },
    { label: 'Paid Validation', value: '0 to paid' },
    { label: 'Automated Workflows', value: '100%' },
];

const OPEN_SOURCE = [
    'Autonomous Visitor Management System (VMS): Developer of an open-architected, role-based building management system built to handle granular multi-tier authorization.',
    'Custom Video Transcoding Pipeline: Open-sourced a lightweight boilerplate for integrating SRS (Simple Realtime Server) and FFmpeg for developers looking to build localized live-streaming solutions.',
];

const TALKS_WRITING = [
    'Architecting True Multi-Tenancy in Node.js with Prisma and PostgreSQL (Forthcoming / Blog)',
    'Building Resilient Video Pipelines Without Breaking the Bank: A Bunny.net & FFmpeg Guide (Blog)',
];

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

const Highlights: React.FC = () => {
    return (
        <>
            <Container id="achievements" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Key Achievements
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 760 }}>
                        Overview of the outcomes that define my backend and product work.
                    </Typography>
                </Box>
                <Stack spacing={2}>
                    {ACHIEVEMENTS.map((item) => {
                        const [text, buttonText] = item.split('$$');
                        return (
                            <Card key={item} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                                <CardContent>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>{text}</Typography>
                                        {buttonText && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                href="#"
                                                target="_blank"
                                                sx={{ whiteSpace: 'nowrap' }}
                                            >
                                                {buttonText}
                                            </Button>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Stack>
                <Button variant="outlined" component={RouterLink} to="/achievements" sx={{ mt: 3 }}>
                    View all achievements
                </Button>
            </Container>

            <Container id="timeline" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Experience Timeline
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Where I have focused and what I delivered.
                    </Typography>
                </Box>
                <Stack spacing={2}>
                    {TIMELINE.map((item) => (
                        <Card key={item.title} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{item.detail}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
                <Button variant="outlined" component={RouterLink} to="/timeline" sx={{ mt: 3 }}>
                    View full timeline
                </Button>
            </Container>

            <Container id="metrics" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Impact Metrics
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Measurable results across systems and delivery.
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {METRICS.map((metric) => (
                        <Grid key={metric.label} size={{ xs: 6, md: 3 }}>
                            <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                                <CardContent>
                                    <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                                        {metric.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                        {metric.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="outlined" component={RouterLink} to="/metrics" sx={{ mt: 3 }}>
                    View metric details
                </Button>
            </Container>

            <Container id="services" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 800,
                            letterSpacing: '0.16em',
                        }}
                    >
                        Services
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Services
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 760 }}>
                        Focused ways I can help you ship reliable backends, SaaS products, AI workflows, and full stack product features.
                    </Typography>
                </Box>
                <ServiceCards services={SERVICES.slice(0, 6)} />
                <Button variant="outlined" component={RouterLink} to="/services" sx={{ mt: 3 }}>
                    View services
                </Button>
            </Container>

            <Container id="open-source" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Open Source
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Projects and experiments shared with the community.
                    </Typography>
                </Box>
                <Stack spacing={2}>
                    {OPEN_SOURCE.map((item) => (
                        <Typography key={item} variant="body1" sx={{ color: 'text.secondary' }}>{item}</Typography>
                    ))}
                </Stack>
                <Button variant="outlined" component={RouterLink} to="/open-source" sx={{ mt: 3 }}>
                    View open source
                </Button>
            </Container>

            <Container id="talks" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Talks and Writing
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Research notes, guides, and upcoming articles.
                    </Typography>
                </Box>
                <Stack spacing={2}>
                    {TALKS_WRITING.map((item) => (
                        <Typography key={item} variant="body1" sx={{ color: 'text.secondary' }}>{item}</Typography>
                    ))}
                </Stack>
                <Button variant="outlined" component={RouterLink} to="/talks" sx={{ mt: 3 }}>
                    View writing and talks
                </Button>
            </Container>

            <Container id="testimonials" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700 }}>
                        Testimonials
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                        Feedback from people I have worked with.
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
                <Button variant="outlined" component={RouterLink} to="/testimonials" sx={{ mt: 3 }}>
                    View testimonials
                </Button>
            </Container>

            <Container id="availability" maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Availability and CTA
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                I am currently accepting select opportunities for full-time backend/full-stack roles, as well as high-impact technical consulting.
                                If you are looking for an engineer who treats your codebase like a product and values system reliability above all else, let’s talk.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant="contained"
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
                        </Stack>
                    </CardContent>
                </Card>
                <Button variant="outlined" component={RouterLink} to="/availability" sx={{ mt: 3 }}>
                    View availability
                </Button>
            </Container>
        </>
    );
};

export default Highlights;
