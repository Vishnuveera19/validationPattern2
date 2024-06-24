import {TextField, Button, Card,  Typography, Box, Grid,FormHelperText, CardContent, FormControl} from '@mui/material';
import { inputFormElements18} from './punchdetail'
import {useState,useEffect} from 'react'
import { OTSLAB, PAYMEMPLOYEE, PUNCHDETAILS, SHIFTDETAILS } from '../../serverconfiguration/controllers';
import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Label } from '@mui/icons-material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
export default function Sample18() {
  const navigate = useNavigate();

const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [shiftdetails,setShiftDetails]=useState([])
const [otslab,setOTSLab]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [shiftCode,setShiftCode]=useState("")
const[cardNo,setCardNo]=useState("")
const[otHrs,setOTHrs]=useState("")
const [days, setDays] = useState(""); // Declare days state
const [machineNum, setMachineNum] = useState(""); // Declare machineNum state
const [inOutMode, setInOutMode] = useState(""); // Declare inOutMode state      
const [dates, setDates] = useState(""); // Declare dates state
const [times, setTimes] = useState(""); // Declare times state
const[verifyMode,setVerifyMode]= useState("")
const [status, setStatus] = useState("");

const [employeeError,setEmployeeError]=useState(false)
const [companyerror,setCompanyError]=useState(false)
const [branchError,setBranchError]=useState(false)
const [shiftdetailsError,setShiftDetailsError]=useState(false)
const [otslaberror,setOTSLabError]=useState(false)
const [employeeCodeError,setEmployeeCodeError]=useState(false)
const [employeeNameError,setEmployeeNameError]=useState(false)
const [shiftCodeError,setShiftCodeError]=useState(false)
const[cardNoError,setCardNoError]=useState(false)
const[otHrsError,setOTHrsError]=useState(false)
const [daysError, setDaysError] = useState(false); // Declare days state
const [machineNumError, setMachineNumError] = useState(false); // Declare machineNum state
const [inOutModeError, setInOutModeError] = useState(false); // Declare inOutMode state      
const [datesError, setDatesError] = useState(false); // Declare dates state
const [timesError, setTimesError] = useState(false); // Declare times state
const[verifyModeError,setVerifyModeError]= useState(false)
const [statusError, setStatusError] = useState(false);
// Declare status state
const decimalToTime = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};



useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
      setEmployee(data.data)
      const shiftdata=await getRequest(ServerConfig.url,SHIFTDETAILS)
      setShiftDetails(shiftdata.data)
      const OTSdata=await getRequest(ServerConfig.url,OTSLAB)
      const otslabData = OTSdata.data.map(item => ({
        ...item,
        otHrs: decimalToTime(item.otHrs)
    }));
    setOTSLab(otslabData);
}
    getData()
  
  },[])

