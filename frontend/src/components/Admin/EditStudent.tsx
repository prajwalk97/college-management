import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { MaterialTable } from "../Table/MaterialTable";
import {
    MRT_EditActionButtons,
    useMaterialReactTable,
} from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { Box, Tooltip, IconButton, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function EditStudent() {
    const [data, setData] = useState([]);
    const columns = useMemo(() => [
        {
            header: 'id',
            accessorKey: 's_id',
            enableEditing: false,
            size: 80,
        },
        {
            header: "Name",
            accessorKey: "name",
            size: 150,
            muiEditTextFieldProps: {
                required: true,
                //remove any previous validation errors when user focuses on the input
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.name),
        },
        {
            header: "Email Id",
            accessorKey: "email",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.email),
        },
        { header: "Department", accessorKey: "d_name", enableEditing: false },
        {
            header: "Dept Id",
            accessorKey: "d_id",
            type: "numeric",
            align: "left",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.d_id),
        },
        {
            header: "USN",
            accessorKey: "usn",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            //   validate: (rowData) => Boolean(rowData.usn)
        },
        {
            header: "Year",
            accessorKey: "year",
            type: "numeric",
            align: "left",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.year),
        },
        {
            header: "Backlogs",
            accessorKey: "current_backlogs",
            type: "numeric",
            align: "left",
            min: 0,
            initialEditValue: 0,
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
        },
        {
            header: "SPC",
            accessorKey: "is_spc",
            type: "boolean",
            initialEditValue: 0,
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
        },
        {
            header: "CGPA",
            accessorKey: "cgpa",
            align: "left",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.cgpa),
        },
        {
            header: "Counsellor Id",
            accessorKey: "counsellor_id",
            type: "numeric",
            align: "left",
            muiEditTextFieldProps: {
                required: true
                //optionally add validation checking for onBlur or onChange
            },
            // validate: (rowData) => Boolean(rowData.counsellor_id),
        },
        {
            header: "password",
            accessorKey: "password",
        }
    ], []);;
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            // deleteUser(row.original.id);
            console.log("hiii from editStudent", row);
            trackPromise(
                axios
                    .delete("/student/" + row.original.s_id, {
                        headers: { "x-auth-token": localStorage["x-auth-token"] },
                    })
                    .then((results) => {
                        window.location.reload();
                    })
                    .catch((err) => {
                        if (err.response && err.response.status == 400) {
                            alert(err.response.data);
                        } else {
                            alert("There is something wrong with the server");
                        }
                    })
            );
        }
    };
    const handleSaveUser = (props) => {
        console.log(props.values)
        trackPromise(
            axios
                .put("/student", props.values, {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
                    window.location.reload();
                })
                .catch((err) => {
                    if (err.response && err.response.status == 400) {
                        alert(err.response.data);
                    } else {
                        alert("There is something wrong with the server");
                    }
                })
        );
    }

    const handleCreateUser = (props) => {
        trackPromise(
            axios
                .post("/student", props.values, {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
                    window.location.reload();
                })
                .catch((err) => {
                    if (err.response && err.response.status == 400) {
                        alert(err.response.data);
                    } else {
                        alert("There is something wrong with the server");
                    }
                })
        );
    }
    const table = useMaterialReactTable({
        columns,
        data,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        onCreatingRowSave: handleCreateUser,
        onEditingRowSave: handleSaveUser,
        getRowId: (originalRow) => originalRow.s_id,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Create New User
            </Button>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
            console.log(internalEditComponents, "interna");
            return (
                <>
                    <DialogTitle variant="h3">Create New User</DialogTitle>
                    <DialogContent
                        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        {internalEditComponents} {/* or render custom edit components here */}
                    </DialogContent>
                    <DialogActions>
                        <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
                </>
            )
        },
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents?.filter(component => component?.key != "mrt-row-create_password")} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //table options as options to this hook
    });
    useEffect(() => {
        trackPromise(
            axios
                .get("/student", {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
                    console.log("results", results.data);
                    setData(results.data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        alert(err.response.data);
                    } else {
                        alert("Sorry There is something wrong with the server");
                    }
                })
        );
    }, []);

    return (
        <MaterialTable
            table={table}
        />
    );
}
