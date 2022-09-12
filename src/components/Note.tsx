import React from "react"
import { InformationCircleIcon } from "@heroicons/react/outline"

const Note = ({ children }) => {
  return (
    <div tw="rounded-l-sm rounded-r-lg bg-lightBlue-100 text-lightBlue-700 flex p-4 pb-6 pr-5 relative mb-4 before:(absolute top-0 bottom-0 left-0 w-1 bg-lightBlue-200 rounded-l-sm) dark:(text-lightBlue-200 bg-lightBlue-900 bg-opacity-70) dark:before:(bg-lightBlue-300 bg-opacity-50)">
      <InformationCircleIcon tw="h-5 w-5 mt-1.5 ml-1.5 mr-4 flex-shrink-0" />
      <div>{children}</div>
    </div>
  )
}

export default Note
