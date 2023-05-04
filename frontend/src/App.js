import * as React from 'react';
import axios from "axios";
import { Paper, Typography, Button, CircularProgress, TextField, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function App() {
  const BASE_URL = 'http://localhost:8000/'
  const [pageNo, setPageNo] = React.useState(1)
  const [sessionId, setSessionId] = React.useState(null)
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false)
  const [loanAmount, setLoanAmount] = React.useState(null)
  const [accountingProvider, setAccountingProvider] = React.useState('Xero')
  const [name, setName] = React.useState('')
  const [yearEstablished, setYearEstablished] = React.useState(null)
  const [balanceSheet, setBalanceSheet] = React.useState([])
  const [loanApproved, setLoanApproved] = React.useState({})




  const startApplication = () => {
    setLoading(true)
    axios.get(BASE_URL + 'v1/application/initiate-application').then((response) => {
      setSessionId(response.data.session_id);
      setPageNo(2)
      setLoading(false)
    }).catch(error => {
      setError(error);
      setLoading(false)
    });
  }

  const fetchBalanceSheet = () => {
    setLoading(true)
    axios.get(BASE_URL + `v1/application/fetch-balance-sheet?session_id=${sessionId}&name=${name}&accounting_provider=${accountingProvider}`).then((response) => {
      setBalanceSheet(response.data);
      setPageNo(3)
      setLoading(false)
    }).catch(error => {
      setError(error);
      setLoading(false)
    });
  }

  const submitApplication = () => {
    setLoading(true)
    axios.post(BASE_URL + `v1/application/submit-application`,
      {
        "session_id": sessionId,
        "name": name,
        "accounting_provider": accountingProvider,
        "loan_amount": loanAmount,
        "year_established": yearEstablished
      }
    ).then((response) => {
      setLoanApproved(response.data);
      setPageNo(4)
      setLoading(false)
    }).catch(error => {
      setError(error);
      setLoading(false)
    });
  }


  const firstPage = () => {
    return (
      <Paper style={{
        height: 400,
        width: 800,

      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}>
          <Typography variant="h3" component="h3">
            Welcome to Loan App
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="p" component="p">
            Press Continue to Start the Process
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px'
        }}>
          <Button variant="contained" onClick={startApplication}>Continue</Button>
        </div>
      </Paper>
    )
  }

  const secondPage = () => {
    return (
      <Paper style={{
        width: 800,

      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}>
          <Typography variant="h3" component="h3">
            Welcome to Loan App
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="p" component="p">
            Fill Out this form to continue
          </Typography>
        </div>
        <div style={{ margin: '5%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="outlined-basic" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                <DatePicker label={'Year Established'} views={['year']} style={{ width: '100%' }} onChange={(e) => setYearEstablished(new Date(e).getFullYear())} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField id="outlined-basic" label="Loan Amount" type="number" variant="outlined" onChange={(e) => setLoanAmount(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Accounting Provider</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={accountingProvider}
                  label="Accounting Provider"
                  onChange={(e) => {
                    setAccountingProvider(e.target.value)
                  }}
                >
                  <MenuItem value={'Xero'}>Xero</MenuItem>
                  <MenuItem value={'MYOB'}>MYOB</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px',
          marginBottom: '100px'
        }}>
          <Button variant="contained" onClick={fetchBalanceSheet} disabled={!name || !loanAmount || !yearEstablished}>Continue</Button>
        </div>
      </Paper>
    )
  }

  const thirdPage = () => {
    return (
      <Paper style={{
        width: 800,

      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}>
          <Typography variant="h3" component="h3">
            Please Review the Balance Sheet
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="p" component="p">
            Press Submit to Continue
          </Typography>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">Profit/Loss</TableCell>
              <TableCell align="right">Asset Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceSheet.map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell align="right">{row.month}</TableCell>
                <TableCell align="right">{row.profitOrLoss}</TableCell>
                <TableCell align="right">{row.assetsValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <Button variant="contained" onClick={submitApplication}>Submit</Button>
        </div>
      </Paper>
    )
  }

  const fourthPage = () => {
    return (
      <Paper style={{
        width: 800,

      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}>
          <Typography variant="h3" component="h3">
            Congratulations
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px',
          marginBottom:'40px'
        }}>
          <Typography variant="p" component="p">
            Your Loan Amount Approved is <b>{loanApproved.approved_amount}</b>
          </Typography>
        </div>
        
      </Paper>
    )
  }

  const showLoader = () => {
    return (<CircularProgress />)
  }


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      {loading && showLoader()}
      {!loading && pageNo === 1 && firstPage()}
      {!loading && pageNo === 2 && secondPage()}
      {!loading && pageNo === 3 && thirdPage()}
      {!loading && pageNo === 4 && fourthPage()}

    </div>
  );


}