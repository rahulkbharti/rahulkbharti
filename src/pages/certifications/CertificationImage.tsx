import React from 'react';
import { Box } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

interface CertificationImageProps {
    src?: string;
    alt: string;
    compact?: boolean;
}

const CertificationImage: React.FC<CertificationImageProps> = ({ src, alt, compact = false }) => {
    const height = compact ? { xs: 180, md: 160 } : { xs: 210, md: 260 };

    return (
        <Box
            component="a"
            href={src ?? undefined}
            target="_blank"
            rel="noreferrer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                pointerEvents: src ? 'auto' : 'none',
            }}
        >
            {src ? (
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    loading="lazy"
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            ) : (
                <WorkspacePremiumIcon sx={{ color: 'primary.main', fontSize: compact ? 44 : 56, opacity: 0.9 }} />
            )}
        </Box>
    );
};

export default CertificationImage;
