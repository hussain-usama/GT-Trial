import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { fetchUsers } from '../../../redux/Reducers/DashboardReducer';

function ErrorResponse(){

    const [modal, setModal] = useState(true);
    const dispatch=useDispatch()
    const toggle = () => setModal(!modal);
    const refetchUserApi=()=>{
        dispatch(fetchUsers())
        toggle()

    }
    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            Something went wrong with Api response ...
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" 
          onClick={refetchUserApi}
          >
            Refetch Api
          </Button>
        </ModalFooter>
      </Modal>
        </>
    )
}
export default ErrorResponse