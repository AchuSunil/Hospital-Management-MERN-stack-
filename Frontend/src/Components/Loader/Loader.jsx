import React from "react";
import "./loader.scss";
import loadingAnime from '../../Assets/gifs/lazyLoader.gif'

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <img className="load-anime" src={loadingAnime} alt="" draggable={false} />
        </div>
    );
};


export default Loader ;