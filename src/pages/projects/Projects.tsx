import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    images?: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Streamlet | A Microservices-Based Video Streaming Platform",
        description: "A microservices-based video streaming platform built with modern technologies for scalability and performance.",
        technologies: ["Node.js", "PostgreSQL", "Express", "MongoDB", "Docker", "Next.js"],
        images: [
            "/rahulkbharti/projects/streamlet3-home.png",
            "/rahulkbharti/projects/streamlet1-home.png",
            "/rahulkbharti/projects/streamlet2-player.png",
        ],
        githubUrl: "https://github.com/rahulkbharti/streamlet-microservices.git",
        liveUrl: "https://streamlet.rahulkbharti.me"
    },
    {
        id: 2,
        title: "Nexus Core | Multi-Tenant SaaS ERP for Library System",
        description: "A comprehensive ERP solution designed for library management, featuring user authentication, role-based access, and real-time analytics.",
        technologies: ["Node.js", "React.js", "Docker", "Redis", "jwt", "Configurable RBAC", "PostgreSQL", "Prisma ORM"],
        images: [
            "/rahulkbharti/projects/nexuscore3.png",
            "/rahulkbharti/projects/nexuscore1-dark.png",
            "/rahulkbharti/projects/nexuscore2-light.png",
        ],
        githubUrl: "https://github.com/rahulkbharti/nexus-core-backend.git",
        liveUrl: "https://nexuscore.rahulkbharti.me"
    },
    {
        id: 3,
        title: "MeshTalk | Peer-to-Peer Real-Time Video Chat App",
        description: "A peer-to-peer video chat application built with WebRTC and modern web technologies.",
        technologies: ["TypeScript", "React", "WebRTC", "Node.js", "Socket.io"],
        images: [
            "/rahulkbharti/projects/meshtalk.png",
        ],
        githubUrl: "https://github.com/rahulkbharti/mesh-talk.git",
        liveUrl: "https://real-time-video-chat.onrender.com"
    },
];

const Projects: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }} id="works">
            {/* Page Header */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        mb: 2,
                        fontWeight: 'bold'
                    }}
                >
                    <Box component="span" sx={{ color: 'primary.main' }}>#</Box>Projects
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    List of my projects
                </Typography>
            </Box>

            {/* Decorative Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    border: '2px solid #C86DD7',
                    top: 100,
                    right: '10%',
                    zIndex: 0,
                    opacity: 0.2,
                    display: { xs: 'none', md: 'block' }
                }}
            />

            {/* Projects Grid */}
            <Grid container spacing={4}>
                {PROJECTS.map((project) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: 'background.paper',
                                border: '1px solid #444',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 24px rgba(200, 109, 215, 0.2)',
                                    borderColor: 'primary.main'
                                }
                            }}
                        >
                            {/* Project Image Slider */}
                            {project.images && project.images.length > 0 && (
                                <Box
                                    sx={{
                                        position: 'relative',
                                        '& .swiper': {
                                            height: 200,
                                        },
                                        '& .swiper-pagination-bullet': {
                                            bgcolor: 'rgba(200, 109, 215, 0.4)',
                                        },
                                        '& .swiper-pagination-bullet-active': {
                                            bgcolor: 'primary.main',
                                        },
                                    }}
                                >
                                    <Swiper
                                        modules={[Pagination, Autoplay]}
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                        loop={project.images.length > 1}
                                        style={{ height: 200 }}
                                    >
                                        {project.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <Box
                                                    component="img"
                                                    src={img}
                                                    alt={`${project.title} screenshot ${idx + 1}`}
                                                    sx={{
                                                        width: '100%',
                                                        height: 200,
                                                        objectFit: 'cover',
                                                        bgcolor: '#2a2d32',
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>
                            )}

                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                {/* Project Title */}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    {project.title}
                                </Typography>

                                {/* Project Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        mb: 2,
                                        flexGrow: 1
                                    }}
                                >
                                    {project.description}
                                </Typography>

                                {/* Technologies */}
                                <Box sx={{ mb: 2 }}>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {project.technologies.map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'rgba(200, 109, 215, 0.1)',
                                                    color: 'primary.main',
                                                    border: '1px solid rgba(200, 109, 215, 0.3)',
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                    {project.liveUrl && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<LaunchIcon />}
                                            href={project.liveUrl}
                                            target="_blank"
                                            sx={{
                                                flex: 1,
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    borderColor: 'primary.light',
                                                    bgcolor: 'rgba(200, 109, 215, 0.1)'
                                                }
                                            }}
                                        >
                                            Live
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<GitHubIcon />}
                                            href={project.githubUrl}
                                            target="_blank"
                                            sx={{
                                                flex: 1,
                                                borderColor: '#444',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    borderColor: '#666',
                                                    bgcolor: 'rgba(255, 255, 255, 0.05)'
                                                }
                                            }}
                                        >
                                            GitHub
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Decorative bottom square */}
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
        </Container>
    );
};

export default Projects;
