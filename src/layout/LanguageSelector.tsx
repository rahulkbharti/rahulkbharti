import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const LanguageSelector: React.FC = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }}>
        <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>
            EN
        </Typography>
        <ArrowDropDownIcon sx={{ color: 'white' }} />
    </Box>
);

export default LanguageSelector;