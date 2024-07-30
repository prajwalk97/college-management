import axios from "axios";
import { useState } from "react";
import { trackPromise } from "react-promise-tracker";

export const useMaterialTableUpdater = (props) => {
    const { columns, url } = props;
    const [data, setData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const handleSaveUser = (props) => {
        console.log(props.values)
        trackPromise(
            axios
                .put(url, props.values, {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {

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
}