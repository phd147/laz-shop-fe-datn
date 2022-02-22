import BazarMenu from '@component/BazarMenu'
import FlexBox from '@component/FlexBox'
import { Box, Card, MenuItem, TextField } from '@material-ui/core'
import TouchRipple from '@material-ui/core/ButtonBase'
import { styled } from '@material-ui/core/styles'
import { debounce } from '@material-ui/core/utils'
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import {useRouter} from 'next/router'

const StyledBox = styled(Box)(({ theme }) => ({
  '.searchIcon': {
    color: theme.palette.grey[600],
    marginRight: 6,
  },
  '.dropdownHandler': {
    borderTopRightRadius: 300,
    borderBottomRightRadius: 300,
    whiteSpace: 'pre',
    borderLeft: `1px solid ${theme.palette.text.disabled}`,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  '.searchResultCard': {
    position: 'absolute',
    top: '100%',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    width: '100%',
    zIndex: 99,
  },
}))

// const useStyles = makeStyles(({ palette, ...theme }: MuiThemeProps) => ({
//   searchIcon: {
//     color: palette.grey[600],
//     marginRight: 6,
//   },
//   dropdownHandler: {
//     borderTopRightRadius: 300,
//     borderBottomRightRadius: 300,
//     whiteSpace: 'pre',
//     borderLeft: `1px solid ${palette.text.disabled}`,
//     [theme.breakpoints.down('xs')]: {
//       display: 'none',
//     },
//   },
//   searchResultCard: {
//     position: 'absolute',
//     top: '100%',
//     paddingTop: '0.5rem',
//     paddingBottom: '0.5rem',
//     width: '100%',
//     zIndex: 99,
//   },
// }))

const SearchBox = () => {
  const [category, setCategory] = useState('Search in shop')
  const [resultList, setResultList] = useState<string[]>([])
  const parentRef = useRef()

  const router = useRouter();

  const handleCategoryChange = (cat: any) => () => {
    setCategory(cat)
  }

  // const search = debounce((e) => {
  //   const value = e.target?.value
  //
  //   if (!value) setResultList([])
  //   else setResultList(dummySearchResult)
  // }, 200)

  // const hanldeSearch = useCallback((event) => {
  //   event.persist()
  //   search(event)
  // }, [])

  const handleDocumentClick = () => {
    setResultList([])
  }

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const categoryDropdown = (
    <></>
  )

  const searchHandler = (e) => {
    console.log('search handler')
    location.replace(`/product/search/${e.target.value}?type=search`)
  }

  return (
    <StyledBox
      position='relative'
      flex='1 1 0'
      maxWidth='670px'
      mx='auto'
      {...{ ref: parentRef }}
    >
      <TextField
        variant='outlined'
        placeholder='Search in shop'
        fullWidth
        onChange={() => {}}
        InputProps={{
          sx: {
            height: 44,
            borderRadius: 300,
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlined className='searchIcon' fontSize='small' />,
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault()
            searchHandler(e);
          }
        }}
      />

      {/*{!!resultList.length && (*/}
      {/*  <Card className='searchResultCard' elevation={2}>*/}
      {/*    {resultList.map((item) => (*/}
      {/*      <Link href={`/product/search/${item}`} key={item}>*/}
      {/*        <MenuItem key={item}>{item}</MenuItem>*/}
      {/*      </Link>*/}
      {/*    ))}*/}
      {/*  </Card>*/}
    </StyledBox>
  )
}

const categories = [
  'Todas las categorias',
  'Cárnicos',
  'Lácteos y huevo',
  'Frutas',
  'Verduras',
  'Semillas, especias y chiles secos',
  'Abarrotes',
  'Snacks',
  'Recetas',
]

const dummySearchResult = [
  'Macbook Air 13',
  'Asus K555LA',
  'Acer Aspire X453',
  'iPad Mini 3',
]

export default SearchBox
