const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary/70 mx-auto"></div>

        <h2 className="text-primary mt-4 text-xl font-semibold">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default LoadingPage;
