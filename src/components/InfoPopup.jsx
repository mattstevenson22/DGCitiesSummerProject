export default function InfoPopup(props) {
    return (props.trigger) ? (
      <div className="info-popup">
        <div className="info-popup-inner">
          <p> Testing </p>
          <button className="close-btn">Close</button>
        </div>
      </div>
    ) : "";
}
