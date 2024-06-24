import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, Typography, FormHelperText, Box, Grid, CardContent, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PAYMBRANCHES, PAYMCOMPANIES, SHIFTPATTERN } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';

const Sample12 = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [patternCode, setPatterncode] = useState("");
  const [shiftCode1, setShiftcode1] = useState("");
  const [days1, setDays1] = useState("");
  const [shiftCode2, setShiftcode2] = useState("");
  const [days2, setDays2] = useState("");
  const [shiftCode3, setShiftcode3] = useState("");
  const [days3, setDays3] = useState("");
  const [shiftCode4, setShiftcode4] = useState("");
  const [days4, setDays4] = useState("");
  const [shiftCode5, setShiftcode5] = useState("");
  const [days5, setDays5] = useState("");
  const [shiftCode6, setShiftcode6] = useState("");
  const [days6, setDays6] = useState("");
  const [shiftCode7, setShiftcode7] = useState("");
  const [days7, setDays7] = useState("");
  const [shiftCode8, setShiftcode8] = useState("");
  const [days8, setDays8] = useState("");

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [patternCodeError, setPatterncodeError] = useState(false);
  const [shiftCode1Error, setShiftcode1Error] = useState(false);
  const [days1Error, setDays1Error] = useState(false);
  const [shiftCode2Error, setShiftcode2Error] = useState(false);
  const [days2Error, setDays2Error] = useState(false);
  const [shiftCode3Error, setShiftcode3Error] = useState(false);
  const [days3Error, setDays3Error] = useState(false);
  const [shiftCode4Error, setShiftcode4Error] = useState(false);
  const [days4Error, setDays4Error] = useState(false);
  const [shiftCode5Error, setShiftcode5Error] = useState(false);
  const [days5Error, setDays5Error] = useState(false);
  const [shiftCode6Error, setShiftcode6Error] = useState(false);
  const [days6Error, setDays6Error] = useState(false);
  const [shiftCode7Error, setShiftcode7Error] = useState(false);
  const [days7Error, setDays7Error] = useState(false);
  const [shiftCode8Error, setShiftcode8Error] = useState(false);
  const [days8Error, setDays8Error] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);

      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setCompanyid(value);
        setCompanyError(false);
        break;
      case 'pnBranchId':
        setBranchid(value);
        setBranchError(false);
        break;
      case 'patternCode':
        setPatterncode(value);
        setPatterncodeError(!/^[A-Za-z0-9\s]{1,5}$/.test(value) || !value);
        break;
      case 'shiftCode1':
        setShiftcode1(value);
        setShiftcode1Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days1':
        setDays1(value);
        setDays1Error(!/^[A-Za-z0-9\s]{1,2}$/.test(value) || !value);
        break;
      case 'shiftCode2':
        setShiftcode2(value);
        setShiftcode2Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days2':
        setDays2(value);
        setDays2Error(!/^[A-Za-z0-9\s]{1,2}$/.test(value) || !value);
        break;
      case 'shiftCode3':
        setShiftcode3(value);
        setShiftcode3Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days3':
        setDays3(value);
        setDays3Error(!/^[A-Za-z0-9\s]{1,2}$/.test(value) || !value);
        break;
      case 'shiftCode4':
        setShiftcode4(value);
        setShiftcode4Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days4':
        setDays4(value);
        setDays4Error(!/^\d+$/.test(value) || !value);
        break;
      case 'shiftCode5':
        setShiftcode5(value);
        setShiftcode5Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days5':
        setDays5(value);
        setDays5Error(!/^\d+$/.test(value) || !value);
        break;
      case 'shiftCode6':
        setShiftcode6(value);
        setShiftcode6Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days6':
        setDays6(value);
        setDays6Error(!/^\d+$/.test(value) || !value);
        break;
      case 'shiftCode7':
        setShiftcode7(value);
        setShiftcode7Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days7':
        setDays7(value);
        setDays7Error(!/^\d+$/.test(value) || !value);
        break;
      case 'shiftCode8':
        setShiftcode8(value);
        setShiftcode8Error(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'days8':
        setDays8(value);
        setDays8Error(!/^\d+$/.test(value) || !value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!companyid);
    setBranchError(!branchid);
    setPatterncodeError(!/^[A-Za-z0-9\s]{1,5}$/.test(patternCode));
    setShiftcode1Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode1));
    setDays1Error(!/^[A-Za-z0-9\s]{1,2}$/.test(days1));
    setShiftcode2Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode2));
    setDays2Error(!/^[A-Za-z0-9\s]{1,2}$/.test(days2));
    setShiftcode3Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode3));
    setDays3Error(!/^[A-Za-z0-9\s]{1,2}$/.test(days3));
    setShiftcode4Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode4));
    setDays4Error(!/^\d+$/.test(days4) || !days4);
    setShiftcode5Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode5));
    setDays5Error(!/^\d+$/.test(days5) || !days5);
    setShiftcode6Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode6));
    setDays6Error(!/^\d+$/.test(days6) || !days6);
    setShiftcode7Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode7));
    setDays7Error(!/^\d+$/.test(days7) || !days7);
    setShiftcode8Error(!/^[A-Za-z0-9\s]{1,10}$/.test(shiftCode8));
    setDays8Error(!/^\d+$/.test(days8) || !days8);

    if (companyid && branchid && patternCode && shiftCode1 && days1 && shiftCode2 && days2 && shiftCode3 && days3 && shiftCode4 && days4 && shiftCode5 && days5 && shiftCode6 && days6 && shiftCode7 && days7 && shiftCode8 && days8) {
      const data = {
        pnCompanyId: companyid,
        pnBranchId: branchid,
        patternCode: patternCode,
        shiftCode1: shiftCode1,
        days1: days1,
        shiftCode2: shiftCode2,
        days2: days2,
        shiftCode3: shiftCode3,
        days3: days3,
        shiftCode4: shiftCode4,
        days4: days4,
        shiftCode5: shiftCode5,
        days5: days5,
        shiftCode6: shiftCode6,
        days6: days6,
        shiftCode7: shiftCode7,
        days7: days7,
        shiftCode8: shiftCode8,
        days8: days8,
      };
      await postRequest(ServerConfig.url, SHIFTPATTERN, data);
    }
  };

  return (
    <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Shift Pattern Creation
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={companyError}>
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                  labelId="company-label"
                  id="pnCompanyId"
                  name="pnCompanyId"
                  value={companyid}
                  onChange={handleChange}
                >
                  {company.map((comp) => (
                    <MenuItem key={comp.pnCompanyId} value={comp.pnCompanyId}>
                      {comp.psCompanyName}
                    </MenuItem>
                  ))}
                </Select>
                {companyError && <FormHelperText>Please select a company</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={branchError}>
                <InputLabel id="branch-label">Branch</InputLabel>
                <Select
                  labelId="branch-label"
                  id="pnBranchId"
                  name="pnBranchId"
                  value={branchid}
                  onChange={handleChange}
                >
                  {branch.map((br) => (
                    <MenuItem key={br.pnBranchId} value={br.pnBranchId}>
                      {br.psBranchName}
                    </MenuItem>
                  ))}
                </Select>
                {branchError && <FormHelperText>Please select a branch</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="patternCode"
                name="patternCode"
                label="Pattern Code"
                value={patternCode}
                onChange={handleChange}
                error={patternCodeError}
                helperText={patternCodeError && "Invalid Pattern Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode1"
                name="shiftCode1"
                label="Shift Code 1"
                value={shiftCode1}
                onChange={handleChange}
                error={shiftCode1Error}
                helperText={shiftCode1Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days1"
                name="days1"
                label="Days 1"
                value={days1}
                onChange={handleChange}
                error={days1Error}
                helperText={days1Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode2"
                name="shiftCode2"
                label="Shift Code 2"
                value={shiftCode2}
                onChange={handleChange}
                error={shiftCode2Error}
                helperText={shiftCode2Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days2"
                name="days2"
                label="Days 2"
                value={days2}
                onChange={handleChange}
                error={days2Error}
                helperText={days2Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode3"
                name="shiftCode3"
                label="Shift Code 3"
                value={shiftCode3}
                onChange={handleChange}
                error={shiftCode3Error}
                helperText={shiftCode3Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days3"
                name="days3"
                label="Days 3"
                value={days3}
                onChange={handleChange}
                error={days3Error}
                helperText={days3Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode4"
                name="shiftCode4"
                label="Shift Code 4"
                value={shiftCode4}
                onChange={handleChange}
                error={shiftCode4Error}
                helperText={shiftCode4Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days4"
                name="days4"
                label="Days 4"
                value={days4}
                onChange={handleChange}
                error={days4Error}
                helperText={days4Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode5"
                name="shiftCode5"
                label="Shift Code 5"
                value={shiftCode5}
                onChange={handleChange}
                error={shiftCode5Error}
                helperText={shiftCode5Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days5"
                name="days5"
                label="Days 5"
                value={days5}
                onChange={handleChange}
                error={days5Error}
                helperText={days5Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode6"
                name="shiftCode6"
                label="Shift Code 6"
                value={shiftCode6}
                onChange={handleChange}
                error={shiftCode6Error}
                helperText={shiftCode6Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days6"
                name="days6"
                label="Days 6"
                value={days6}
                onChange={handleChange}
                error={days6Error}
                helperText={days6Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode7"
                name="shiftCode7"
                label="Shift Code 7"
                value={shiftCode7}
                onChange={handleChange}
                error={shiftCode7Error}
                helperText={shiftCode7Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days7"
                name="days7"
                label="Days 7"
                value={days7}
                onChange={handleChange}
                error={days7Error}
                helperText={days7Error && "Invalid Days"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="shiftCode8"
                name="shiftCode8"
                label="Shift Code 8"
                value={shiftCode8}
                onChange={handleChange}
                error={shiftCode8Error}
                helperText={shiftCode8Error && "Invalid Shift Code"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days8"
                name="days8"
                label="Days 8"
                value={days8}
                onChange={handleChange}
                error={days8Error}
                helperText={days8Error && "Invalid Days"}
              />
            </Grid>
          </Grid>
          <Box  textAlign={'right'}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Sample12;

// **Explanation:**
// 1. **React State:** State hooks are used for each form field and for error states.
// 2. **Validation:** Regular expressions ensure pattern codes and shift codes are alphanumeric and 1-10 characters long, and day values are numeric.
// 3. **Form Submission:** If all fields are valid, the data is sent via a POST request to a server.
// 4. **Form Components:** `TextField`, `Select`, and `FormControl` components from Material-UI are used to build the form.
// 5. **Error Handling:** Error messages display if validation fails, guiding users to correct inputs.
