import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  colors,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMATTBONUS } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';

export default function PaymattbonusForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [fullatt, setFullAtt] = useState('');
  const [halfatt, setHalfAtt] = useState('');
  const [oneatt, setOneAtt] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [employeeCodeError, setEmployeeCodeError] = useState(false);
  const [employeeNameError, setEmployeeNameError] = useState(false);
  const [categoryIdError, setCategoryIdError] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [fullattError, setFullAttError] = useState(false);
  const [halfattError, setHalfAttError] = useState(false);
  const [oneattError, setOneAttError] = useState(false);

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
      case 'employeeCode':
        setEmployeeCode(value);
        setEmployeeCodeError(!value);
        const emp = employee.find((emp) => emp.employeeCode === value);
        if (emp) setEmployeeName(emp.employeeFullName);
        else setEmployeeName('');
        break;
      case 'categoryId':
        setCategoryId(value);
        setCategoryIdError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
      case 'categoryName':
        setCategoryName(value);
        setCategoryNameError(!/^[A-Za-z0-9\s]{1,30}$/.test(value) || !value);
        break;
      case 'fullatt':
        setFullAtt(value);
        setFullAttError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
      case 'halfatt':
        setHalfAtt(value);
        setHalfAttError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
      case 'oneatt':
        setOneAtt(value);
        setOneAttError(!/^\d+(\.\d+)?$/.test(value) || !value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!company);
    setBranchError(!branch);
    setEmployeeCodeError(!employeeCode);
    setEmployeeNameError(!employeeName);
    setCategoryIdError(!/^[A-Za-z0-9\s]{1,20}$/.test(categoryId) || !categoryId);
    setCategoryNameError(!/^[A-Za-z0-9\s]{1,30}$/.test(categoryName) || !categoryName);
    setFullAttError(!/^\d+(\.\d+)?$/.test(fullatt) || !fullatt);
    setHalfAttError(!/^\d+(\.\d+)?$/.test(halfatt) || !halfatt);
    setOneAttError(!/^\d+(\.\d+)?$/.test(oneatt) || !oneatt);

    if (
      companyError ||
      branchError ||
      employeeCodeError ||
      employeeNameError ||
      categoryIdError ||
      categoryNameError ||
      fullattError ||
      halfattError ||
      oneattError
    ) {
      return;
    }

    const formData = {
      pnCompanyId: company,
      pnBranchId: branch,
      empcode: employeeCode,
      empName: employeeName,
      categoryId: categoryId,
      categoryName: categoryName,
      fullatt: fullatt,
      halfatt: halfatt,
      oneatt: oneatt,
    };

    try {
      await postRequest(ServerConfig.url, PAYMATTBONUS, formData);
      navigate('/PaymAttBonusTable');
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
            <Typography variant='h5' color='S- Light' align='center'>
              PaymattbonusForm
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select name="pnCompanyId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.map((e) => (
                        <option key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.pnCompanyId}
                        </option>
                      ))}
                    </select>
                    {companyError && <FormHelperText style={{color:"red"}}>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select name="pnBranchId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee
                        .filter((e) => e.pnCompanyId === company)
                        .map((e) => (
                          <option key={e.pnBranchId} value={e.pnBranchId}>
                            {e.pnBranchId}
                          </option>
                        ))}
                    </select>
                    {branchError && <FormHelperText style={{color:"red"}}>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>empCode</InputLabel>
                    <select
                      name="employeeCode"
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {employee
                        .filter((e) => e.pnCompanyId === company && e.pnBranchId === branch)
                        .map((e) => (
                          <option key={e.employeeCode} value={e.employeeCode}>
                            {e.employeeCode}
                          </option>
                        ))}
                    </select>
                    {employeeCodeError && (
                      <FormHelperText style={{color:"red"}}>Please select an employee code</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="employeeName"
                      value={employeeName}
                      label="employeename"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                    {employeeNameError && (
                      <FormHelperText style={{color:"red"}}>Please enter a valid employee name</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="categoryId"
                      label="categoryId"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {categoryIdError && (
                      <FormHelperText style={{color:"red"}}>Please enter a valid categoryId</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="categoryName"
                      label="categoryName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {categoryNameError && (
                      <FormHelperText style={{color:"red"}}>Please enter a valid category name</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="fullatt"
                      label="fullatt"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {fullattError && (
                      <FormHelperText style={{color:"red"}}>Please enter a valid value for full attendance</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="halfatt"
                      label="halfatt"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {halfattError && (
                      <FormHelperText style={{color:"red"}}>
                        Please enter a valid value for half attendance
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="oneatt"
                      label="oneatt"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {oneattError && (
                      <FormHelperText style={{color:"red"}}>
                        Please enter a valid value for one attendance
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button style={margin} type="reset" variant="outlined" color="primary">
                    RESET
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
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
