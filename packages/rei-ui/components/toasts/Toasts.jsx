import React from 'react'
import {  useToast} from '@chakra-ui/react'


const Toasts = (props) => {
    const toast = useToast()
    const {message, variant, status, position} = props
    toast({
        title: message,
        variant: (variant ?? 'left-accent'),
        status: status ,
        position: (position ?? 'bottom-right'),
        isClosable: true,
    })

  return (
    <> 
    </>
  )
}

export default Toasts