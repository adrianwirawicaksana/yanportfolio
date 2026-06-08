import { ReactNode } from "react"

type Props = {
    children: ReactNode;
}

const MarketPlace = ({children}: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-8">
      {children}
    </div>
  )
}

export default MarketPlace
