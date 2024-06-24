import { TextField, Button, Card, Typography, Grid, CardContent, FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { PAYMEMPLOYEE, SHIFTDETAILS, SHIFTMONTH } from '../../serverconfiguration/controllers';

export default function Sample13() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [shiftdetails, setShiftDetails] = useState([]);
  const [employeeCode, setPnEmployeeCode] = useState("");
  const [employeeName, setPnEmployeeName] = useState("");
  const [shiftCode, setShiftCode] = useState("");
  const [monthyear, setMonthyear] = useState("");
  const [date, setDate] = useState("");

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [employeeCodeError, setPnEmployeeCodeError] = useState(false);
  const [employeeNameError, setPnEmployeeNameError] = useState(false);
  const [shiftCodeError, setShiftCodeError] = useState(false);
  const [monthyearError, setMonthyearError] = useState(false);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const shiftdata = await getRequest(ServerConfig.url, SHIFTDETAILS);
      setShiftDetails(shiftdata.data);
    }
    getData();
    const branch = sessionStorage.getItem("branch");
    const company = sessionStorage.getItem("company");
    setBranch(branch);
    setCompany(company);
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
      case 'pnEmployeeCode':
        setPnEmployeeCode(value);
        setPnEmployeeCodeError(!/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value);
        break;
      case 'pnEmployeeName':
        setPnEmployeeName(value);
        setPnEmployeeNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value);
        break;
      case 'shiftCode':
        setShiftCode(value);
        setShiftCodeError(!/^[A-Za-z0-9\s]{1,5}$/.test(value) || !value);
        break;
      case 'monthyear':
        setMonthyear(value);
        setMonthyearError(!/^[A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'date':
        setDate(value);
        setDateError(!value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCompanyValid = !!company;
    const isBranchValid = !!branch;
    const isEmployeeCodeValid = /^[A-Za-z0-9\s]{1,50}$/.test(employeeCode);
    const isEmployeeNameValid = /^[A-Za-z0-9\s]{1,50}$/.test(employeeName);
    const isShiftCodeValid = /^[A-Za-z0-9\s]{1,5}$/.test(shiftCode);
    const isMonthyearValid = /^[A-Za-z0-9\s]{1,10}$/.test(monthyear);
    const isDateValid = !!date;

    setCompanyError(!isCompanyValid);
    setBranchError(!isBranchValid);
    setPnEmployeeCodeError(!isEmployeeCodeValid);
    setPnEmployeeNameError(!isEmployeeNameValid);
    setShiftCodeError(!isShiftCodeValid);
    setMonthyearError(!isMonthyearValid);
    setDateError(!isDateValid);

    if (isCompanyValid && isBranchValid && isEmployeeCodeValid && isEmployeeNameValid && isShiftCodeValid && isMonthyearValid && isDateValid) {
      const formData = {
        pnCompanyid: company,
        pnBranchid: branch,
        pnEmployeeCode: employeeCode,
        pnEmployeeName: employeeName,
        monthyear: monthyear,
        date: date,
        shiftCode: shiftCode,
      };
      console.log(formData);

      try {
        await postRequest(ServerConfig.url, SHIFTMONTH, formData);
        navigate('/ShiftMonthTable');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center'>
              Shift Month
            </Typography>
            <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
              Fill all the Mandatory fields
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={companyError}>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      name="pnCompanyId"
                      value={company}
                      onChange={handleChange}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {employee.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</MenuItem>
                      ))}
                    </Select>
                    {companyError && <FormHelperText style={{ color: 'red' }}>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={branchError}>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      name="pnBranchId"
                      value={branch}
                      onChange={handleChange}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {employee.filter((e) => e.pnCompanyId === company).map((e) => (
                        <MenuItem key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</MenuItem>
                      ))}
                    </Select>
                    {branchError && <FormHelperText style={{ color: 'red' }}>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeCodeError}>
                    <InputLabel shrink>pnEmployeeCode</InputLabel>
                    <Select
                      name="pnEmployeeCode"
                      value={employeeCode}
                      onChange={(e) => {
                        handleChange(e);
                        const empname = employee.find(emp => emp.employeeCode === e.target.value);
                        setPnEmployeeCode(e.target.value);
                        setPnEmployeeName(empname ? empname.employeeFullName : "");
                      }}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {employee.filter((e) => e.pnCompanyId === company && e.pnBranchId === branch).map((e) => (
                        <MenuItem key={e.employeeCode} value={e.employeeCode}>{e.employeeCode}</MenuItem>
                      ))}
                    </Select>
                    {employeeCodeError && <FormHelperText style={{ color: 'red' }}>Invalid employee code</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={employeeNameError}>
                    <TextField
                      name="pnEmployeeName"
                      value={employeeName}
                      label="pnEmployeeName"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                    {employeeNameError && <FormHelperText style={{ color: 'red' }}>Invalid employee name</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftCodeError}>
                    <InputLabel shrink>shiftCode</InputLabel>
                    <Select
                      name="shiftCode"
                      value={shiftCode}
                      onChange={(e) => {
                        handleChange(e);
                        const shift = shiftdetails.find(shift => shift.shiftCode === e.target.value);
                        setShiftCode(shift ? shift.shiftCode : "");
                      }}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {shiftdetails.map((e) => (
                        <MenuItem key={e.shiftCode} value={e.shiftCode}>{e.shiftCode}</MenuItem>
                      ))}
                    </Select>
                    {shiftCodeError && <FormHelperText style={{ color: 'red' }}>Invalid shift code</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={shiftCodeError}>
                    <TextField
                      name="shiftCode"
                      value={shiftCode}
                      label="shiftcode"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={monthyearError}>
                    <TextField
                      name="monthyear"
                      value={monthyear}
                      label="monthyear"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {monthyearError && <FormHelperText style={{ color: 'red' }}>Invalid month/year</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={dateError}>
                    <TextField
                      name="date"
                      value={date}
                      label="date"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                    {dateError && <FormHelperText style={{ color: 'red' }}>Invalid date</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'20px'}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                    <Button type="submit" variant='contained' color='primary'>SAVE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
