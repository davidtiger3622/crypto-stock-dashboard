function Skeleton() {
    return (
      <div className="w-full max-w-md mx-auto mb-6 animate-pulse">
        <div className="bg-gray-800 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-700" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-700 rounded w-1/4" />
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="h-5 bg-gray-700 rounded w-24" />
            <div className="h-3 bg-gray-700 rounded w-12" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 mt-4">
          <div className="flex gap-2 mb-4">
            <div className="h-7 w-10 bg-gray-700 rounded-full" />
            <div className="h-7 w-10 bg-gray-700 rounded-full" />
            <div className="h-7 w-10 bg-gray-700 rounded-full" />
          </div>
          <div className="h-48 bg-gray-700 rounded-xl" />
        </div>
      </div>
    )
  }
  
  export default Skeleton
