const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper" aria-live="polite" aria-busy="true">
      <div className="loading-shadow-wrapper bg-white shadow-soft-md">
        <div className="loading-shadow">
          <div className="loading-animation h-12 w-12 rounded-full border-4 border-[#e9dfcd] border-t-[#663820]" />
          <h3 className="loading-title font-serif">Preparing your book...</h3>
          <div className="loading-progress">
            <p className="text-center text-(--text-secondary)">
              Uploading files and setting up your assistant voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
