import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="LoadingScreen">
      <div className="spinner-border text-primary LoadingScreen-Spinner" role="status">
        <span className="sr-only LoadingScreen-span">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingScreen;