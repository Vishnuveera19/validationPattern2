import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,FormHelperText,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYINPUT, PAYROLLFINALSETTLEMENT } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import PayrollFinalSettlemetTable from '../Payrollfinalsettlement/payrollfinalsettlementTables';



export default function PayinputForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [dDate,setDdate]=useState([])
const [dFromDate,setDfromDate]=useState("")
const [dToDate,setDtoDate]=useState("")
const [calcDays,setCalcDays]=useState("")
const [paidDays,setPaidDays]=useState("")
const [presentDays,setPresentDays]=useState("")
const[holidays, setHolidays] = useState("")
const [absentDays,setAbsentDays]=useState("")
const [totLeaveDays,setTotLeaveDays]=useState("")
const [weekOffDays,setWeekOffDays]=useState("")
const [attBonusAmount,setAttBonusAmount]=useState("")
const [onDutyDays,setOnDutyDays]=useState("")
const [compoffDays,setCompOffDays]=useState("")
const [otHrs,setOtHrs]=useState("")
const [earnArrears,setEarnArrears]=useState("")
const [attBonus,setAttBonus]=useState("")
const [dedArrears,setDedArrears]=useState("")
const [otValue,setOtValue]=useState("")
const [otAmt,setOtAmt]=useState("")
const [actBasic,setActBasic]=useState("")
const [earnBasic,setEarnBasic]=useState("")
const [mode,setMode]=useState("")
const [flag,setFlag]=useState("")
const [ptGross,setPtGross]=useState("")
const[tourDays, setTourDays] = useState("")
const [paymBranch,setPaymBranch]=useState("")




const [employeeError,setEmployeeError]=useState(false)
const [companyError,setCompanyError]=useState(false)
const [branchError,setBranchError]=useState(false)
const [pnEmployeeIdError,setEmployeeIdError]=useState(false)
const [dDateError,setDdateError]=useState(false)
const [dFromDateError,setDfromDateError]=useState(false)
const [dToDateError,setDtoDateError]=useState(false)
const [calcDaysError,setCalcDaysError]=useState(false)
const [paidDaysError,setPaidDaysError]=useState(false)
const [presentDaysError,setPresentDaysError]=useState(false)
const[holidaysError, setHolidaysError] = useState(false)
const [absentDaysError,setAbsentDaysError]=useState(false)
const [totLeaveDaysError,setTotLeaveDaysError]=useState(false)
const [weekOffDaysError,setWeekOffDaysError]=useState(false)
const [attBonusAmountError,setAttBonusAmountError]=useState(false)
const [onDutyDaysError,setOnDutyDaysError]=useState(false)
const [compoffDaysError,setCompOffDaysError]=useState(false)
const [otHrsError,setOtHrsError]=useState(false)
const [earnArrearsError,setEarnArrearsError]=useState(false)
const [attBonusError,setAttBonusError]=useState(false)
const [dedArrearsError,setDedArrearsError]=useState(false)
const [otValueError,setOtValueError]=useState(false)
const [otAmtError,setOtAmtError]=useState(false)
const [actBasicError,setActBasicError]=useState(false)
const [earnBasicError,setEarnBasicError]=useState(false)
const [modeError,setModeError]=useState(false)
const [flagError,setFlagError]=useState(false)
const [ptGrossError,setPtGrossError]=useState(false)
const[tourDaysError, setTourDaysError] = useState(false)
const [paymBranchError,setPaymBranchError]=useState(false)


useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  
}
getData();
}, []);


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
    case 'pnEmployeeId':
      setEmployeeId(value);
      setEmployeeIdError(false);
      break;
    case 'calcDays':
      setCalcDays(value);
      setCalcDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
      break;
      case 'paidDays':
        setPaidDays(value);
        setPaidDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
        case 'presentDays':
          setPresentDays(value);
          setPresentDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
       break;
       case 'absentDays':
      setAbsentDays(value);
      setAbsentDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
      break;
      case 'totLeaveDays':
        setTotLeaveDays(value);
        setTotLeaveDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
        case 'weekOffDays':
          setWeekOffDays(value);
          setWeekOffDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
     break;
     case 'holidays':
      setHolidays(value);
      setHolidaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
    break;
    case 'onDutyDays':
      setOnDutyDays(value);
      setOnDutyDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
      break;
      case 'compoffDays':
        setCompOffDays(value);
        setCompOffDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
    break;
    case 'tourDays':
      setTourDays(value);
      setTourDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
    break;
    case 'attBonus':
      setAttBonus(value);
      setAttBonusError(!/^\d+(\.\d+)?$/.test(value) || !value);
      break;
      case 'attBonusAmount':
        setAttBonusAmount(value);
        setAttBonusAmountError(!/^\d+(\.\d+)?$/.test(value) || !value);
  break;
  case 'otHrs':
      setOtHrs(value + ':00.000');
      setOtHrsError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-3]:00\.000$/.test(value + ':00.000'));
      break;
    
        case 'earnArrears':
          setEarnArrears(value);
          setEarnArrearsError(!/^\d+(\.\d+)?$/.test(value) || !value);
          break;
          case 'dedArrears':
            setDedArrears(value);
            setDedArrearsError(!/^\d+(\.\d+)?$/.test(value) || !value);
            break;
            case 'otValue':
              setOtValue(value);
              setOtValueError(!/^\d+(\.\d+)?$/.test(value) || !value);
              break;
              case 'otAmt':
                setOtAmt(value);
                setOtAmtError(!/^\d+(\.\d+)?$/.test(value) || !value);
                break;
                case 'actBasic':
                  setActBasic(value);
                  setActBasicError(!/^\d+(\.\d+)?$/.test(value) || !value);
                  break;
                  case 'earnBasic':
                    setEarnBasic(value);
                    setEarnBasicError(!/^\d+(\.\d+)?$/.test(value) || !value);
                    break;
                    case 'mode':
                      setMode(value);
                      setModeError(!/^\d+(\.\d+)?$/.test(value) || !value);
                      break;
                      case 'flag':
                        setFlag(value);
                        setFlagError(!/^\d+(\.\d+)?$/.test(value) || !value);
                        break;
                        case 'ptGross':
                          setPtGross(value);
                          setPtGrossError(!/^\d+(\.\d+)?$/.test(value) || !value);
                          break;
    
      break;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setCompanyError(!company);
  setBranchError(!branch);
  setEmployeeIdError(!pnEmployeeId);
  setCalcDaysError(!/^\d+(\.\d+)?$/.test(calcDays) || !calcDays);
  setPaidDaysError(!/^\d+(\.\d+)?$/.test(paidDays) || !paidDays);
  setPresentDays(!/^\d+(\.\d+)?$/.test(presentDays) || !presentDays);
  setAbsentDaysError(!/^\d+(\.\d+)?$/.test(absentDays) || !absentDays);
  setTotLeaveDaysError(!/^\d+(\.\d+)?$/.test(totLeaveDays) || !totLeaveDays);
  setWeekOffDaysError(!/^\d+(\.\d+)?$/.test(weekOffDays) || !weekOffDays);
  setHolidaysError(!/^\d+(\.\d+)?$/.test(holidays) || !holidays);
  setOnDutyDaysError(!/^\d+(\.\d+)?$/.test(onDutyDays) || !onDutyDays);
  setCompOffDaysError(!/^\d+(\.\d+)?$/.test(compoffDays) || !compoffDays);
  setTourDaysError(!/^\d+(\.\d+)?$/.test(tourDays) || !tourDays);
  setAttBonusError(!/^\d+(\.\d+)?$/.test(attBonus) || !attBonus);
  setAttBonusAmountError(!/^\d+(\.\d+)?$/.test(attBonusAmount) || !attBonusAmount);
  setOtHrsError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-3]:00\.000$/.test(otHrs + ':00.000'));
  setEarnArrearsError(!/^\d+(\.\d+)?$/.test(earnArrears) || !earnArrears);
  setDedArrearsError(!/^\d+(\.\d+)?$/.test(dedArrears) || !dedArrears);
  setOtValueError(!/^\d+(\.\d+)?$/.test(otValue) || !otValue);
  setOtAmtError(!/^\d+(\.\d+)?$/.test(otAmt) || !otAmt);
  setActBasicError(!/^\d+(\.\d+)?$/.test(actBasic) || !actBasic);
  setEarnBasicError(!/^\d+(\.\d+)?$/.test(earnBasic) || !earnBasic);
  setModeError(!/^\d+(\.\d+)?$/.test(mode) || !mode);
  setFlagError(!/^\d+(\.\d+)?$/.test(flag) || !flag);
  setPtGrossError(!/^\d+(\.\d+)?$/.test(ptGross) || !ptGross);


  if (!company || !branch || !pnEmployeeId || !calcDays || !paidDays ||
     !presentDays ||
    !absentDays||
  !totLeaveDays ||
 ! weekOffDays ||
!holidays ||
!onDutyDays || !compoffDays || ! tourDays  ||  !attBonus  || !attBonusAmount || !otHrs || !earnArrears ||dedArrears ||  !otValue || !otAmt  || !actBasic || !earnBasic || !mode || !flag || !ptGross) {
    return;
  }

  const formData = {
    pnCompanyId: company,
  pnBranchId: branch,
        pnEmployeeId: pnEmployeeId,
        dDate: dDate,
        dFromDate: dFromDate,
        dToDate: dToDate,
        calcDays: calcDays,
        paidDays: paidDays,
        presentDays: presentDays,
        absentDays: absentDays,
        totLeaveDays: totLeaveDays,
        weekOffDays:  weekOffDays,
        holidays: holidays,
        onDutyDays: onDutyDays,
        compoffDays: compoffDays,
        tourDays: tourDays,
        attBonus: attBonus,
        attBonusAmount: attBonusAmount,
        otHrs: otHrs,
        earnArrears: earnArrears,
        dedArrears: dedArrears,
        otValue: otValue,
        otAmt: otAmt,
        actBasic: actBasic,
        earnBasic: earnBasic,
        mode: mode,
        flag: flag,
        ptGross: ptGross,
        paymBranch:{
          "pnbranchId":branch 
        },
        pnCompany:{
          "pnCompanyId":company
        }
};

  

  try {
    await postRequest(ServerConfig.url, PAYINPUT, formData);
    navigate('/PayInputTable');
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
      <Typography variant='h5' color='S- Light' align='center'>PayinputForm</Typography>
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
               {companyError && <FormHelperText sx={{color:'red'}}>Please select a company</FormHelperText>}

            </FormControl >
                </Grid>
                <Grid xs={12} sm={6} item>
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
                     
                        employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                   }
               </select>
               {branchError && <FormHelperText sx={{color:'red'}}>Please select a branch</FormHelperText>}

               </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth >
                  <InputLabel shrink>EmployeeId</InputLabel>
               <select 
               name="pnEmployeeId"
               onChange={handleChange}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==  branch)).map((e)=><option>{e.pnEmployeeId}</option>)
                   }
               </select>
               {employeeError && <FormHelperText sx={{color:'red'}}>Please select a EmployeeId</FormHelperText>}

               </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dDate"
                 
                  label="dDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={handleChange} 
                  InputLabelProps={{ shrink: true }} 
                />
             {dDateError && <FormHelperText sx={{color:'red'}}>Please select a dDate</FormHelperText>}

                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dFromDate"
              type= "datetime-local"
                  label="dFromDate"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 
                  InputLabelProps={{ shrink: true }} 
                />
            {dFromDateError && <FormHelperText sx={{color:'red'}}>Please select a dFromDateate</FormHelperText>}


                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dToDate"
                 
                  label=" dToDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) =>  {
                    setDtoDate(e.target.value)
                   console.log(dToDate)

                  }} 
                  InputLabelProps={{ shrink: true }} 
                />
                             {dToDate && <FormHelperText sx={{color:'red'}}>Please select a dToDate</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="calcDays"
                 
                  label="calcDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                 {calcDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="paidDays"
                 
                  label="paidDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
               {paidDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="presentDays"
                 
                  label="presentDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                {presentDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="absentDays"
                 
                  label="absentDays"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={handleChange} 
                  
                />
                {absentDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "totLeaveDays"
                 
                  label="totLeaveDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                {totLeaveDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "weekOffDays"
                 
                  label="weekOffDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
               {weekOffDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "holidays"
                 
                  label="holidays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
              {holidaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "onDutyDays"
                 
                  label="onDutyDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {onDutyDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "compoffDays"
                 
                  label="compoffDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {compoffDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "tourDays"
                 
                  label="tourDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {tourDaysError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "attBonus"
                 
                  label=" attBonus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {attBonusError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "attBonusAmount"
                 
                  label="attBonusAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {attBonusAmountError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otHrs"
                 
                  label="otHrs"
                  variant="outlined"
                  type='time'
                  fullWidth
                  required
                  onChange={handleChange} 
                  InputLabelProps={{ shrink: true }} 
                />
                              {otHrsError && <FormHelperText sx={{color:'red'}}>Please select values</FormHelperText>}

                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "earnArrears"
                 
                  label="earnArrears"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                            {earnArrearsError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "dedArrears"
                 
                  label="dedArrears"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {dedArrearsError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otValue"
                 
                  label="otValue"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {otValueError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otAmt"
                 
                  label="otAmt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {otAmtError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "actBasic"
                 
                  label="actBasic"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {actBasicError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "earnBasic"
                 
                  label="earnBasic"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {earnBasicError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "mode"
                 
                  label="mode"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {modeError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>

               


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "flag"
                 
                  label="flag"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                              {flagError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "ptGross"
                 
                  label="ptGross"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={handleChange} 

                />
                {ptGrossError && <FormHelperText sx={{color:'red'}}>Please enter values</FormHelperText>}

                </FormControl>
                </Grid>


               
                

              
        </Grid>
        <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  pnEmployeeId: pnEmployeeId,
  dDate: dDate.toString().split("T").join(" ")+":00",
  dFromDate: dFromDate.split("T").join(" ")+":00",
  dToDate: dToDate.split("T").join(" ")+":00",
  calcDays: calcDays,
  paidDays: paidDays,
  presentDays: presentDays,
  absentDays: absentDays,
  totLeaveDays: totLeaveDays,
  weekOffDays:  weekOffDays,
  holidays: holidays,
  onDutyDays: onDutyDays,
  compoffDays: compoffDays,
  tourDays: tourDays,
  attBonus: attBonus,
  attBonusAmount: attBonusAmount,
  otHrs: otHrs,
  earnArrears: earnArrears,
  dedArrears: dedArrears,
  otValue: otValue,
  otAmt: otAmt,
  actBasic: actBasic,
  earnBasic: earnBasic,
  mode: mode,
  flag: flag,
  ptGross: ptGross,
  paymBranch:{
    pnCompany:{
      "pnCompanyId": company
    }
  }   
 
  
};
console.log(formData)
postRequest(ServerConfig.url,PAYINPUT,formData).then((e)=>{
console.log(e)
navigate('/PayInputTable')
}).catch((e)=>console.log(e));

                
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

