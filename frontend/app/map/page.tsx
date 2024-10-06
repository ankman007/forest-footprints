
import dynamic from "next/dynamic"


const DynamicNabar = dynamic(
    () => import('@/components/Navbar'),
    { ssr: false }
)

const DynamicMapComponent = dynamic(
    () => import('@/components/Map'),
    { ssr: false }
)


const MapPage = () => {
    return (
        <>
            <DynamicNabar />
            <DynamicMapComponent />
        </>
    )
}

export default MapPage