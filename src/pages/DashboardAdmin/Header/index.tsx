import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
const Header = (): JSX.Element => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: 228,
                display: 'flex',
                [theme.breakpoints.down('md')]: {
                    width: 'auto'
                }
            }}
        >
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                <img src="../../../svg/logo.svg" alt="" srcSet="" />
            </Box>
        </Box>

        
    );
};

export default Header;