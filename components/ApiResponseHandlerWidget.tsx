"use client"

export default function ApiResponseHandlerWidget(isLoading: boolean, isError: any, successWidget: () => React.ReactNode) {
  if (isError) {
    return (<div>Something went wrong. Please try again later</div>);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return successWidget()
}


