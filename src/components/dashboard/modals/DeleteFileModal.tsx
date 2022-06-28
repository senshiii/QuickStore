import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Heading, Text } from '@chakra-ui/react'
import React, { FC, useRef, useState } from 'react'

interface DeleteFileModalProps{
  isOpen: boolean;
  onClose: () => void;
}

const DeleteFileModal:FC<DeleteFileModalProps> = (props) => {
  const [ldref, setLdref] = useState()
  return (
    <AlertDialog leastDestructiveRef={ldref!} isOpen={props.isOpen} onClose={props.onClose} >
      <AlertDialogOverlay backdropFilter={"blur('10px')"} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading as="h2" fontSize="xl">Delete File</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>Are you sure you want to delete the file</Text>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteFileModal