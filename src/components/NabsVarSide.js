import { BusinessCenter } from '@mui/icons-material'
import { AppBar, Toolbar, Typography,styled, Avatar,Box, Menu, MenuItem } from '@mui/material'
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'


import { AuthContext } from '../context/authContext'

const AppBarRanyked=styled(AppBar)(({theme})=>({
      backgroundColor:"rgba(184, 96, 52,0.858)",
      zIndex:"3",
      
}))

const StyledToolbar = styled(Toolbar)(({theme})=>({
  display:"flex",
  justifyContent:"space-between"
}))


const UserBox = styled(Box)(({theme})=>({
  display:"flex",
  alignItems:"center",
  gap:"10px",
}))

export default function NabsVarSide() {
  const [open,setOpen] = useState(false)

  const {user,salir} = useContext(AuthContext)


  return (
    
    <AppBarRanyked position="sticky">
      <StyledToolbar>
            <Typography variant="h6" 
            component={Link}
             sx={{textDecoration:"none",
                  color:"white" , 
                  ":hover":{color:"white"},                  
                  display:{xs:"none",sm:"block"}
                }}
             to="/" >RNYKD</Typography>
            <BusinessCenter sx={{display:{xs:"block",sm:"none"}}}/>
            {user ? (
            <UserBox>
                <Typography variant="span">{user.displayName}</Typography>
                <Avatar src={user.photoURL} sx={{width:30,height:30}}
                        onClick={e=>setOpen(true)} />
            </UserBox>
            ):
            (
            <UserBox>
            <Typography variant="span">unnamed</Typography>
            <Avatar src={user} sx={{width:30,height:30}}
                    onClick={e=>setOpen(true)} />
            </UserBox>
        )}
        </StyledToolbar>
        <Menu 
        id="demo-positioned-menu"
        aria-labelledby='demo-positioned-button'
        open={open}
        onClose={e=>setOpen(false)}
        anchorOrigin={{
          vertical:"top",
          horizontal:"right"
         }}
        transformOrigin={{
          vertical:"top",
          horizontal:"right"
       }}
        >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={salir}>Logout</MenuItem>
        </Menu>

    </AppBarRanyked>
  )
}
