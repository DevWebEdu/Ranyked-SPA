import React, { useContext, useState } from 'react'
import "./LoginView.css"
import loginPhoto from "../assets/fotolog2.jpg"
import man from "../assets/man.png"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Input, InputAdornment, InputLabel, styled,Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext';
 

const BoxInput = styled(Box)({
  display:"flex",
  flexDirection:"column",
  alignItems: 'flex-start',
  marginTop:"20px",
  // border: "1px solid black",
  padding:"0.5em 1em",
  width:"100%"
})

const BoxForm = styled("form")(({theme})=>({
  border: "#ddd 2px solid",
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width:"70%",
    [theme.breakpoints.down("md")]:{
      marginTop:"20%",
      width:"50%",
    },
    [theme.breakpoints.down("sm")]:{
      marginTop:"20%",
      width:"90%",
    }
}))

const SideForm = styled("div")(({theme})=>({
  width: "40%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]:{
    backgroundColor:"rgba(184, 96, 52,0.858)",
    width:"100vw",
    height:"100vh"
  }

}))

const ContentAll=styled("div")(({theme})=>({
  position:"absolute",
    backgroundColor: "white",
    top:"0",
    left:"0",
    height: "100%",
    width:" 100%",
    display:"flex",
    zIndex: "10",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column"
    }
}))

const ContainBanner=styled("div")(({theme})=>({
  backgroundColor: "rgba(184, 96, 52,0.858)",
    width: "60%",
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    [theme.breakpoints.down("md")]:{
      display:"none"
    }
}))

const ButtonLogin =styled(Button)(({theme})=>({
  marginTop:"30px",
  backgroundColor:"rgba(184, 96, 52,0.858)",
  ":hover":{backgroundColor:"white",color:"rgba(184, 96, 52,0.858)"},
  [theme.breakpoints.down("md")]:{
    backgroundColor:"white",
    color:"rgba(184, 96, 52,0.858)"
  }

}))
export default function LoginViews() {

  const [password,setPassword]= useState(false)
  const {signInGoogle} = useContext(AuthContext)
  const navigate= useNavigate()

  const loguear = async ( )=>{
    const rpta = await signInGoogle()
    if(rpta.user.uid){
      navigate("/")
    }
  }

  return (
    <ContentAll className="contain-full">
        <ContainBanner className="contain-frase">
            <h1 className='h1n'> Ranyked S.A.C </h1>
            <img src={loginPhoto} alt="img"/>  
            <div className="text-frase">
                  <p>“Tus clientes más insatisfechos son tu mayor fuente de aprendizaje.”  <cite>Bill Gates, cofundador de Microsoft.</cite>  </p>
            </div>  
        </ContainBanner>
        <SideForm className='contain-form'>
            <BoxForm className="form p-3 ">
                  <div className="contain-img">
                    <img alt="img2" src={man}/>
                  </div>
                  <BoxInput >
                      <InputLabel htmlFor="input-with-icon-adornment">
                      Username
                       </InputLabel>
                      <Input sx={{ width:"100%" }} id="input-with-icon-adornment" startAdornment={
                      <InputAdornment  position="start">
                        <AccountCircle  />
                      </InputAdornment>
                }/>       
                  </BoxInput>
                  <BoxInput sx={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start',marginTop:"20px" }}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                      Password
                       </InputLabel>
                        <Input sx={{ width:"100%" }} variant="standard" id="standard-adornment-password"
                                type={password===false? "password" :"text"}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={e=>setPassword(!password)}>
                                          {password===false ? <VisibilityOff/> : <Visibility/>  }                                  
                                    </IconButton>
                                  </InputAdornment>
                                }
                                startAdornment={
                                  <InputAdornment position="start">
                                    <LockIcon/>
                                  </InputAdornment>
                                  
                                }/>
                  </BoxInput>
                  
                  <ButtonLogin variant="contained" href='/'>
                  
                                Ingresar
                    
                  </ButtonLogin>
                  <ButtonLogin variant="contained" onClick={loguear}>
                  
                                Ingresar con Google
                    
                  </ButtonLogin>
                  
            </BoxForm>

        </SideForm>
    </ContentAll >
  )
}
