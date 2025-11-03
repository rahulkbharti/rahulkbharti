import React, { useState } from 'react';
import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Stack,
    Link,
    GlobalStyles,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import { Outlet } from 'react-router-dom';
import DesktopSocialSidebar from './DesktopSocialSidebar';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import DesktopNav from './DesktopNav';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#212428', // Dark background from image
            paper: '#212428',
        },
        primary: {
            main: '#C86DD7', // Purple accent color from image
        },
        text: {
            primary: '#E0E0E0', // Light text
            secondary: '#A0A0A0', // Dimmer text
        },
    },
    typography: {
        fontFamily: '"Fira Code", monospace',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#FFFFFF',
        },
        body1: {
            fontSize: '1rem',
            color: '#A0A0A0',
        },
        h6: {
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            color: '#FFFFFF',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlinedPrimary: {
                    borderColor: '#777',
                    color: '#AAA',
                    '&:hover': {
                        borderColor: '#C86DD7',
                        color: '#C86DD7',
                        backgroundColor: 'rgba(200, 109, 215, 0.04)'
                    }
                }
            }
        }
    }
});

const Layout: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ '@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&display=swap");': '' }} />

            {/* Desktop-only Social Sidebar */}
            <DesktopSocialSidebar />

            {/* Main Content Wrapper (shifts for sidebar) */}
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100vw', md: 'calc(100vw - 70px)' },
                justifyContent: "flex-start",
                marginLeft: { xs: 0, md: '70px' } // Offset for sidebar
            }}>

                {/* --- Main App Bar (Responsive) --- */}
                <AppBar position="static" color="transparent" elevation={0} sx={{ pt: 2, px: { xs: 2, md: 4 } }}>
                    <Container maxWidth="lg" disableGutters>
                        <Toolbar sx={{ p: '0 !important' }}>
                            <Logo />
                            <Box sx={{ flexGrow: 1 }} />

                            {/* Mobile Menu Icon */}
                            <IconButton
                                edge="end"
                                onClick={toggleMenu}
                                aria-label="menu"
                                sx={{
                                    color: '#FFFFFF',
                                    display: { xs: 'flex', md: 'none' } // Show only on mobile
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Desktop Nav Links */}
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <DesktopNav />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* --- Main Content Outlet --- */}

                <Outlet />
            </Box>

            {/* --- Mobile Menu Drawer (Full Screen) --- */}
            {/* This component is unchanged and works only on mobile */}
            <Drawer
                anchor="right"
                open={menuOpen}
                onClose={toggleMenu}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: '100%',
                        bgcolor: 'background.default',
                        p: 2,
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, px: 1 }}>
                    <Logo />
                    <IconButton onClick={toggleMenu} sx={{ color: '#FFFFFF' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Stack spacing={3} sx={{ mt: 8, pl: 2 }}>
                    {['#home', '#works', '#about-me', '#contacts'].map((text) => (
                        <Link
                            href={text}
                            key={text}
                            onClick={toggleMenu}
                            sx={{
                                color: 'primary.main',
                                fontSize: '2.2rem',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: 'white',
                                },
                            }}
                        >
                            {text}
                        </Link>
                    ))}
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ pl: 2, mb: 4 }}>
                    <LanguageSelector />
                </Box>
                <Stack direction="row" spacing={4} sx={{ pl: 2, mb: 4 }}>
                    <IconButton href="https://github.com" target="_blank" sx={{ color: 'white' }}>
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/rahul-kbharti" target="_blank" sx={{ color: 'white' }}>
                        <LinkedInIcon fontSize="large" />
                    </IconButton>
                    <IconButton href="mailto:rahul.kbharti2002@gmail.com" target="_blank" sx={{ color: 'white' }}>
                        <EmailIcon style={{ fontSize: '2.1875rem' }} />
                    </IconButton>
                </Stack>
            </Drawer>

        </ThemeProvider>
    );
}

export default Layout;