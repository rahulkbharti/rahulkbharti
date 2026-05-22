import React, { useEffect, useState } from 'react';
import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Fab,
    Drawer,
    Stack,
    Link,
    GlobalStyles,
    Tooltip,
    Zoom,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import DesktopSocialSidebar from './DesktopSocialSidebar';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import DesktopNav from './DesktopNav';
import Footer from './Footer';


const Links = [
    { to: '/#home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/#skills', label: 'Skills' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/#blog', label: 'Blog' },
    { to: '/#contact', label: 'Contact' },
];



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f1115',
            paper: '#151821',
        },
        primary: {
            main: '#ffb454',
            dark: '#e39a36',
        },
        secondary: {
            main: '#5dd6c1',
        },
        text: {
            primary: '#f2f2f2',
            secondary: '#b5b8c5',
        },
    },
    typography: {
        fontFamily: '"Space Grotesk", "IBM Plex Sans", sans-serif',
        h1: {
            fontSize: '2.8rem',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#f7f7f7',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#f7f7f7',
        },
        h6: {
            fontWeight: 700,
            color: '#f7f7f7',
        },
        body1: {
            fontSize: '1.05rem',
            color: '#b5b8c5',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    paddingInline: 20,
                },
                containedPrimary: {
                    color: '#0f1115',
                    boxShadow: '0 10px 30px rgba(255, 180, 84, 0.2)',
                    '&:hover': {
                        backgroundColor: '#ffb454',
                        boxShadow: '0 12px 34px rgba(255, 180, 84, 0.28)',
                    },
                },
                outlinedPrimary: {
                    borderColor: 'rgba(255, 180, 84, 0.5)',
                    color: '#ffb454',
                    '&:hover': {
                        borderColor: '#ffb454',
                        backgroundColor: 'rgba(255, 180, 84, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
});

const HashScroll: React.FC = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (!hash) {
            return;
        }

        const id = hash.replace('#', '');
        window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    }, [hash, pathname]);

    return null;
};

const ScrollTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Zoom in={visible}>
            <Box
                sx={{
                    position: 'fixed',
                    right: { xs: 18, md: 28 },
                    bottom: { xs: 18, md: 28 },
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                }}
            >
                <Tooltip title="Go to top">
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="Go to top"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        sx={{
                            color: 'background.default',
                            boxShadow: '0 12px 28px rgba(255, 180, 84, 0.22)',
                        }}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Zoom>
    );
};

const Layout: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <HashScroll />
            <CssBaseline />
            <GlobalStyles styles={{
                '@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap");': '',
                'a': { color: 'inherit' }
            }} />

            {/* Desktop-only Social Sidebar */}
            <DesktopSocialSidebar />

            {/* Main Content Wrapper (shifts for sidebar) */}
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', md: 'calc(100% - 70px)' },
                justifyContent: "flex-start",
                marginLeft: { xs: 0, md: '70px' } // Offset for sidebar
            }}>

                {/* --- Main App Bar (Responsive) --- */}
                <AppBar
                    position="sticky"
                    color="transparent"
                    elevation={0}
                    sx={{
                        top: 0,
                        zIndex: (theme) => theme.zIndex.drawer - 1,
                        py: 2,
                        px: { xs: 2, md: 4 },
                        bgcolor: 'rgba(15, 17, 21, 0.58)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
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

                {/* --- Footer --- */}
                <Footer />
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
                    {Links.map(({ to, label }) => (
                        <Link
                            component={RouterLink}
                            to={to}
                            key={to}
                            sx={{
                                color: 'text.secondary',
                                textDecoration: 'none',
                                fontSize: '2.2rem',
                            }}
                        >
                            <Box component="span" sx={{
                                color: 'primary.main',
                                fontWeight: 700,
                                '&:hover': {
                                    color: 'white',
                                },
                            }}>{label}</Box>
                        </Link>
                    ))}
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ pl: 2, mb: 4 }}>
                    <LanguageSelector />
                </Box>
                <Stack direction="row" spacing={4} sx={{ pl: 2, mb: 4 }}>
                    <IconButton href="https://github.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/rahul-kbharti" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <LinkedInIcon fontSize="large" />
                    </IconButton>
                    <IconButton href="mailto:rahul.kbharti2002@gmail.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <EmailIcon style={{ fontSize: '2.1875rem' }} />
                    </IconButton>
                </Stack>
            </Drawer>

            <ScrollTopButton />

        </ThemeProvider>
    );
}

export default Layout;
