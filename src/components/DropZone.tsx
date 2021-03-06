import { Button, Divider, Typography } from '@material-ui/core'
import { Box } from '@material-ui/system'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { H5, Small } from './Typography'

export interface DropZoneProps {
  onChange?: (files: []) => void,
  imageUrl: any
}

const DropZone: React.FC<DropZoneProps> = ({ onChange, imageUrl }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (onChange) onChange(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: '.jpeg,.jpg,.png,.gif',
    maxFiles: 10,
  })

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='200px'
      border='1px dashed'
      borderColor='grey.400'
      borderRadius='10px'
      bgcolor={isDragActive ? 'grey.200' : 'none'}
      sx={{
        transition: 'all 250ms ease-in-out',
        outline: 'none',
      }}
      {...getRootProps()}
    >

      {imageUrl ? <img alt={'item image'} src={imageUrl} /> : <div>
        <input {...getInputProps()} />
        <H5 mb={2} color='grey.600'>
          Pon tu imagen aqui
        </H5>

        <Divider sx={{ width: '200px', mx: 'auto' }} />

        <Typography
          color='grey.600'
          bgcolor={isDragActive ? 'grey.200' : 'background.paper'}
          lineHeight='1'
          px={2}
          mt={-1.25}
          mb={2}
        >
          o
        </Typography>

        <Button
          color='inherit'
          type='button'
          sx={{
            bgcolor: 'primary.light',
            px: '2rem',
            mb: '22px',
          }}
        >
          Select image
        </Button>

        <Small color='grey.600'>Subir imagenes de 280*280 </Small>
      </div>}
    </Box>
  )
}

export default DropZone
