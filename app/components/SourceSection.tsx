import SourceHeader from "./HeaderSource"
import { ReactNode } from "react"
import MediaSource from "./MediaSource";

type Props = {
children: ReactNode;
}

const SourceSection = ({children}: Props) => {
return (
<div className="min-h-screen w-full flex flex-col items-center justify-center mt-12">
    <SourceHeader />
    <MediaSource />
</div>
)
}

export default SourceSection