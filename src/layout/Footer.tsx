import React from 'react';
import { Box, Container, Typography, Stack, Link, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: '1px solid #444',
                py: 4,
                mt: 'auto',
                bgcolor: 'background.paper',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    {/* Top Section: Logo and Tagline */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'space-between' }}>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Box component="span" sx={{ color: 'primary.main' }}>Rahul</Box> Kumar Bharti
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                Full Stack Developer & AI Engineer
                            </Typography>
                        </Box>

                        {/* Social Links */}
                        <Stack direction="row" spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
                            <IconButton
                                href="https://github.com/rahulkbharti"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                <GitHubIcon />
                            </IconButton>
                            <IconButton
                                href="https://www.linkedin.com/in/rahul-kbharti"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton
                                href="mailto:rahul.kbharti2002@gmail.com"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                <EmailIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Divider sx={{ borderColor: '#333' }} />

                    {/* Bottom Section: Copyright and Links */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            gap: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            © {new Date().getFullYear()} Rahul Kumar Bharti. Made with{' '}
                            <FavoriteIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                        </Typography>

                        {/* Quick Links */}
                        <Stack direction="row" spacing={3}>
                            <Link
                                href="/rahulkbharti"
                                sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                href="/rahulkbharti/skills"
                                sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                Skills
                            </Link>
                            <Link
                                href="/rahulkbharti/projects"
                                sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                Projects
                            </Link>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
