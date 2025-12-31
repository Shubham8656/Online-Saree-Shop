import "./Loading.css";

function Loading({ text = "Please wait..." }) {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
}

export default Loading;
