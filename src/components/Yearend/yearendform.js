import React, { useState, useEffect } from 'react';
import { postRequest, getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, FormControl, InputLabel, TextField, Select, MenuItem, FormHelperText } from '@mui/material';
import { PAYMBRANCHES, PAYMCOMPANIES, YEAREND } from '../../serverconfiguration/controllers';

const Sample1 = () => {
  const navigate = useNavigate();
  const margin = { margin: "0 5px" };
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [processdate, setProcessDate] = useState("");
  const [errors, setErrors] = useState({
    companyid: false,
    branchid: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { companyid: false, branchid: false };

    if (!companyid) {
      newErrors.companyid = true;
      hasError = true;
    }

    if (!branchid) {
      newErrors.branchid = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const formData = {
      pnCompanyId: companyid,
      pnBranchId: branchid,
      startDate: startdate,
      endDate: enddate,
      processDate: processdate,
    };

    try {
      const response = await postRequest(ServerConfig.url, YEAREND, formData);
      console.log(response);
      navigate('/YearEndTable');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(companyData.data);

      const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(branchData.data);
    }
    getData();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center' gutterBottom>
              YEAR END FORM
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={errors.companyid}>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      name="PnCompanyid"
                      value={companyid}
                      onChange={(e) => setCompanyid(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {company.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</MenuItem>
                      ))}
                    </Select>
                    {errors.companyid && <FormHelperText>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={errors.branchid}>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      name="PnBranchid"
                      value={branchid}
                      onChange={(e) => setBranchid(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {branch.map((e) => (
                        <MenuItem key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</MenuItem>
                      ))}
                    </Select>
                    {errors.branchid && <FormHelperText>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="startDate"
                      label="startDate"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="endDate"
                      label="endDate"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="processDate"
                      label="processdate"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setProcessDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                <Button type="submit" variant='contained' color='primary'>SAVE</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sample1;
