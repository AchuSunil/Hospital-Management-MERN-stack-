import React, { Suspense } from "react";
//Components
import Banner from "./Components/Banner/Banner";
import Contents from "./Components/Contents/Contents";

// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "../../ErrorBoundary/ErrorBoundary";
// const Contents = React.lazy(() => import("./Components/Contents/Contents"));
// const Banner = React.lazy(() => import("./Components/Banner/Banner"));  
 
function HomeComponents() {
    return (  
        <div>
            {/* <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}> */}
                {/* <Suspense fallback={<div style={{ color: "red" }}>Loading....</div>}> */}
                    <Banner />
                    <Contents />
                {/* </Suspense> */}
            {/* </ErrorBoundary> */}
        </div>
    );
}

export default HomeComponents;
