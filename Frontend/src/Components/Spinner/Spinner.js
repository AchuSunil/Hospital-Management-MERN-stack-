import "./Spinner.scss";
import spinnerAnime from '../../Assets/gifs/loading.gif'

const Spinner = ()=> {
    return (
        <>
            <div className="loadingSpinnerContainer">
                <img className="loadingSpinner" src={spinnerAnime} alt="" draggable={false}/>
            </div>
        </>
    );
}
export default Spinner;