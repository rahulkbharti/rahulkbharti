import { Box, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const DesktopSocialSidebar: React.FC = () => (
    <Box
        sx={{
            display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on desktop
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: '70px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderRight: '1px solid rgba(87, 199, 255, 0.12)',
            bgcolor: 'rgba(5, 8, 13, 0.72)',
            backdropFilter: 'blur(12px)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                bgcolor: 'primary.main',
                boxShadow: '0 0 16px rgba(73, 242, 165, 0.5)',
            },
        }}
    >
        <IconButton href="https://github.com/rahulkbharti" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
            <GitHubIcon />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/rahul-kbharti/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
            <LinkedInIcon />
        </IconButton>
        <IconButton href="mailto:rahul.kbharti2002@gmail.com" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
            <EmailIcon />
        </IconButton>
    </Box>
);

export default DesktopSocialSidebar;
