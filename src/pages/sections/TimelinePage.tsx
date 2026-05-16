import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent } from '@mui/material';

const TIMELINE = [
    {
        title: 'Nexteir Technologies | Full Stack Developer (Backend Focused)',
        time: 'April 2026 – Present',
        detail: 'Owned and optimized core backend services, microservices architecture, and database schemas using Node.js, TypeScript, and PostgreSQL. Collaborated on scaling system infrastructure to handle increased user loads securely.',
    },
    {
        title: 'Nexteir Technologies | Full Stack Engineering Intern',
        time: 'January 2026 – April 2026',
        detail: 'Developed end-to-end features using the TypeScript/Node.js stack, demonstrating strong architectural intuition. Proved high technical capability in optimizing database queries and API response times, leading to a swift full-time return offer.',
    },
    {
        title: 'LibSpace (Self-Started SaaS Platform) | Founder & Lead Architect',
        time: '2025 – Present',
        detail: 'Engineered a secure, multi-tenant database architecture using Prisma and PostgreSQL to keep institutional data completely isolated. Implemented custom, high-utility features including QR-code-based autonomous attendance systems and robust role-based access controls (RBAC).',
    },
    {
        title: 'Ekalsutra Edtech Pvt. Ltd. | Web Developer Intern',
        time: 'October 2023 – December 2023',
        detail: 'Developed a 15-module Admin Panel from Figma designs, improving workflow efficiency. Secured 20+ routes using JWT authentication mechanisms. Improved code quality in a 4-person team, contributing to a 15% increase in pre-deployment issue detection through rigorous peer code reviews. Optimized frontend performance using Lazy Loading and efficient API integrations.',
    },
];

const TimelinePage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 10 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700 }}>
                    Experience Timeline
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                    A chronological view of roles and responsibilities.
                </Typography>
            </Box>
            <Stack spacing={2}>
                {TIMELINE.map((item) => (
                    <Card key={item.title} sx={{ border: '1px solid rgba(255, 255, 255, 0.08)', bgcolor: 'background.paper' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{item.detail}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default TimelinePage;
