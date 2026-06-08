import { platforms } from "@/constants/platformConstants";
import Image from "next/image";

const SourceHeader = () => {
return (
<div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 mx-5 md:mx-10 lg:mx-20">
  {platforms.map((items, index) => (
    <div
      key={index}
      className="flex items-center justify-start rounded-xl overflow-hidden bg-black p-2 gap-4 text-white"
    >
      <div className="relative h-14 w-14 shrink-0">
        <Image
          src={items.logo}
          alt={items.name}
          fill
          sizes="56px"
          className="object-contain rounded"
        />
      </div>

      <div>
        <p className="text-sm text-gray-200">{items.subject}</p>
        <h2 className="font-bold">{items.name}</h2>
      </div>
    </div>
  ))}
</div>
)
}

export default SourceHeader