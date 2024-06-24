import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent,FormHelperText, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/lab'; 
import { inputFormElements17 } from './salaryperiod';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { SALARYPERIOD } from '../../serverconfiguration/controllers';
import { TextField } from '@mui/material';

const SalaryPeriodForm = () => {
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');

  const [periodCode, setPeriodCode] = useState('');
  const [selection, setSelection] = useState('');
  const [pYear, setPYear] = useState('');
  const [pMonth, setPMonth] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [payDate, setPayDate] = useState('');
  const [otInclude, setOtInclude] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [pnCompanyIdError, setPnCompanyIdError] = useState(false);
  const [periodCodeError, setPeriodCodeError] = useState(false);
  const [selectionError, setSelectionError] = useState(false);
  const [pYearError, setPYearError] = useState(false);
  const [pMonthError, setPMonthError] = useState(false);
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);
  const [totalDaysError, setTotalDaysError] = useState(false);
  const [payDateError, setPayDateError] = useState(false);
  const [otIncludeError, setOtIncludeError] = useState(false);



  const navigate = useNavigate();
  const margin = { margin: "0 5px" };

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
      case 'periodCode':
        setPeriodCode(value);
        setPeriodCodeError(!/^[A-Za-z0-9\s]{1,15}$/.test(value) || !value);
        break;
      case 'selection':
        setSelection(value);
        setSelectionError(!/^[A-Za-z0-9\s]{1,5}$/.test(value) || !value);
        break;
      case 'pYear':
        setPYear(value);
        setPYearError(!/^\d+(\.\d+)?$/.test(value) || !value);
      break;
      case 'pMonth':
        setPMonth(value);
        setPMonthError(!/^[A-Za-z0-9\s]{1,15}$/.test(value) || !value);
        break;
        case 'totalDays':
          setTotalDays(value);
          setTotalDaysError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
        case 'otInclude':
          setOtInclude(value);
          setOtIncludeError(!/^[A-Za-z\s]{1}$/.test(value) || !value);
          break;
      
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!company);
    setBranchError(!branch);
    setPeriodCodeError(!/^[A-Za-z0-9\s]{1,15}$/.test(periodCode) || !periodCode);
    setSelectionError(!/^[A-Za-z0-9\s]{1,5}$/.test(selection) || !selection);
    setPYearError(!/^\d+$/.test(pYear) || !pYear);
    setPMonthError(!/^[A-Za-z0-9\s]{1,15}$/.test(pMonth) || !pMonth);
    setFromDateError(!fromDate);
    setToDateError(!toDate);
    setTotalDaysError(!/^\d+$/.test(totalDays) || !totalDays);
    setPayDateError(!payDate);
    setOtInclude(!/^[A-Za-z\s]{1}$/.test(otInclude) || !otInclude);


    if (!company || !branch || !periodCode || !selection || !pYear || !pMonth ||!fromDate || !toDate  || !totalDays ||  !payDate || !otInclude) {
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    periodCode: periodCode,
    selection: selection,
    pYear: pYear,
    pMonth: pMonth,
    fromDate:fromDate,
    toDate: toDate,
    totalDays: totalDays,
    payDate:payDate,
    otInclude: otInclude,
    };

    try {
      console.log('Form data:', formData);
      const response = await postRequest(ServerConfig.url, SALARYPERIOD, formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Data saved successfully!');
        navigate('/SalaryPeriodTable');
      } else {
        console.error('Error saving data:', response.statusText);
        console.error('Server validation errors:', response);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const [formData, setFormData] = useState({
    pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    periodCode: periodCode,
    selection: selection,
    pYear: pYear,
    pMonth: pMonth,
    fromDate:fromDate,
    toDate: toDate,
    totalDays: totalDays,
    payDate:payDate,
    otInclude: otInclude,
  });




  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center' gutterBottom>
              Salary Period Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      value={company}
                        onChange={handleChange}
                     
                    >
                      {employee.map(e => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.pnCompanyId}
                        </MenuItem>
                      ))}
                    </Select>
                    {companyError && <FormHelperText sx={{color:'red'}}>Please select a company</FormHelperText>}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      value={branch}
                      onChange={handleChange}

                    
                    >
                      {employee
                        .filter(e => e.pnCompanyId === company)
                        .map(e => (
                          <MenuItem key={e.pnBranchId} value={e.pnBranchId}>
                            {e.pnBranchId}
                          </MenuItem>
                        ))}
                    </Select>
                    {branchError && <FormHelperText  sx={{color:'red'}}>Please select a branch</FormHelperText>}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>periodCode</InputLabel>
                    <TextField
                     name= "periodCode"
                     value={periodCode}
                     onChange={handleChange}

                     label= "PeriodCode"
                     variant= "outlined"
                     required
                    />
                     {periodCodeError && <FormHelperText  sx={{color:'red'}}>Please enter valid remarks</FormHelperText>}
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>selection</InputLabel>
                    <TextField
                    name= "selection"
                    label= "Selection" 
                    onChange={handleChange}
                    variant= "outlined"
                    required
                    value={selection}
                    />
                     {selectionError && <FormHelperText  sx={{color:'red'}}>Please enter valid selection</FormHelperText>}
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>pYear</InputLabel>
                    <TextField
                     name= "pYear"
                     label= "PYear"
                     onChange={handleChange}

                     variant= "outlined" 
                     required
                    />
                     {pYearError && <FormHelperText  sx={{color:'red'}}>Please enter valid pYear</FormHelperText>}
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>pMonth</InputLabel>
                    <TextField
                    name="pMonth"
                    label= "PMonth"
                    onChange={handleChange}

                    variant="outlined"
                  
                    required
                    />
                     {pMonthError && <FormHelperText  sx={{color:'red'}}>Please enter valid pMonth</FormHelperText>}
                    </FormControl>
                    </Grid>
                  <Grid  item xs={12} sm={6}>
                  <FormControl fullWidth>
                  <InputLabel shrink>formData</InputLabel>
                      <TextField
                        name= "formData"
                        label= "formData"
                        variant="outlined"
                        onChange={handleChange}
                         type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                      />
                  
                    {fromDateError && <FormHelperText  sx={{color:'red'}}>Please select valid fromdate</FormHelperText>}
                        </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                    <InputLabel shrink>toDate</InputLabel>
                    <TextField
                      name= "toDate"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      type="datetime-local"
                    />
                    {toDateError && <FormHelperText  sx={{color:'red'}}>Please enter valid toDate</FormHelperText>}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                    <InputLabel >totalDays</InputLabel>
                    <TextField
                       name= "totalDays"
                       label= "TotalDays" 
                       onChange={handleChange}
                       variant= "outlined" 
                       required
                     
                    />
                  {totalDaysError && <FormHelperText  sx={{color:'red'}}>Please enter valid totalDays</FormHelperText>}

                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink >payDate</InputLabel>
                    <TextField
                      name= "payDate"
                    
                    
                      variant= "outlined"
                      onChange={handleChange}

                      required
                   
                      type="datetime-local"
                     
                    />
                    {payDateError && <FormHelperText  sx={{color:'red'}}>Please enter valid payDate</FormHelperText>}

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                    <InputLabel >otInclude</InputLabel>
                    <TextField
                      name= "otInclude"
                      label ="OtInclude"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }} 
                      onChange={handleChange}

                      required   
                    />
                    {otIncludeError && <FormHelperText  sx={{color:'red'}}>Please enter valid otInclude</FormHelperText>}

                  </FormControl>
                </Grid>

              
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                <Button type="submit" variant='contained' color='primary'>Save</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalaryPeriodForm;
