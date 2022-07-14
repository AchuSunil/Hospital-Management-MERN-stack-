import React from "react";
import "./Contents.css";


function Contents() {
    return (
        <main className="content-main ">
            <div className="left-main ">
                <h1 className="content-heading">Committed To Your Safety.</h1>
                <p className="content-para">
                    At Health Care Hospital we continue to follow the highest level of safety precautions as we treat our
                    patients. We are strictly adhering to all ICMR & WHO mandated protocols, to keep you and your family
                    safe & healthy.
                </p>
                <div className="sub-main">
                    <div className="sub-main-left">
                        <div className="image-icon">
                            <img src={process.env.PUBLIC_URL + "Images/Small-Icons/ppe_0.svg"} alt="not found" />
                        </div>
                        <div className="sub">
                            <h6 className="sub-heading">Screening for All</h6>
                            <p className="sub-para">
                                All our employees & patients must go through a mandatory thermal screening before entering
                                the hospital premises.
                            </p>
                        </div>
                    </div>
                    <div className="sub-main-right">
                        <div className="image-icon">
                            <img src={process.env.PUBLIC_URL + "Images/Small-Icons/mask-usage_0.svg"} alt="not found" />
                        </div>
                        <div className="sub">
                            <h6 className="sub-heading">Masks for Everyone</h6>
                            <p className="sub-para">
                                Wearing a mask that securely covers the nose & mouth is mandatory for all patients,
                                attendants, doctors & hospital staff.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sub-main">
                    <div className="sub-main-left">
                        <div className="image-icon">
                            <img src={process.env.PUBLIC_URL + "Images/Small-Icons/sanitization_0.svg"} alt="not found" />
                        </div>
                        <div className="sub">
                            <h6 className="sub-heading">Sanitized Facility</h6>
                            <p className="sub-para">
                                We regularly disinfect medical equipment and the facility to ensure a healthy and virus free
                                environment.
                            </p>
                        </div>
                    </div>
                    <div className="sub-main-right">
                        <div className="image-icon">
                            <img
                                src={process.env.PUBLIC_URL + "Images/Small-Icons/physical-distance_0.svg"}
                                alt="not found"
                            />
                        </div>
                        <div className="sub">
                            <h6 className="sub-heading">Worry-free treatment</h6>
                            <p className="sub-para">
                                Everyone is requested to adhere to social distancing norms in waiting and all public areas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-main">
                <img src={process.env.PUBLIC_URL + "Images/Small-Icons/extra-safety-measures.jpg"} alt="not found" />
            </div>
        </main>
    );
}

export default Contents;
