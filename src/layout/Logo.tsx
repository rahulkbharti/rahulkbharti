import { Box, Typography } from "@mui/material";

const Logo: React.FC = () => (
    <Box sx={{ pl: { xs: 1, md: 2, lg: 5 }, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box
            sx={{
                width: 32,
                height: 28,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 1,
                border: '1px solid rgba(73, 242, 165, 0.5)',
                bgcolor: 'rgba(73, 242, 165, 0.06)',
                color: 'primary.main',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                boxShadow: 'inset 0 0 14px rgba(73, 242, 165, 0.08), 0 0 16px rgba(73, 242, 165, 0.08)',
            }}
        >
            &gt;_
        </Box>
        <Typography
            variant="h6"
            component="a"
            sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: { xs: '0.82rem', sm: '0.92rem' },
                letterSpacing: '-0.02em',
                "&:hover": { color: "primary.main", cursor: "pointer" },
            }}
        >
            rahul<Box component="span" sx={{ color: 'text.secondary' }}>@</Box><Box component="span" sx={{ color: 'primary.main' }}>backend</Box>
        </Typography>
    </Box>
);

export default Logo;
