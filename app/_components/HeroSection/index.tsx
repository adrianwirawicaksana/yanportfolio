import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const HeroSection = ({children}: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {children}
    </div>
  )
}

export default HeroSection