///////hadlesubmit///


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
      // Assuming shiftdetails is filtered based on branch and company IDs
      setShiftDetails(shiftdetails.filter((e) => e.pnBranchid == value));
      break;
    case 'shiftCode':
      setShiftCode(value);
      setShiftCodeError(false);
      break;
    case 'machineNum':
      setMachineNum(value);
      setMachineNumError(!/^\d+$/.test(value) || !value); // Adjust validation regex if necessary
      break;
    case 'cardNo':
      setCardNo(value);
      setCardNoError(!/^[A-Za-z0-9\s]{1,15}$/.test(value) || !value); // Adjust validation regex if necessary
      break;
    case 'employeeName':
      setEmployeeName(value);
      setEmployeeNameError(!/^[A-Za-z\s]{1,50}$/.test(value) || !value); // Adjust validation regex if necessary
      break;
    case 'employeeCode':
      setEmployeeCode(value);
      setEmployeeCodeError(!/^[A-Za-z\s]{1,15}$/.test(value) || !value); // Adjust validation regex if necessary
      break;
    case 'verifyMode':
      setVerifyMode(value);
      setVerifyModeError(!/^\d+$/.test(value) || !value);
      break;
    case 'inOutMode':
      setInOutMode(value);
      setInOutModeError(!/^\d+$/.test(value) || !value);
      break;
    case 'status':
      setStatus(value);
      setStatusError(!/^[A-Za-z\s]{1,2}$/.test(value) || !value); // Adjust validation regex if necessary
      break;
    case 'otHrs':
      setOTHrs(value);
      setOTHrsError(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || !value); // Validate HH:mm format
      break;
    case 'times':
      setTimes(value);
      setTimesError(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || !value); // Validate HH:mm format
      break;
    default:
      case 'days':
        setDays(value);
        setDaysError(!/^[A-Za-z0-9\s]{1,15}$/.test(value) || !value)

      break;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setCompanyError(!company);
  setBranchError(!branch);
  setShiftCodeError(!shiftCode);
  setEmployeeCodeError(!employeeCode);
  setEmployeeNameError(!employeeName);
  setMachineNumError(!/^\d+$/.test(machineNum) || !machineNum);
  setVerifyModeError(!/^\d+$/.test(verifyMode) || !verifyMode);
  setInOutModeError(!/^\d+$/.test(inOutMode) || !inOutMode);
  setDatesError(!dates);
  setCardNoError(!/^[A-Za-z0-9\s]{1,15}$/.test(cardNo) || !cardNo);
  setDaysError(!/^[A-Za-z0-9\s]{1,15}$/.test(days) || !days);
  setStatusError(!/^[A-Za-z0-9\s]{1,15}$/.test(status) || !status);
  setTimesError(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]{1,7}$/.test(times) || !times);
  setOTHrsError(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]{1,7}$/.test(otHrs) || !otHrs);





  if (!company || !branch || !shiftCode || !employeeCode || !employeeName || !machineNum || !verifyMode || !inOutMode || !dates || !cardNo || !days || !status || !times || !otHrs) {
    return;
  }

 
    const formData = {
      "pnCompanyid":company,
      pnBranchid:branch,
      empCode:employeeCode,
      shiftCode:shiftCode,
      otHrs:otHrs,
      cardNo:cardNo,
      verifyMode:verifyMode,
      machineNum:machineNum,
      empName:employeeName,
      inout:inOutMode,
      date:dates,
      time:times,
      day:days,
      status:status,
        // Add other form data here
    };

  try {
    await postRequest(ServerConfig.url,PUNCHDETAILS,formData);
    navigate('/PunchdetailsTable');
  } catch (error) {
    console.error('Error submitting form:', error);
    console.log(formData)
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     "pnCompanyid":company,
  //     pnBranchid:branch,
  //     empCode:employeeCode,
  //     shiftCode:shiftCode,
  //     otHrs:otHrs,
  //     cardNo:cardNo,
  //     verifyMode:verifyMode,
  //     empName:employeeName,
  //     inout:inOutMode,
  //     date:dates,
  //     time:times,
  //     day:days,
  //     status:status,
  //       // Add other form data here
  //   };

    // try {
    //     const response = await postRequest(ServerConfig.url, PUNCHDETAILS, formData);
    //     console.log(response)
    //     // Handle successful response here
    // } catch (error) {
    //   console.log(PUNCHDETAILS)
    // }





    const margin={margin:"0 5px"}
    return (
        <div>
          <Grid style={{padding: "80px 5px 0 5px"}}>
            <Card style = {{maxWidth: 600, margin: "0 auto"}}>
              <CardContent>
                <Typography variant='h5' color='S- Light' align='center'>
                Punch Details
                </Typography>
                <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
                  Fill all the Mandatory fields 
                </Typography>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2} inputlabelprops={{shrink:true}}>
            <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                onChange={handleChange}

                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {

                        employee.map((e)=><option>{e.pnCompanyId}</option>)
                        
                     }
                 </select>
                 {companyerror && <FormHelperText sx={{color:'red'}}>Please select a company</FormHelperText>}

              </FormControl >
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>BranchId</InputLabel>
                 <select 
                 name="pnBranchId"
                 onChange={handleChange}
                //  onChange={(e)=>{
                //   setBranch(e.target.value)
                //  setShiftDetails(shiftdetails.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
                //  console.log(shiftdetails)
               
                
                //  }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                     }
                 </select>
                 {branchError && <FormHelperText  sx={{color:'red'}}>Please select a branch</FormHelperText>}

                 </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>empCode</InputLabel>
                 <select 
                 name = "empCode"
                //  onChange={(e)=>{
                    
                //      var v=e.currentTarget.value
                //   var empname=employee.filter((e)=>e.employeeCode==v)
                //   setEmployeeCode(v)
                //   setEmployeeName(empname[0].employeeFullName)
                //   setCardNo(empname[0].cardNo)
               
                //  }}
                onChange={handleChange}
                 style={{ height: '50px' }}
                 >
                        <option value="">Select</option>
                 
                     {
                        
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.employeeCode}</option>)
                      
                     }
                 </select>
                 {employeeCodeError && <FormHelperText  sx={{color:'red'}}>Please select a employeeCode</FormHelperText>}

                 </FormControl>
                  </Grid>

            
                   <Grid xs={12} sm={6} item  >
                  
                   <FormControl fullWidth>
                  <TextField 
                  name= "empName"
               value={employeeName}
                  label="employeename"
                  onChange={handleChange}

                  variant="outlined"
                  fullWidth
                  required  /> 
                 {employeeNameError && <FormHelperText  sx={{color:'red'}}>invalid employee name</FormHelperText>}

                  </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                 
                  <TextField 
                  name = "cardNo"
                  value={cardNo}  
                  label="cardno"
                  onChange={handleChange}

                  variant="outlined"
                  fullWidth
                  required /> 
                                      {cardNoError && <FormHelperText  sx={{color:'red'}}>invalid</FormHelperText>}

                  </FormControl>
                  </Grid>

                  
                   <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>shiftCode</InputLabel>
                    <select 
                    name = "shiftCode"
                //     onChange={(e)=>{
                    
                //     var s=e.currentTarget.value
                //   var shcode=shiftdetails.filter((e)=>e.shiftCode==s)
                //   setShiftCode(shcode[0].shiftCode)
                    


                // }}

                onChange={handleChange}
                style={{height:'50px'}}>
                 <option value="">Select</option>
                     {
                        
                         shiftdetails.map((e)=><option>{e.shiftCode}</option>)
                      

                     }
                   
                    </select>
                    {shiftCodeError && <FormHelperText  sx={{color:'red'}}>Please select a shiftcode</FormHelperText>}

                 </FormControl>
                  </Grid>
                  
             
                  
                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                   <InputLabel shrink>shiftCode</InputLabel>
                  <TextField value={shiftCode}
                    label="shiftcode"
                    variant="outlined"
                    fullWidth
                    required /> 
                    {shiftCodeError && <FormHelperText  sx={{color:'red'}}>Please select a shiftcode</FormHelperText>}

                  </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>OTHRS</InputLabel>
                    
                    <select 
                     name="otHrs"
                     value={otHrs}
                     label="othrs"
                     variant="outlined"
                     fullWidth
                     required
                     error={!otHrsError}
                //     onChange={(e)=>{{handleChange}
                    
                //     var s=e.currentTarget.value
                //   var othrs=otslab.filter((e)=>e.otHrs==s)
                //   setOTHrs(othrs[0].otHrs)
                //   setOTSLab(otslab.filter((e)=>(e.pnBranchid==branch && e.pnCompanyid==company)))

                // }}
                onChange={handleChange}
                style={{height:'50px'}}>
                 <option value="">Select</option>
                     {
                        
                        otslab.map((e)=><option>{e.otHrs}</option>)
                     }
                   
                    </select>
                    {!otHrsError && (
                    <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid time in the format HH:mm
                    </FormHelperText>
                )}
                 </FormControl>
                  </Grid>
                  
             
                  
                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                  
                  <TextField 
                      label="othrs"
                      variant="outlined"
                      fullWidth
                      value={otHrs}
                      required   /> 
                  
                  {otHrsError && <FormHelperText  sx={{color:'red'}}>invalid</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="verifyMode"
                   
                    label="VerifyMode"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    />
                  {verifyModeError && <FormHelperText  sx={{color:'red'}}>Please enter in a verifyMode</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="machineNum"
                        label= "MachineNum"
                        variant= "outlined"
                        fullWidth
                        required
                        onChange={handleChange}
                        />
                                           {machineNumError && <FormHelperText  sx={{color:'red'}}>Please enter values</FormHelperText>}

                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="inOutMode"
                                             label= "InOutMode"
                       variant= "outlined"
                       fullWidth
                       required 
                       onChange={handleChange}
                       />
                                          {inOutModeError && <FormHelperText  sx={{color:'red'}}>Please enter values</FormHelperText>}

                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="dates"
                      label= "dates" 
                      variant= "outlined"
                      fullWidth
                      required
                      type="datetime-local" 
                      onChange={handleChange}
                      />
                      {datesError && <FormHelperText  sx={{color:'red'}}>Please select valid date </FormHelperText>}

                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="days"
                       label= "days" 
                       variant= "outlined" 
                      
                      
                       required
                       onChange={handleChange}
                       />
                    {daysError && <FormHelperText  sx={{color:'red'}}>Please enter valid days value</FormHelperText>}

                    </FormControl>
</Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="times"
                      value={times}
                      label="Times"
                      variant="outlined"
                      fullWidth
                      required
                      error={!timesError}
                      onChange={handleChange}
                      />
                       {!timesError && (
                    <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid time in the format HH:mm
                    </FormHelperText>
                )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="status"
                       label= "Status" 
                       variant= "outlined" 
                       fullWidth 
                       value={status}
                       required
                       onChange={handleChange}
                       />
                    {statusError && <FormHelperText  sx={{color:'red'}}>Please enter valid status value</FormHelperText>}

                    </FormControl>
                  </Grid>
                  
                  
              {
                inputFormElements18.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                  {/* <TextField {...input}  />  */}
                  </Grid>)
              }
               </Grid>
               <Grid container spacing={1} paddingTop={'20px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{
                }}  
        variant='contained' color='primary' >SAVE</Button>
              </Grid>
              </Grid>
    
    
          
           </form> 
           </CardContent>
           </Card>
           </Grid>
        </div>
    );



  }