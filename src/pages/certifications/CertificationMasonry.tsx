import React, { useState } from 'react';
import { Box, Dialog, IconButton, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { Certification } from '../../data/certifications';

interface CertificationMasonryProps {
    certifications: Certification[];
    featured?: boolean;
}

const CertificationMasonry: React.FC<CertificationMasonryProps> = ({ certifications, featured = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const columns = isMobile ? 1 : isTablet ? 2 : 3;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const certificationsWithImages = certifications.filter((certification) => certification.imageUrl);
    const selected = selectedIndex === null ? null : certificationsWithImages[selectedIndex] ?? null;
    const selectedImage = selected?.imageUrl;
    const canNavigate = certificationsWithImages.length > 1;

    const handlePrevious = () => {
        setSelectedIndex((current) => {
            if (current === null) {
                return current;
            }

            return current === 0 ? certificationsWithImages.length - 1 : current - 1;
        });
    };

    const handleNext = () => {
        setSelectedIndex((current) => {
            if (current === null) {
                return current;
            }

            return current === certificationsWithImages.length - 1 ? 0 : current + 1;
        });
    };

    if (certificationsWithImages.length === 0) {
        return null;
    }

    return (
        <>
            <ImageList variant="masonry" cols={columns} gap={16} sx={{ m: 0 }}>
                {certificationsWithImages.map((certification, index) => (
                    <ImageListItem
                        key={certification.id}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            border: featured
                                ? '1px solid rgba(255, 180, 84, 0.32)'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: featured ? '0 12px 30px rgba(255, 180, 84, 0.12)' : 'none',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            component="button"
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            sx={{
                                width: '100%',
                                p: 0,
                                m: 0,
                                display: 'block',
                                border: 0,
                                bgcolor: 'transparent',
                                cursor: 'zoom-in',
                                borderRadius: 1,
                            }}
                        >
                            <Box
                                component="img"
                                src={certification.imageUrl}
                                alt={certification.imageAlt ?? `${certification.title} certificate`}
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: 1,
                                }}
                            />
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>

            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedIndex(null)}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') {
                        event.preventDefault();
                        handlePrevious();
                    }

                    if (event.key === 'ArrowRight') {
                        event.preventDefault();
                        handleNext();
                    }
                }}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    },
                }}
            >
                <IconButton
                    aria-label="Close certificate preview"
                    onClick={() => setSelectedIndex(null)}
                    sx={{
                        position: 'absolute',
                        top: { xs: -44, sm: -48 },
                        right: { xs: 0, sm: -4 },
                        color: 'white',
                        bgcolor: 'rgba(15, 17, 21, 0.82)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        '&:hover': {
                            bgcolor: 'rgba(15, 17, 21, 0.96)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {canNavigate && (
                    <>
                        <IconButton
                            aria-label="Previous certificate"
                            onClick={handlePrevious}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: { xs: 8, sm: -58 },
                                transform: 'translateY(-50%)',
                                color: 'white',
                                bgcolor: 'rgba(15, 17, 21, 0.82)',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                '&:hover': {
                                    bgcolor: 'rgba(15, 17, 21, 0.96)',
                                },
                            }}
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>

                        <IconButton
                            aria-label="Next certificate"
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: { xs: 8, sm: -58 },
                                transform: 'translateY(-50%)',
                                color: 'white',
                                bgcolor: 'rgba(15, 17, 21, 0.82)',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                '&:hover': {
                                    bgcolor: 'rgba(15, 17, 21, 0.96)',
                                },
                            }}
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </>
                )}

                {selectedImage && (
                    <Box
                        component="img"
                        src={selectedImage}
                        alt={selected.imageAlt ?? `${selected.title} certificate`}
                        sx={{
                            width: '100%',
                            maxHeight: '82vh',
                            objectFit: 'contain',
                            display: 'block',
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                    />
                )}
            </Dialog>
        </>
    );
};

export default CertificationMasonry;
