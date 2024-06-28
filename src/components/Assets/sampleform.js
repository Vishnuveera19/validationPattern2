
import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,FormHelperText,FormControl,InputLabel
  } from '@mui/material';
import { inputFormElements } from './sample';
import AssetsTable from './AssetsTable';
import { useState } from 'react';
import { ASSETS, PAYMBRANCHES } from '../../serverconfiguration/controllers';
import { useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';

import { useNavigate } from 'react-router-dom';

export default function SampleForm() {

  const navigate = useNavigate();
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [pnCompanyId,setPnCompanyId]=useState("")
  const [pnBranchId,setPnBranchId]=useState("")
  const [AssetName,setAssetname]=useState("")

  
  const [pnCompanyIdError,setPnCompanyIdError]=useState(false)
  const [pnBranchIdError,setPnBranchIdError]=useState(false)
  const [AssetNameError,setAssetnameError]=useState(false)
  
  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data.data);
    }
    getData();
  }, []);


  
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setPnCompanyId(value);
        setPnCompanyIdError(false);
        break;
      case 'pnBranchId':
        setPnBranchId(value);
        setPnBranchIdError(false);

        break;   
        case 'AssetName':
          setAssetname(value);
          setAssetnameError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
  
          break;   
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPnCompanyIdError(!company);
    setPnBranchIdError(!branch);
    setAssetnameError(!/^[A-Za-z0-9\s]{1,20}$/.test(AssetName) || !AssetName);



    if (!company || !branch || !AssetName 
    
     ) {
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    AssetName:AssetName
    };

    try {
      await postRequest(ServerConfig.url,ASSETS, formData);
      navigate('/AssetsTable')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };



    const margin={margin:"0 5px"}
    return (
      <div className="App">
        <AssetsTable/>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style ={{ maxWidth: 600, margin: "0 auto" ,font:'initial'}}>
        <CardContent>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">MAKE ENTRY TO Assets</Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
          <Grid item xs={12} sm={12} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
              onChange={handleChange}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      company.map((e)=><option>{e.pnCompanyId}</option>)
                      
                   }
               </select>
               {pnCompanyIdError && <FormHelperText  style={{color:"red"}}>Please select a company</FormHelperText>}

            </FormControl >
                </Grid>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth >
                  <InputLabel shrink>BranchId</InputLabel>
               <select 
               name="pnBranchId"
             onChange={handleChange}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        branch.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                   }
               </select>
               {pnBranchIdError && <FormHelperText  style={{color:"red"}}>Please select a company</FormHelperText>}

               </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth >
                    <TextField
                      name="AssetName"
                     
                      label="Assetname"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  {AssetNameError && <FormHelperText  style={{color:"red"}}>Please enter Assest</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid container spacing={1} paddingTop={'10px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{      
                }}  
        variant='contained' color='primary' >SAVE</Button>
              </Grid>
              </Grid>
           
          </Grid>
        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }