import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/images/logo3.png'
const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">

      <Stack gap={"20px"} px={"40px"} pt={"24px"} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <img src={Logo} alt="logo" width={"30px"} height={"30px"} />
        <Typography variant='h6'>
          Copyright © {new Date().getFullYear()} Touheed Naveed
        </Typography>
      </Stack>

    </Box>
  )
}

export default Footer
