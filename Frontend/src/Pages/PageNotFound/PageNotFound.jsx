import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import error from "../../Assets/lotties/84048-404-page-not-found.json";

export const PageNotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 7000);
    }, [navigate]);
    return (
        <>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        </>
    );
};
