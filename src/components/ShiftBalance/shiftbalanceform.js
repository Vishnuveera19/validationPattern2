import React, { useState, useEffect } from 'react';
import { postRequest, getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Typography,
  Grid,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
} from '@mui/material';

import { PAYMEMPLOYEE, SHIFTBALANCE, SHIFTMONTH, SHIFTPATTERN } from '../../serverconfiguration/controllers';

export default function Sample15() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [monthyear, setMonthYear] = useState('');
  const [slot, setSlot] = useState('');
  const [balanceDays, setBalanceDays] = useState('');
  const [patternCode, setPatternCode] = useState('');
  const [shiftpatterns, setShiftPatterns] = useState([]);
  const [shiftmonths, setShiftMonths] = useState([]);

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [employeeCodeError, setEmployeeCodeError] = useState(false);
  const [employeeNameError, setEmployeeNameError] = useState(false);
  const [monthyearError, setMonthYearError] = useState(false);
  const [slotError, setSlotError] = useState(false);
  const [balanceDaysError, setBalanceDaysError] = useState(false);
  const [patternCodeError, setPatternCodeError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const empData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
        setEmployee(empData.data);

        const patData = await getRequest(ServerConfig.url, SHIFTPATTERN);
        setShiftPatterns(patData.data);

        const monData = await getRequest(ServerConfig.url, SHIFTMONTH);
        setShiftMonths(monData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
      case 'pnEmployeecode':
        setEmployeeCode(value);
        setEmployeeCodeError(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'pnEmployeename':
        setEmployeeName(value);
        setEmployeeNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value);
        break;
      case 'monthyear':
        setMonthYear(value);
        setMonthYearError(!/^[A-Za-z0-9\s]{1,8}$/.test(value) || !value);
        break;
      case 'patternCode':
        setPatternCode(value);
        setPatternCodeError(!/^[A-Za-z0-9\s]{1,5}$/.test(value) || !value);
        break;
      case 'slot':
        setSlot(value);
        setSlotError(!/^\d+$/.test(value) || !value);
        break;
      case 'balanceDays':
        setBalanceDays(value);
        setBalanceDaysError(!/^\d+$/.test(value) || !value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!company);
    setBranchError(!branch);
    setEmployeeCodeError(!/^[A-Za-z0-9\s]{1,10}$/.test(employeeCode) || !employeeCode);
    setEmployeeNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(employeeName) || !employeeName);
    setMonthYearError(!/^[A-Za-z0-9\s]{1,8}$/.test(monthyear) || !monthyear);
    setPatternCodeError(!/^[A-Za-z0-9\s]{1,5}$/.test(patternCode) || !patternCode);
    setSlotError(!/^\d+$/.test(slot) || !slot);
    setBalanceDaysError(!/^\d+$/.test(balanceDays) || !balanceDays);

    if (
      !company ||
      !branch ||
      !employeeCode ||
      !employeeName ||
      !monthyear ||
      !patternCode ||
      !slot ||
      !balanceDays ||
      companyError ||
      branchError ||
      employeeCodeError ||
      employeeNameError ||
      monthyearError ||
      patternCodeError ||
      slotError ||
      balanceDaysError
    ) {
      return;
    }

    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      pnEmployeecode: employeeCode,
      pnEmployeename: employeeName,
      monthyear: monthyear,
      patternCode: patternCode,
      slot: slot,
      balanceDays: balanceDays,
    };

    try {
      await postRequest(ServerConfig.url, SHIFTBALANCE, formData);
      navigate('/ShiftBalanceTable');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const margin = { margin: '0 5px' };

  return (
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center'>
              Shift Balance
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' gutterBottom align='center'>
              Fill all the mandatory fields
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={companyError}>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      name='pnCompanyId'
                      value={company}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                      inputlabelprops={{ shrink: true }}
                    >
                      <MenuItem value=''>
                        <em>Select</em>
                      </MenuItem>
                      {employee.map((emp) => (
                        <MenuItem key={emp.pnCompanyId} value={emp.pnCompanyId}>
                          {emp.pnCompanyId}
                        </MenuItem>
                      ))}
                    </Select>
                    {companyError && <FormHelperText style={{ color: 'red' }}>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      name='pnBranchId'
                      value={branch}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                      inputlabelprops={{ shrink: true }}
                    >
                      <MenuItem value=''>
                        <em>Select</em>
                      </MenuItem>
                      {employee
                        .filter((emp) => emp.pnCompanyId === company)
                        .map((emp) => (
                          <MenuItem key={emp.pnBranchId} value={emp.pnBranchId}>
                            {emp.pnBranchId}
                          </MenuItem>
                        ))}
                    </Select>
                    {branchError && <FormHelperText style={{ color: 'red' }}>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeCodeError}>
                    <InputLabel shrink>Employee Code</InputLabel>
                    <Select
                      name='pnEmployeecode'
                      value={employeeCode}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=''>
                        <em>Select</em>
                      </MenuItem>
                      {employee
                        .filter((emp) => emp.pnCompanyId === company && emp.pnBranchId === branch)
                        .map((emp) => (
                          <MenuItem key={emp.employeeCode} value={emp.employeeCode}>
                            {emp.employeeCode}
                          </MenuItem>
                        ))}
                    </Select>
                    {employeeCodeError && <FormHelperText style={{ color: 'red' }}>Please select a valid employee code</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeNameError}>
                    <TextField
                      name='pnEmployeename'
                      value={employeeName}
                      label='Employee Name'
                      variant='outlined'
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={patternCodeError}>
                    <InputLabel shrink>Pattern Code</InputLabel>
                    <Select
                      name='patternCode'
                      value={patternCode}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=''>
                        <em>Select</em>
                      </MenuItem>
                      {shiftpatterns.map((pattern) => (
                        <MenuItem key={pattern.patternCode} value={pattern.patternCode}>
                        {pattern.patternCode}
                      </MenuItem>
                    ))}
                    </Select>
                    {patternCodeError && <FormHelperText style={{ color: 'red' }}>Please select a pattern code</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={monthyearError}>
                    <InputLabel shrink>MonthYear</InputLabel>
                    <Select
                      name='monthyear'
                      value={monthyear}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=''>
                        <em>Select</em>
                      </MenuItem>
                      {shiftmonths.map((month) => (
                        <MenuItem key={month.monthyear} value={month.monthyear}>
                          {month.monthyear}
                        </MenuItem>
                      ))}
                    </Select>
                    {monthyearError && <FormHelperText sx={{ color: 'red' }}>Please select a month and year</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={slotError}>
                    <TextField
                      name='slot'
                      value={slot}
                      label='Slot'
                      variant='outlined'
                      onChange={handleChange}
                      required
                    />
                    {slotError && <FormHelperText style={{ color: 'red' }}>Please enter a valid slot number</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={balanceDaysError}>
                    <TextField
                      name='balanceDays'
                      value={balanceDays}
                      label='Balance Days'
                      variant='outlined'
                      onChange={handleChange}
                      required
                    />
                    {balanceDaysError && <FormHelperText style={{ color: 'red' }}>Please enter a valid balance days</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                  <Button style={margin} type='reset' variant='outlined' color='primary'>
                    RESET
                  </Button>
                  <Button type='submit' variant='contained' color='primary'>
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

