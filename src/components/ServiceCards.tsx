import React from 'react';
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import type { ServiceOffering } from '../data/services';

interface ServiceCardsProps {
    services: ServiceOffering[];
}

const iconMap = {
    'backend-api-engineering': ApiIcon,
    'saas-mvp-development': RocketLaunchIcon,
    'database-performance': SpeedIcon,
    'ai-workflow-integration': AutoAwesomeIcon,
    'media-streaming-pipelines': VideoSettingsIcon,
    'full-stack-product-delivery': CodeIcon,
    'deployment-ops': CloudUploadIcon,
} as const;

const ServiceCards: React.FC<ServiceCardsProps> = ({ services }) => {
    return (
        <Grid container spacing={3}>
            {services.map((service) => {
                const Icon = iconMap[service.id as keyof typeof iconMap] ?? StorageIcon;

                return (
                    <Grid key={service.id} size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card
                            sx={{
                                position: 'relative',
                                height: '100%',
                                overflow: 'hidden',
                                bgcolor: 'background.paper',
                                border: service.featured
                                    ? '1px solid rgba(255, 180, 84, 0.7)'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: service.featured ? '0 18px 40px rgba(255, 180, 84, 0.14)' : 'none',
                            }}
                        >
                            {service.featured && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: -36,
                                        width: 140,
                                        py: 0.5,
                                        textAlign: 'center',
                                        transform: 'rotate(45deg)',
                                        bgcolor: 'primary.main',
                                        color: 'background.default',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Featured
                                </Box>
                            )}

                            <CardContent
                                sx={{
                                    minHeight: 280,
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'rgba(255, 180, 84, 0.1)',
                                        color: 'primary.main',
                                        border: '1px solid rgba(255, 180, 84, 0.18)',
                                    }}
                                >
                                    <Icon />
                                </Box>

                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                                        {service.detail}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center" sx={{ mt: 'auto' }}>
                                    {service.skills.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(255, 255, 255, 0.06)',
                                                color: 'text.secondary',
                                                border: '1px solid rgba(255, 255, 255, 0.14)',
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ServiceCards;
