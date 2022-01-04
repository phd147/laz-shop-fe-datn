import { Grid, Container } from '@material-ui/core'
import Block from '@component/blockchain'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}


export default function Blockchain() {

  return (
    <>
      <Container>
        <Grid container className={'justify-content-center'}>
          <Grid item xs={12} md={6}>
            latest blocks

          </Grid>
          <Grid item xs={12} md={6}>
            latest transactions

          </Grid>
        </Grid>
      </Container>
    </>
  )
}
