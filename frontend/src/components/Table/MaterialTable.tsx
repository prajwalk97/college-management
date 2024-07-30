import {
    MaterialReactTable,
} from 'material-react-table';
import React from "react";

export const MaterialTable = ({ table }) => {
    return (
        <div>
            <MaterialReactTable
                table={table} //only pass in table instead of all table options
            />
        </div>
    )
}