import { Grid, Card, TextField, Button, Typography, CardContent, FormControl, FormHelperText, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { OTSLAB, PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';

export default function OTSlabForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [otFrom, setOtFrom] = useState('');
  const [otTo, setOtTo] = useState('');
  const [otSlab1, setOtslab1] = useState('');
  const [pnCategory, setPnCategory] = useState('');
  const [otHrs, setOtHrs] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [employeeCodeError, setEmployeeCodeError] = useState(false);
  const [employeeNameError, setEmployeeNameError] = useState(false);
  const [otFromError, setOtFromError] = useState(false);
  const [otToError, setOtToError] = useState(false);
  const [otSlab1Error, setOtslab1Error] = useState(false);
  const [pnCategoryError, setPnCategoryError] = useState(false);
  const [otHrsError, setOtHrsError] = useState(false);

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
        setCompanyError(!value);
        break;
      case 'pnBranchId':
        setBranch(value);
        setBranchError(!value);
        break;
      case 'empCode':
        setEmployeeCode(value);
        const emp = employee.find((e) => e.employeeCode === value);
        setEmployeeName(emp ? emp.employeeFullName : '');
        setEmployeeCodeError(!value);
        break;
      case 'otFrom':
        setOtFrom(value + ':00.000');
        setOtFromError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(value + ':00.000'));
        break;
      case 'otTo':
        setOtTo(value + ':00.000');
        setOtToError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(value + ':00.000'));
        break;
      case 'otSlab1':
        setOtslab1(value + ':00.000');
        setOtslab1Error(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(value + ':00.000'));
        break;
      case 'pnCategory':
        setPnCategory(value);
        setPnCategoryError(!/^[A-Za-z0-9\s]{1,30}$/.test(value));
        break;
      case 'otHrs':
        setOtHrs(value);
        setOtHrsError(!/^\d+(\.\d+)?$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = [
      company,
      branch,
      employeeCode,
      employeeName,
      otFrom,
      otTo,
      otSlab1,
      pnCategory,
      otHrs,
    ].some((field) => !field);

    if (hasErrors) {
      setCompanyError(!company);
      setBranchError(!branch);
      setEmployeeCodeError(!employeeCode);
      setEmployeeNameError(!employeeName);
      setOtFromError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(otFrom));
      setOtToError(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(otTo));
      setOtslab1Error(!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:00\.000$/.test(otSlab1));
      setPnCategoryError(!/^[A-Za-z0-9\s]{1,30}$/.test(pnCategory));
      setOtHrsError(!/^\d+(\.\d+)?$/.test(otHrs));
      return;
    }

    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      empCode: employeeCode,
      empName: employeeName,
      otFrom,
      otTo,
      otSlab1,
      pnCategory,
      otHrs
    };

    try {
      console.log('Form data:', formData);
      const response = await postRequest(ServerConfig.url, OTSLAB, formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Data saved successfully!');
        navigate('/OtsLabTable');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" color="dark" align="center" borderBottom={"20px"}>OTSLAB</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={companyError}>
                    <InputLabel shrink>Company</InputLabel>
                    <select name="pnCompanyId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.map((e) => (
                        <option key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</option>
                      ))}
                    </select>
                    {companyError && <FormHelperText>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={branchError}>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select name="pnBranchId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === company).map((e) => (
                        <option key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</option>
                      ))}
                    </select>
                    {branchError && <FormHelperText>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeCodeError}>
                    <InputLabel shrink>empCode</InputLabel>
                    <select name="empCode" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === company && e.pnBranchId === branch).map((e) => (
                        <option key={e.employeeCode} value={e.employeeCode}>{e.employeeCode}</option>
                      ))}
                    </select>
                    {employeeCodeError && <FormHelperText>Please select an employeecode</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeNameError}>
                    <TextField
                      name="empName"
                      value={employeeName}
                      label="employeename"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                    {employeeNameError && <FormHelperText>Please select an employeename</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={otFromError}>
                    <TextField
                      name="otFrom"
                      type="time"
                      label="otFrom"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      error={otFromError}
                      helperText={otFromError && 'Invalid time format'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={otToError}>
                    <TextField
                      name="otTo"
                      type="time"
                      label="otTo"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      error={otToError}
                      helperText={otToError && 'Invalid time format'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={otSlab1Error}>
                    <TextField
                      name="otSlab1"
                      type="time"
                      label="otSlab1"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      error={otSlab1Error}
                      helperText={otSlab1Error && 'Invalid time format'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={pnCategoryError}>
                    <TextField
                      name="pnCategory"
                      value={pnCategory}
                      label="pnCategory"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                      error={pnCategoryError}
                      helperText={pnCategoryError && 'Invalid category (1-30 characters)'}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={otHrsError}>
                    <TextField
                      name="otHrs"
                      value={otHrs}
                      label="otHrs"
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                      required
                      error={otHrsError}
                      helperText={otHrsError && 'Invalid number'}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container  style={{ marginTop: '10px',justifyContent:"right" }}>
                <Button type="submit" variant="contained" color="primary">Save</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
