import { Box, Link, Stack } from "@mui/material";
import LanguageSelector from "./LanguageSelector";


const Links = [
    { href: '#home', label: 'Home' },
    { href: '#works', label: 'Works' },
    { href: '#about-me', label: 'About-Me' },
    { href: '#contacts', label: 'Contacts' },
];

const DesktopNav: React.FC = () => (
    <Stack direction="row" spacing={3} alignItems="center">
        {Links.map(({ href, label }) => (
            <Link
                href={href}
                key={href}
                sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                }}
            >
                #<Box component="span" sx={{
                    color: 'primary.main', fontSize: '1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: 'white',
                    },
                }}>{label}</Box>
            </Link>
        ))}
        <LanguageSelector />
    </Stack>
);

export default DesktopNav;