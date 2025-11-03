import { Link, Stack } from "@mui/material";
import LanguageSelector from "./LanguageSelector";

const DesktopNav: React.FC = () => (
    <Stack direction="row" spacing={3} alignItems="center">
        {['#home', '#works', '#about-me', '#contacts'].map((text) => (
            <Link
                href={text}
                key={text}
                sx={{
                    color: 'primary.main',
                    fontSize: '1rem',
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
        <LanguageSelector />
    </Stack>
);

export default DesktopNav;