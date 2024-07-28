import React, { useEffect, useState } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { MaterialTable } from "../Table/MaterialTable";


export default function EditStudent() {
    const [data, setData] = useState([]);
    const columns = [
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
            // validate: (rowData) => Boolean(rowData.name),
        },
        {
            header: "Email Id",
            accessorKey: "email",
            // validate: (rowData) => Boolean(rowData.email),
        },
        { header: "Department", accessorKey: "d_name" },
        {
            header: "Dept Id",
            accessorKey: "d_id",
            type: "numeric",
            align: "left",
            // validate: (rowData) => Boolean(rowData.d_id),
        },
        {
            header: "USN",
            accessorKey: "usn",
            //   validate: (rowData) => Boolean(rowData.usn)
        },
        {
            header: "Year",
            accessorKey: "year",
            type: "numeric",
            align: "left",
            // validate: (rowData) => Boolean(rowData.year),
        },
        {
            header: "Backlogs",
            accessorKey: "current_backlogs",
            type: "numeric",
            align: "left",
            min: 0,
            initialEditValue: 0,
        },
        {
            header: "SPC",
            accessorKey: "is_spc",
            type: "boolean",
            initialEditValue: 0,
        },
        {
            header: "CGPA",
            accessorKey: "cgpa",
            align: "left",
            // validate: (rowData) => Boolean(rowData.cgpa),
        },
        {
            header: "Counsellor Id",
            accessorKey: "counsellor_id",
            type: "numeric",
            align: "left",
            // validate: (rowData) => Boolean(rowData.counsellor_id),
        },
    ];

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
            columns={columns}
            data={data}
        />
    );
}
