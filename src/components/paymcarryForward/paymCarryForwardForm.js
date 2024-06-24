import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMLEAVE, PAYMCARRYFORWARD } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';

export default function PaymCarrForwardForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [pnLeaveId, setLeaveId] = useState("");
  const [allowDays, setAllowDays] = useState("");
  const [takenDays, setTakenDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [balDays, setBalDays] = useState("");
  const [date, setDate] = useState("");
  const [yearEnd, setYearEnd] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const paymLeave = await getRequest(ServerConfig.url, PAYMLEAVE);
      setPaymLeave(paymLeave.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));

    switch (name) {
      case 'pnCompanyId':
        setCompany(value);
        break;
      case 'pnBranchId':
        setBranch(value);
        break;
      case 'pnEmployeeId':
        setEmployeeId(value);
        break;
      case 'pnLeaveId':
        setLeaveId(value);
        break;
      case 'allowDays':
        setAllowDays(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          allowDays: !/^\d+(\.\d+)?$/.test(value) || !value
        }));
        break;
      case 'takenDays':
        setTakenDays(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          takenDays: !/^\d+(\.\d+)?$/.test(value) || !value
        }));
        break;
      case 'maxDays':
        setMaxDays(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          maxDays: !/^\d+(\.\d+)?$/.test(value) || !value
        }));
        break;
      case 'balDays':
        setBalDays(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          balDays: !/^\d+(\.\d+)?$/.test(value) || !value
        }));
        break;
      case 'date':
        setDate(value);
        break;
      case 'yearEnd':
        setYearEnd(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          yearEnd: !/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      pnCompanyId: company,
      pnBranchId: branch,
      pnEmployeeId: pnEmployeeId,
      pnLeaveId: pnLeaveId,
      allowDays: allowDays,
      takenDays: takenDays,
      maxDays: maxDays,
      balDays: balDays,
      date: date,
      yearEnd: yearEnd
    };

    const validationErrors = {
      company: !company,
      branch: !branch,
      pnEmployeeId: !pnEmployeeId,
      pnLeaveId: !pnLeaveId,
      allowDays: !/^\d+(\.\d+)?$/.test(allowDays) || !allowDays,
      takenDays: !/^\d+(\.\d+)?$/.test(takenDays) || !takenDays,
      maxDays: !/^\d+(\.\d+)?$/.test(maxDays) || !maxDays,
      balDays: !/^\d+(\.\d+)?$/.test(balDays) || !balDays,
      yearEnd: !/^[A-Za-z0-9\s]{1,50}$/.test(yearEnd) || !yearEnd
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      console.error('Form contains errors');
      return;
    }

    try {
      await postRequest(ServerConfig.url, PAYMCARRYFORWARD, formData);
      navigate('/PaymcarryForwardTable');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='textSecondary' align='center'>Paym Carry Forward</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      value={company}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {employee.map((e, index) => <option key={index}>{e.pnCompanyId}</option>)}
                    </select>
                    {errors.company && <FormHelperText style={{ color: "red" }}>Please select a company</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Branch</InputLabel>
                    <select
                      name="pnBranchId"
                      value={branch}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === company).map((e, index) => <option key={index}>{e.pnBranchId}</option>)}
                    </select>
                    {errors.branch && <FormHelperText style={{ color: "red" }}>Please select a branch</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Employee</InputLabel>
                    <select
                      name="pnEmployeeId"
                      value={pnEmployeeId}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {employee.filter((e) => e.pnCompanyId === company && e.pnBranchId === branch).map((e, index) => <option key={index}>{e.pnEmployeeId}</option>)}
                    </select>
                    {errors.pnEmployeeId && <FormHelperText style={{ color: "red" }}>Please select an employee</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Leave</InputLabel>
                    <select
                      name="pnLeaveId"
                      value={pnLeaveId}
                      onChange={handleChange}
                      style={{ height: '50px' }}
                    >
                      <option value="">Select</option>
                      {paymLeave.map((e, index) => <option key={index}>{e.pnLeaveId}</option>)}
                    </select>
                    {errors.pnLeaveId && <FormHelperText style={{ color: "red" }}>Please select a leave</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="allowDays"
                      label="Allow Days"
                      variant="outlined"
                      fullWidth
                      value={allowDays}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.allowDays && <FormHelperText style={{ color: "red" }}>Please enter valid allow days</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="takenDays"
                      label="Taken Days"
                      variant="outlined"
                      fullWidth
                      value={takenDays}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.takenDays && <FormHelperText style={{ color: "red" }}>Please enter valid taken days</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="maxDays"
                      label="Max Days"
                      variant="outlined"
                      fullWidth
                      value={maxDays}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.maxDays && <FormHelperText style={{ color: "red" }}>Please enter valid max days</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="balDays"
                      label="Balance Days"
                      variant="outlined"
                      fullWidth
                      value={balDays}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.balDays && <FormHelperText style={{ color: "red" }}>Please enter valid balance days</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="date"
                      label="Date"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      value={date}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.date && <FormHelperText style={{ color: "red" }}>Please select a date</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="yearEnd"
                      label="Year End"
                      variant="outlined"
                      fullWidth
                      value={yearEnd}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.yearEnd && <FormHelperText style={{ color: "red" }}>Please enter a valid year end</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button style={margin} type="reset" variant="outlined" color="primary">RESET</Button>
                  <Button type="submit" variant="contained" color="primary">SAVE</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
