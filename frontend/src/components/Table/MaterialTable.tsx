import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import React from "react";

export const MaterialTable = (props) => {
    const { columns, data } = props;
    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true, //table options as options to this hook
    });
    return (
        <div>
            <MaterialReactTable
                table={table} //only pass in table instead of all table options
            />
        </div>
    )
}