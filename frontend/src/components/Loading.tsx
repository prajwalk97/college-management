import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ThreeCircles color="#263f66" />
            </div>
        )
    );
}
