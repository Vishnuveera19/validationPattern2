import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel, TextField, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { PAYMEMPLOYEE, SALARYSTRUCTURE } from '../../serverconfiguration/controllers';

const SalaryStructureForm = () => {
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [pnEmployeeId, setEmpoyeeID] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [salary, setSalary] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [pnEmployeeIdError, setEmpoyeeIDError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);
  const [effectiveDateError, setEffectiveDateError] = useState(false);
  const [remarksError, setRemarksError] = useState(false);

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
      case 'pnEmployeeId':
        setEmpoyeeID(value);
        setEmpoyeeIDError(false);
        break;
      case 'salary':
        setSalary(value);
        setSalaryError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
      case 'effectiveDate':
        setEffectiveDate(value);
        setEffectiveDateError(!value);
        break;
      case 'remarks':
        setRemarks(value);
        setRemarksError(!/^[A-Za-z0-9\s]{1,30}$/.test(value) || !value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!company);
    setBranchError(!branch);
    setEmpoyeeIDError(!pnEmployeeId);
    setSalaryError(!/^\d+(\.\d+)?$/.test(salary) || !salary);
    setEffectiveDateError(!effectiveDate);
    setRemarksError(!/^[A-Za-z0-9\s]{1,30}$/.test(remarks) || !remarks);

    if (!company || !branch || !pnEmployeeId || !salary || !effectiveDate || !remarks) {
      return;
    }

    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      salary: salary,
      pnEmployeeId: pnEmployeeId,
      effectiveDate: effectiveDate,
      remarks: remarks,
    };

    try {
      await postRequest(ServerConfig.url, SALARYSTRUCTURE, formData);
      navigate('/SalaryStructureTable');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
              Salary Structure Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company ID</InputLabel>
                    <Select
                      name="pnCompanyId"
                      value={company}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {employee.map((e) => (
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
                    <InputLabel shrink>Branch ID</InputLabel>
                    <Select
                      name="pnBranchId"
                      value={branch}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {employee
                        .filter((e) => e.pnCompanyId === company)
                        .map((e) => (
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
                    <InputLabel shrink>Employee ID</InputLabel>
                    <Select
                      name="pnEmployeeId"
                      value={pnEmployeeId}
                      onChange={(e) => {
                        const selectedEmployeeId = e.target.value;
                        const selectedEmployee = employee.find(emp => emp.pnEmployeeId === selectedEmployeeId);
                        setEmpoyeeID(selectedEmployeeId);
                        setBasicSalary(selectedEmployee?.basicSalary || '');
                        handleChange(e);
                      }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {employee.map((e) => (
                        <MenuItem key={e.pnEmployeeId} value={e.pnEmployeeId}>
                          {e.pnEmployeeId}
                        </MenuItem>
                      ))}
                    </Select>
                    {pnEmployeeIdError && <FormHelperText  sx={{color:'red'}}>Please select an employee</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Salary</InputLabel>
                    <Select
                      name="salary"
                      value={salary}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={basicSalary}>{basicSalary}</MenuItem>
                    </Select>
                    {salaryError && <FormHelperText  sx={{color:'red'}}>Please select a valid salary</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="effectiveDate"
                      label="Effective Date"
                      type="datetime-local"
                      value={effectiveDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                    {effectiveDateError && <FormHelperText  sx={{color:'red'}}>Please select an effective date</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="remarks"
                      label="Remarks"
                      value={remarks}
                      onChange={handleChange}
                      required
                    />
                    {remarksError && <FormHelperText  sx={{color:'red'}}>Please enter valid remarks</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant="outlined" color="primary">RESET</Button>
                <Button type="submit" variant="contained" color="primary">Save</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalaryStructureForm;