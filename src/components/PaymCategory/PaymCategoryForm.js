import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,FormHelperText,
  CardContent,InputLabel,FormControl,
} from '@mui/material';


import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest,postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCATEGORY, PAYMCOMPANIES} from '../../serverconfiguration/controllers';




export default function Paymcategoryform() {
  const navigate = useNavigate()
  const [company,setCompany]=useState([])
  const [branch,setBranch] =useState([])
  const [category,setcategory] =useState([])
  const [pnCompanyId,setPnCompanyId] =useState("")
  const [pnBranchId,setPnBranchId] = useState("")
  const [vCategoryName,setVCategoryName] = useState("")
  const [status,setStatus] = useState("")



  const [companyError,setCompanyError]=useState(false)
  const [branchError,setBranchError] =useState(false)
  const [categoryError,setcategoryError] =useState(false)
  const [pnCompanyIdError,setPnCompanyIdError] =useState(false)
  const [pnBranchIdError,setPnBranchIdzerror] = useState(false)
  const [vCategoryNameError,setVCategoryNameError] = useState(false)
  const [statusError,setStatusError] = useState(false)

  useEffect(()=>{
  async function getData(){
    const data = await getRequest(ServerConfig.url,PAYMCOMPANIES);
    setCompany (data.data);
    const data1 = await getRequest(ServerConfig.url,PAYMBRANCHES);
    setBranch(data1.data);

  }

  getData();
},[]);


const handleChange = (e) => {
  const { name, value } = e.target;

  switch (name) {
    case 'pnCompanyId':
      setCompany(value);
      setCompanyError(false);
      break;
    case 'pnBranchId':
      setBranch(value);
      setBranchError(false);
      break;
   
    case 'vCategoryName':
      setVCategoryName(value);
      setVCategoryNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value) || !value);
      break;
    case 'status':
      setStatus(value);
      setStatusError(!/^[A-Za-z\s]{1}$/.test(value) || !value);
      break;
    default:
      break;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setCompanyError(!company);
  setBranchError(!branch);
  setVCategoryNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vCategoryName) || !vCategoryName);
  setStatusError(!/^[A-Za-z\s]{1}$/.test(status) || !status);

  if (!company || !branch || !vCategoryName || !status ) {
    return;
  }

  const formData = {
    pnCompanyId: pnCompanyId,
    branchId: pnBranchId,
    vCategoryName: vCategoryName,
    status: status,
    pnCompany:{
      "pnCompanyId":pnCompanyId 
    }
  };

  try {
    await postRequest(ServerConfig.url, PAYMCATEGORY, formData);
    navigate('/PaymCategoryTable');
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};


  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>Paym Category</Typography>
      <form onSubmit={handleSubmit}>
     
      <Grid container spacing={2} inputlabelprops={{shrink:true}}>
      <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
               value={pnCompanyId}
              onChange={handleChange}
               style={{ height: '50px' }}

               >
                <option value="">Select</option>
                   {

                      company.map((e)=><option>{e.pnCompanyId}</option>)
                   }
               </select>
               {companyError && <FormHelperText sx={{color:'red'}}>Please select a company</FormHelperText>}

            </FormControl >
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth >
                  <InputLabel shrink>BranchId</InputLabel>
               <select 
               name="branchId"
              onChange={handleChange}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
              
               >
                <option value="">Select</option>
                   {
                     
                     branch.map((e)=><option>{e.pnBranchId}</option>)
                    }
               </select>
               {branchError && <FormHelperText sx={{color:'red'}}>Please select a branch</FormHelperText>}

               </FormControl>
                </Grid>
                                <Grid  xs={12}  sm={6} item>
                <FormControl fullWidth> 
              <TextField
            name="vCategoryName"
                label="vCategoryName"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
              />
            {vCategoryNameError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

              </FormControl>
              </Grid>

              <Grid  xs={12}  sm={6} item>
                <FormControl fullWidth> 
              <TextField
            name="status"
                label="status"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange} 
                InputLabelProps={{ shrink: true }} 
              />
            {statusError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

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
  )   
  
}
