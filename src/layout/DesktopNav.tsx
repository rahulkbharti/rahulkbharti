import { Box, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";


const Links = [
    { to: '/#home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/#skills', label: 'Skills' },
    { to: '/#blog', label: 'Blog' },
    { to: '/#contact', label: 'Contact' },
];

const DesktopNav: React.FC = () => (
    <Stack direction="row" spacing={3} alignItems="center">
        {Links.map(({ to, label }) => (
            <Link
                component={RouterLink}
                to={to}
                key={to}
                sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.76rem',
                    letterSpacing: '0.04em',
                    '&:hover': { color: 'primary.main' },
                }}
            >
                <Box component="span" sx={{
                    color: 'inherit',
                    fontWeight: 600,
                }}>./{label.toLowerCase()}</Box>
            </Link>
        ))}
        <LanguageSelector />
    </Stack>
);

export default DesktopNav;
