import { Box, Typography } from "@mui/material";

const Logo: React.FC = () => (
    <Box sx={{ pl: { xs: 1, md: 2, lg: 5 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 14, height: 14, border: '2px solid #C86DD7' }} />
        <Typography variant="h6" component="a" sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}>
            Portfolio
        </Typography>
    </Box>
);

export default Logo;