"use client"

import Spinner from "./Spinner";

export default function ApiResponseHandlerWidget(isLoading: boolean, isError: any, successWidget: () => React.ReactNode) {
  if (isError) {
    return (<div>Something went wrong. Please try again later</div>);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return successWidget()
}


