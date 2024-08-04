import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import { trackPromise } from "react-promise-tracker";
import { useMaterialReactTable } from "material-react-table";
import { MaterialTable } from "../Table/MaterialTable";
import { Box, Tooltip } from "@mui/material";

const classes = {
    root: {
        margin: "30px",
    },
};

export default function ApplyPlacement() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        trackPromise(
            axios
                .get("/placement/individual", {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
                    console.log(results);
                    axios
                        .get("/placement", {
                            headers: { "x-auth-token": localStorage["x-auth-token"] },
                        })
                        .then((secondResult) => {
                            let data = secondResult.data;
                            for (let x in data) {
                                data[x].registered = false;
                                console.log(x, data[x]);
                                for (let e of results.data) {
                                    if (data[x].placement_id === e.placement_id) {
                                        data[x].registered = true;
                                        break;
                                    }
                                }
                            }
                            setRecords(data);
                        })
                        .catch((err) => {
                            console.log(err);
                            if (err.response && err.response.status === 400)
                                history.push("/");
                            else alert("There is something wrong with the server1");
                        });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) history.push("/");
                    else alert("There is something wrong with the server");
                })
        );
    }, []);

    const columns = useMemo(() => [
        { header: "Company", accessorKey: "company" },
        { header: "Role", accessorKey: "role" },
        { header: "Job Profile", accessorKey: "job_profile" },
        { header: "Stipend/CTC", accessorKey: "stipend" },
        { header: "Category", accessorKey: "category" },
        { header: "registered", accessorKey: "registered", Cell: ({ cell }) => cell.getValue().toLocaleString() },
    ], []);

    const onClickHandler = (event, rowData) => {
        trackPromise(
            axios
                .post(
                    "/placement/register",
                    { placement_id: rowData.placement_id },
                    {
                        headers: { "x-auth-token": localStorage["x-auth-token"] },
                    }
                )
                .then((results) => {
                    window.location.reload();
                })
                .catch((err) => {
                    alert("There is something wrong with the server" + err.message);
                })
        );
    };
    const table = useMaterialReactTable({
        columns,
        data: records,
        enableEditing: true,
        getRowId: (originalRow) => originalRow.s_id,
        renderRowActions: ({ row }) => {
            console.log(row.original.registered);
            return (Boolean(row.original.registered) ? (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="registered">
                        <CheckCircleSharpIcon style={{ color: "green" }} />
                    </Tooltip>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="apply">
                        < SaveSharpIcon style={{ color: "blue" }} onClick={(e) => onClickHandler(e, row.original)} />
                    </Tooltip>
                </Box>));

        },
        initialState: { columnVisibility: { registered: false } },
        //optionally customize modal content
        //table options as options to this hook
    });
    return (
        <MaterialTable
            table={table}
        />
    );
}
