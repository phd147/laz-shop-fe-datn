import { Container, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'

import { instance } from '../../api/blockchain_api'
import { useEffect, useState } from 'react'

import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Blockchain() {

  const [blockchain, setBlockchain] = useState({})


  const getBlockchain = async () => {
    // call api get blockchain
    try {
      const res = await instance.get('/blockchain')
      setBlockchain(res.data)
      console.log({ res })
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    getBlockchain()
  }, [])


  return (
    <>
      {/*// Blockchain info*/}
      <Container>
        <h2>Blockchain Info</h2>
      </Container>

      {/*// Chain info*/}
      <Container>
        <h2>Blockchain</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Block index</TableCell>
                <TableCell align="right">BlockHash</TableCell>
                <TableCell align="right">Transactions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockchain?.chain?.map((block) => (
                <TableRow
                  key={block.hash}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {block.index}
                  </TableCell>
                  <TableCell align="right">{block.hash}</TableCell>
                  <TableCell align="right">{block.transactions.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
