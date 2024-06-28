import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,FormHelperText,
    FormControl
  } from '@mui/material';

  import { useState, useEffect } from 'react';
  import { PAYMEMPLOYEE, LOANENTRY, LOANPOST, LOANPRECLOSERS, PAYMBRANCHES } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';
  
  

  export default function LoanPreclosForm() {
  const navigate = useNavigate();
  const [employee,setEmployee]=useState([])
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [pnCompanyId,setPnCompanyId]=useState("")
  const [pnBranchId,setPnBranchId]=useState("")
  const [pnEmployeeId,setPnEmployeeId]=useState("")
  const [loanAppid,setLoanAppid]=useState([])
  const [dDate,setDDate]=useState("")
  const [nLoanamount,setNLoanamount]=useState("")
  const [nBalanceamount,setNBalanceamount]=useState("")
  const [nPaidamount,setNPaidamount]=useState("")  
  const [nClosureamount,setNClosureamount]=useState("")
  const [nCheckno,setNCheckno]=useState("")
  const [dCheckdate,setDCheckdate]=useState("")
  const [nCheckamount,setNCheckamount]=useState("")
  const [vBankname,setVBankname]=useState("")
  const [vRemarks,setVRemarks]=useState("")
  const [cStatus,setCStatus]=useState("")
  const [intAmt,setIntAmt]=useState("")
  const [paymentMode,setPaymentMode]=useState("")
  const [loanProcess,setLoanProcess]=useState("")
  const [loanInterest,setLoanInterest]=useState("")
  const [loanName,setLoanName]=useState("")
  


  const [employeeError,setEmployeeError]=useState(false)
  const [companyError,setCompanyError]=useState(false)
  const [branchError,setBranchError]=useState(false)
  const [pnCompanyIdError,setPnCompanyIdError]=useState(false)
  const [pnBranchIdError,setPnBranchIdError]=useState(false)
  const [pnEmployeeIdError,setPnEmployeeIdError]=useState(false)
  const [loanAppidError,setLoanAppidError]=useState(false)
  const [dDateError,setDDateError]=useState(false)
  const [nLoanamountError,setNLoanamountError]=useState(false)
  const [nBalanceamountError,setNBalanceamountError]=useState(false)
  const [nPaidamountError,setNPaidamountError]=useState(false)  
  const [nClosureamountError,setNClosureamountError]=useState(false)
  const [nChecknoError,setNChecknoError]=useState(false)
  const [dCheckdateError,setDCheckdateError]=useState(false)
  const [nCheckamountError,setNCheckamountError]=useState(false)
  const [vBanknameError,setVBanknameError]=useState(false)
  const [vRemarksError,setVRemarksError]=useState(false)
  const [cStatusError,setCStatusError]=useState(false)
  const [intAmtError,setIntAmtError]=useState(false)
  const [paymentModeError,setPaymentModeError]=useState(false)
  const [loanProcessError,setLoanProcessError]=useState(false)
  const [loanInterestError,setLoanInterestError]=useState(false)
  const [loanNameError,setLoanNameError]=useState(false)
  
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
        setCompany(value);
        setCompanyError(false);
        break;
      case 'pnBranchId':
        setBranch(value);
        setBranchError(false);
        break;
      case 'pnEmployeeId':
        setPnEmployeeId(value);
        setPnEmployeeIdError(!/^\d+$/.test(value) || !value);
        break;
      case 'loanAppid':
        setLoanAppid(value);
        setLoanAppidError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
      case 'nLoanamount':
        setNLoanamount(value);
        setNLoanamountError(!/^\d+(\.\d+)?$/.test(value));
        break;
        case 'nBalanceamount':
        setNBalanceamount(value);
        setNBalanceamountError(!/^\d+(\.\d+)?$/.test(value));
        break;
        case 'nPaidamount':
        setNPaidamount(value);
        setNPaidamountError(!/^\d+(\.\d+)?$/.test(value));
        break;
        case 'nClosureamount':
        setNClosureamount(value);
        setNClosureamountError(!/^\d+(\.\d+)?$/.test(value));
        break;
      case 'nCheckno':
        setNCheckno(value);
        setNChecknoError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        case 'nCheckamount':
        setNCheckamount(value);
        setNCheckamountError(!/^\d+(\.\d+)?$/.test(value));
        break;
        case 'vBankname':
        setVBankname(value);
        setVBanknameError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        case 'vRemarks':
        setVRemarks(value);
        setVRemarksError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        case 'cStatus':
        setCStatus(value);
        setCStatusError(!/^[A-Za-z\s]{1}$/.test(value) || !value);
        break;
        case 'intAmt':
          setIntAmt(value);
          setIntAmtError(!/^\d+(\.\d+)?$/.test(value));
          break;
        case 'paymentMode':
        setPaymentMode(value);
        setPaymentModeError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        case 'loanProcess':
        setLoanProcess(value);
        setLoanProcessError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        case 'loanInterest':
          setLoanInterest(value);
          setLoanInterestError(!/^\d+(\.\d+)?$/.test(value));
          break;
          case 'loanName':
        setLoanName(value);
        setLoanNameError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
        
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!company);
    setBranchError(!branch);
    setPnEmployeeIdError(!/^\d+$/.test(pnEmployeeId) || !pnEmployeeId);
    setLoanAppidError(!/^[A-Za-z0-9\s]{1,20}$/.test(loanAppid) || !loanAppid);
    setNLoanamountError(!/^\d+(\.\d+)?$/.test(nLoanamount) || !nLoanamount);
    setNBalanceamountError(!/^\d+(\.\d+)?$/.test(nBalanceamount) || !nBalanceamount);
    setNPaidamountError(!/^\d+(\.\d+)?$/.test(nPaidamount) || !nPaidamount);
    setNClosureamountError(!/^\d+(\.\d+)?$/.test(nClosureamount) || !nClosureamount);
    setNChecknoError(!/^[A-Za-z0-9\s]{1,20}$/.test(nCheckno) || !nCheckno);
    setNCheckamountError(!/^\d+(\.\d+)?$/.test(nCheckamount) || !nCheckamount);
    setVBanknameError(!/^[A-Za-z0-9\s]{1,20}$/.test(vBankname) || !vBankname);
    setVRemarksError(!/^[A-Za-z0-9\s]{1,20}$/.test(vRemarks) || !vRemarks);
    setCStatusError(!/^[A-Za-z\s]{1}$/.test(cStatus) || !cStatus);
    setIntAmtError(!/^\d+(\.\d+)?$/.test(intAmt) || ! intAmt);
    setPaymentModeError(!/^[A-Za-z0-9\s]{1,20}$/.test(paymentMode) || !paymentMode);
    setLoanProcessError(!/^[A-Za-z0-9\s]{1,20}$/.test(loanProcess) || !loanProcess);
    setLoanInterestError(!/^\d+(\.\d+)?$/.test(loanInterest) || ! loanInterest);
    setLoanNameError(!/^[A-Za-z0-9\s]{1,20}$/.test(loanName) || !loanName);





    if (!company || !branch || !pnEmployeeId || !loanAppid || 
    
      ! nLoanamount||
      !nBalanceamount||
      ! nPaidamount||
    !nClosureamount||
      ! nCheckno||
      !nCheckamount||
      ! dCheckdate||
      ! nCheckamount||
    ! vBankname||
      !  vRemarks||
    ! cStatus||
      !intAmt||
      ! paymentMode||
      ! loanProcess||
      !loanInterest||
      !loanName ) {
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    pnEmployeeId: pnEmployeeId,
    loanAppid: loanAppid,
    dDate: dDate,
    nLoanamount: nLoanamount,
    nBalanceamount: nBalanceamount,
    nPaidamount: nPaidamount,
    nClosureamount:   nClosureamount,
    nCheckno: nCheckno,
    dCheckdate: dCheckdate,
    nCheckamount: nCheckamount,
    vBankname: vBankname,
    vRemarks:  vRemarks,
    cStatus:  cStatus,
    intAmt:  intAmt,
    paymentMode: paymentMode,
    loanProcess: loanProcess,
    loanInterest:  loanInterest,
    loanName:  loanName,
    paymBranch:{
      "pnbranchId":pnBranchId 
    }
    };

    try {
      await postRequest(ServerConfig.url, LOANPRECLOSERS, formData);
      navigate('/LoanPreCloserTable')
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
        <Typography variant='h5' color='S- Light' align='center'>LOAN PRECLOSER</Typography>
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
  
                        branch.map((e)=><option>{e.pnCompanyId}</option>)
                        
                     }
                 </select>
                 {pnCompanyIdError && <FormHelperText  style={{color:"red"}}>Please select a company</FormHelperText>}

              </FormControl >
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>BranchId</InputLabel>
                 <select 
                 name="pnBranchId"
                 onChange={(e)=>{
                  setPnBranchId(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                {
                  branch.map((e)=><option>{e.pnBranchId}</option>)
                }

                 </select>
                 {pnBranchIdError && <FormHelperText style={{color:"red"}}>Please select a branch</FormHelperText>}

                 </FormControl>
                  </Grid>
  
                  
  
  
                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>pnEmployeeId</InputLabel>
              <TextField 
                 name= "pnEmployeeId"
                 label="pnEmployeeId"
                 variant="outlined"
                 fullWidth
                 required 
                 onChange={handleChange}
                   InputLabelProps={{ shrink: true }} 
                   /> 
                {pnEmployeeId && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                 </FormControl>
                  </Grid>
  
            
                 
           
                  <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>LoanId</InputLabel>
              <TextField 
                 name= "loanAppid"
                 label="loanAppid"
                 variant="outlined"
                 fullWidth
                 required 
                   onChange={handleChange} 
                   InputLabelProps={{ shrink: true }} 
                   /> 
             {pnEmployeeId && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

              </FormControl >
                  </Grid>
  
                  <Grid xs={12} sm={6} item  >
                  
                  <FormControl fullWidth>
                 <TextField 
                 name= "dDate"
                 label="dDate"
                 variant="outlined"
                 fullWidth
                 required 
                 type="datetime-local"
                   onChange={(e) => setDDate(e.target.value)} 
                   InputLabelProps={{ shrink: true }}  /> 
          {dDateError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                 </FormControl>
                 </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nLoanamount"
                    label="nLoanamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                  />
              {nLoanamountError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nBalanceamount"
                label="nBalanceamount"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  {nBalanceamountError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nPaidamount"
                   
                    label="nPaidamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                  />
                {nPaidamountError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nClosureamount"
                   
                    label="nClosureamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                  />
                                  {nClosureamountError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nCheckno"
                   
                    label="nCheckno"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                {nChecknoError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dCheckdate"
                   
                    label="dCheckdate"
                    variant="outlined"
                    type='datetime-local'
                    fullWidth
                    
                    required
                    onChange={(e) => setDCheckdate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
  
  
                  />
                {dCheckdateError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nCheckamount"
                   
                    label="nCheckamount"
                    variant="outlined"
                  
                    InputLabelProps={{ shrink: true }} 
  
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                  {nCheckamountError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="vBankname"
                   
                    label="vBankname"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={handleChange} 
                    
                  />
                {vBanknameError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
                 
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "vRemarks"
                   
                    label="vRemarks"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                {vRemarksError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
                  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "cStatus"
                   
                    label="cStatus"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                  {cStatusError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
                  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "intAmt"
                   
                    label="intAmt"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                  {intAmtError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "paymentMode"
                   
                    label="paymentMode"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
              {paymentModeError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanProcess"
                   
                    label="loanProcess"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                                  {loanProcessError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanInterest"
                   
                    label="loanInterest"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  

                  />
                {loanInterestError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanName"
                   
                    label="loanName"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={handleChange} 
  
                  />
                {loanNameError && <FormHelperText  style={{color:"red"}}>Please enter values</FormHelperText>}

                  </FormControl>
                  </Grid>
  
                
          </Grid>
          <Grid container spacing={1} paddingTop={'10px'}>
              
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
  
  