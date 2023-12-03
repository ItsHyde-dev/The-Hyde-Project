"use client"

import Spinner from "./Spinner";

export default function ApiResponseHandlerWidget(isLoading: boolean, isError: any, successWidget: () => React.ReactNode) {
  if (isError) {
    return (<div>Something went wrong. Please try again later</div>);
  }

  if (isLoading) {
    return <div className="flex justify-center items-center w-full h-full">
      <Spinner />
    </div>
  }

  return successWidget()
}


