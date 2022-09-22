interface DevstackItemProps {
  item: string
  label?: string
}

const DevstackItem = ({ item, label }: DevstackItemProps): JSX.Element => {
  return (
    <div tw="border dark:(border-gray-600/50 background-color[#2a3340]) rounded-lg px-3 py-1.5 inline-flex mr-4 items-center">
      <img tw="h-6 w-6 m-0!" src={`/assets/devicons/${item}/plain/icon.svg`} alt="" />
      <span tw="font-medium ml-3 mr-2">{label}</span>
    </div>
  )
}

export default DevstackItem
