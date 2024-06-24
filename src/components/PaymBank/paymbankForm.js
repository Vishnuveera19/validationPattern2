import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button, Typography, Box, CardContent, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PAYMEMPLOYEE, PAYMBANK } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';

export default function PaybankForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    pnCompanyId: '',
    pnBranchId: '',
    empcode: '',
    empName: '',
    vBankName: '',
    vBankCode: '',
    status: '',
    branchName: '',
    accountType: '',
    micrCode: '',
    ifscCode: '',
    address: '',
    others: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'pnCompanyId':
      case 'pnBranchId':
      case 'empcode':
      case 'empName':
      case 'branchName':
      case 'address':
        if (!value) errorMsg = 'This field is required';
        break;
      case 'vBankName':
      case 'vBankCode':
      case 'accountType':
        if (!/^[A-Za-z0-9\s]{1,50}$/.test(value)) errorMsg = 'Invalid format';
        break;
      case 'status':
        if (!/^[A-Za-z]{1}$/.test(value)) errorMsg = 'Invalid format';
        break;
      case 'micrCode':
        if (!/^[A-Za-z0-9\s]{1,20}$/.test(value)) errorMsg = 'Invalid format';
        break;
      case 'ifscCode':
        if (!/^[A-Za-z0-9\s]{1,50}$/.test(value)) errorMsg = 'Invalid format';
        break;
      case 'others':
        if (!/^[A-Za-z0-9\s]{1,100}$/.test(value)) errorMsg = 'Invalid format';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = 'This field is required';
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await postRequest(ServerConfig.url, PAYMBANK, formData);
      navigate('/PaymBankTable');
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
            <Typography variant='h5' color='textSecondary' align='center'>Paybank Form</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select name="pnCompanyId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.map((e) => <option key={e.pnCompanyId}>{e.pnCompanyId}</option>)}
                    </select>
                    {errors.pnCompanyId && <FormHelperText sx={{ color: 'red' }}>{errors.pnCompanyId}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select name="pnBranchId" onChange={handleChange} style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === formData.pnCompanyId).map((e) => <option key={e.pnBranchId}>{e.pnBranchId}</option>)}
                    </select>
                    {errors.pnBranchId && <FormHelperText sx={{ color: 'red' }}>{errors.pnBranchId}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Employee Code</InputLabel>
                    <select
                      name="empcode"
                      onChange={(e) => {
                        const empCode = e.currentTarget.value;
                        const emp = employee.find((e) => e.employeeCode === empCode);
                        setFormData((prevData) => ({
                          ...prevData,
                          empcode: empCode,
                          empName: emp ? emp.employeeFullName : ''
                        }));
                        validateField('empcode', empCode);
                      }}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === formData.pnCompanyId && e.pnBranchId === formData.pnBranchId).map((e) => <option key={e.employeeCode}>{e.employeeCode}</option>)}
                    </select>
                    {errors.empcode && <FormHelperText sx={{ color: 'red' }}>{errors.empcode}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="empName"
                      value={formData.empName}
                      label="Employee Name"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ readOnly: true }}
                    />
                    {errors.empName && <FormHelperText sx={{ color: 'red' }}>{errors.empName}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="vBankName"
                      label="vBankName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.vBankName && <FormHelperText sx={{ color: 'red' }}>{errors.vBankName}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="vBankCode"
                      label="vBankCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.vBankCode && <FormHelperText sx={{ color: 'red' }}>{errors.vBankCode}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.status && <FormHelperText sx={{ color: 'red' }}>{errors.status}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="branchName"
                      label="Branch Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.branchName && <FormHelperText sx={{ color: 'red' }}>{errors.branchName}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="accountType"
                      label="Account Type"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.accountType && <FormHelperText sx={{ color: 'red' }}>{errors.accountType}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="micrCode"
                      label="MICR Code"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.micrCode && <FormHelperText sx={{ color: 'red' }}>{errors.micrCode}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="ifscCode"
                      label="IFSC Code"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.ifscCode && <FormHelperText sx={{ color: 'red' }}>{errors.ifscCode}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.address && <FormHelperText sx={{ color: 'red' }}>{errors.address}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="others"
                      label="Others"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                    />
                    {errors.others && <FormHelperText sx={{ color: 'red' }}>{errors.others}</FormHelperText>}
                  </FormControl>
                </Grid>

              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                  <Button type="submit" variant='contained' color='primary'>SAVE</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
