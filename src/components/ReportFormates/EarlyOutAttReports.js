import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid } from '@mui/material';

function EarlyoutAtt() {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Grid>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        AV THOMAS LEATHER AND ALLIED PRODUCTS
        </Typography>
      </Grid>

      <Grid>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Early Out Details For the Period of 01/10/2010 to 30/10/2010        </Typography>
      </Grid>
      <Grid>
        <Typography variant="h6" style={{textAlign:'left',paddingLeft:'800px'}}>
        Print Date  :  28/06/20       
         </Typography>
      </Grid>
      

      <Grid item xs={12}>
        <TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px' }}>
          <Table>
            <TableBody>
              <TableRow sx={{ borderBottom: '3px solid black',borderTop:'3px solid black', fontWeight: 'bold' }}>
                <TableCell style={{ borderBottom:'3px solid black',borderLeft:'3px solid black',fontWeight: 'bold',fontSize:20}}>S.No</TableCell>
                <TableCell style={{borderBottom:'3px solid black',fontWeight: 'bold' ,fontSize:20}}>Date</TableCell>
                <TableCell style={{ borderBottom:'3px solid black',fontWeight: 'bold',fontSize:20 }}>Shift</TableCell>
                <TableCell style={{borderRight:'3px solid black', borderBottom:'3px solid black',fontWeight: 'bold' ,fontSize:20}}>Early Out</TableCell>
               
              </TableRow>
           
              <TableRow sx={{ borderBottom: '3px solid black', fontWeight: 'bold',bottomLeft:'3px solid black' }}>
                <TableCell style={{borderLeft:'3px solid black',borderBottom: '3px solid black',fontWeight: 'bold',fontSize:18}}>Emp.Code:   0014</TableCell>
                <TableCell style={{ borderBottom: '3px solid black',fontWeight: 'bold',fontSize:18 }}>Emp.Name :   J. Gaja Valli</TableCell>
                <TableCell style={{ borderBottom: '3px solid black',fontWeight: 'bold',fontSize:17 }}></TableCell>
                <TableCell style={{ borderRight:'3px solid black',borderBottom: '3px solid black',fontWeight: 'bold',fontSize:17 }}></TableCell>

               
              </TableRow>


             
                <TableRow >
                  <TableCell sx={{borderLeft:'2px solid black', borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16}}>1</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16}}>04/10/2010</TableCell>
                  <TableCell  sx={{ borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16 }}>G</TableCell>
                  <TableCell  sx={{borderRight:'2px solid black', borderBottom: '2px solid black',fontWeight: 'bold' ,fontSize:16}}>01:04</TableCell>
                </TableRow>
                <TableRow sx={{ borderBottom: '3px solid black', fontWeight: 'bold',bottomLeft:'3px solid black' }}>
                <TableCell style={{borderLeft:'3px solid black',borderBottom: '3px solid black',fontWeight: 'bold',fontSize:18}}>Emp.Code:   0022</TableCell>
                <TableCell style={{ borderBottom: '3px solid black',fontWeight: 'bold',fontSize:18 }}>Emp.Name :   R. Selvi</TableCell>
                <TableCell style={{ borderBottom: '3px solid black',fontWeight: 'bold',fontSize:17 }}></TableCell>
                <TableCell style={{ borderRight:'3px solid black',borderBottom: '3px solid black',fontWeight: 'bold',fontSize:17 }}></TableCell>

               
              </TableRow>


              {[...Array(2).keys()].map((row, index) => (
                <TableRow key={row + 1}>
                  <TableCell sx={{borderLeft:'2px solid black', borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16}}>{row + 1}</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16}}>04/10/2010</TableCell>
                  <TableCell  sx={{ borderBottom: '2px solid black',fontWeight: 'bold',fontSize:16 }}>G</TableCell>
                  <TableCell  sx={{borderRight:'2px solid black', borderBottom: '2px solid black',fontWeight: 'bold' ,fontSize:16}}>01:04</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
      </Grid>
    
    </div>
  );
}

export default EarlyoutAtt;
