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
    { to: '/#blog', label: 'Blog' },
    { to: '/#contact', label: 'Contact' },
];



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#05080d',
            paper: '#0a1017',
        },
        primary: {
            main: '#49f2a5',
            dark: '#28c77e',
        },
        secondary: {
            main: '#57c7ff',
        },
        text: {
            primary: '#e6edf3',
            secondary: '#8b9aaa',
        },
        divider: '#1a2633',
    },
    typography: {
        fontFamily: '"IBM Plex Sans", sans-serif',
        h1: {
            fontSize: '2.8rem',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#f0f6fc',
            fontFamily: '"Space Grotesk", sans-serif',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#f0f6fc',
            fontFamily: '"IBM Plex Mono", monospace',
        },
        h3: {
            fontFamily: '"Space Grotesk", sans-serif',
        },
        h6: {
            fontWeight: 700,
            color: '#f0f6fc',
            fontFamily: '"IBM Plex Mono", monospace',
        },
        body1: {
            fontSize: '1.05rem',
            color: '#8b9aaa',
        },
        button: {
            fontFamily: '"IBM Plex Mono", monospace',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    paddingInline: 18,
                    fontSize: '0.74rem',
                },
                containedPrimary: {
                    color: '#04100a',
                    boxShadow: '0 0 0 1px rgba(73, 242, 165, 0.25), 0 10px 30px rgba(73, 242, 165, 0.12)',
                    '&:hover': {
                        backgroundColor: '#67f7b6',
                        boxShadow: '0 0 0 1px rgba(73, 242, 165, 0.4), 0 12px 34px rgba(73, 242, 165, 0.2)',
                    },
                },
                outlinedPrimary: {
                    borderColor: 'rgba(73, 242, 165, 0.42)',
                    color: '#49f2a5',
                    '&:hover': {
                        borderColor: '#49f2a5',
                        backgroundColor: 'rgba(73, 242, 165, 0.08)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    backgroundColor: '#0a1017',
                    backgroundImage: 'linear-gradient(145deg, rgba(87, 199, 255, 0.025), transparent 42%)',
                    borderColor: '#1a2633',
                    boxShadow: '0 18px 45px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 52,
                        height: 1,
                        background: 'linear-gradient(90deg, #49f2a5, #57c7ff)',
                        boxShadow: '0 0 12px rgba(73, 242, 165, 0.35)',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h2: {
                    '&::before': {
                        content: '"// "',
                        color: '#49f2a5',
                        fontSize: '0.65em',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 6,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 3,
                    fontFamily: '"IBM Plex Mono", monospace',
                    letterSpacing: '0.02em',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: 'rgba(4, 9, 14, 0.72)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
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
                            borderRadius: 1,
                            boxShadow: '0 0 24px rgba(73, 242, 165, 0.2)',
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
                '@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap");': '',
                'a': { color: 'inherit' },
                '.MuiTypography-overline': {
                    fontFamily: '"IBM Plex Mono", monospace',
                    letterSpacing: '0.12em',
                },
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
                        py: 1.25,
                        px: { xs: 2, md: 4 },
                        bgcolor: 'rgba(5, 8, 13, 0.86)',
                        backdropFilter: 'blur(18px)',
                        borderBottom: '1px solid rgba(87, 199, 255, 0.13)',
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
