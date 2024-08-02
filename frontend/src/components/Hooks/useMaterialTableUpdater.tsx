import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";

export const useMaterialTableUpdater = () => {
    const [value, setValue] = useState(0);

    const func = useCallback(() => {
        setTimeout(() => setValue(1), 5000);
    }, []);
    return { value, func };
}