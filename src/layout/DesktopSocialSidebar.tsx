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
            // borderRight: '1px solid #333',
        }}
    >
        <IconButton href="https://github.com/rahulkbharti" target="_blank" sx={{ color: 'white' }}>
            <GitHubIcon />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/rahul-kbharti/" target="_blank" sx={{ color: 'white' }}>
            <LinkedInIcon />
        </IconButton>
        <IconButton href="mailto:rahul.kbharti2002@gmail.com" target="_blank" sx={{ color: 'white' }}>
            <EmailIcon />
        </IconButton>
    </Box>
);

export default DesktopSocialSidebar;