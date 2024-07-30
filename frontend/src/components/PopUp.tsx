import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function PopUp(props) {
    const navigateTo = useNavigate();

    const handleClose1 = () => {
        props.setOpen(false)
    }

    const handleClose2 = () => {
        localStorage.clear()
        props.setOpen(false)
        navigateTo('/', { replace: true })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose1}>
            <DialogTitle>
                {props.dialog}
            </DialogTitle>
            <DialogActions>
                <Button
                    onClick={handleClose1}
                    color="primary">
                    {props.action1}
                </Button>
                <Button
                    onClick={handleClose2}
                    color="primary">
                    {props.action2}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
