import { Box, Typography } from "@mui/material";

const Logo: React.FC = () => (
    <Box sx={{ pl: { xs: 1, md: 2, lg: 5 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
            sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: '0 0 12px rgba(255, 180, 84, 0.6)'
            }}
        />
        <Typography
            variant="h6"
            component="a"
            sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
        >
            Rahul <Box component="span" sx={{ color: 'primary.main' }}>Bharti</Box>
        </Typography>
    </Box>
);

export default Logo;