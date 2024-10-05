import Image from "next/image";

export default function Home() {
  return (
    <div className="main-wrapper">
      <video muted loop autoPlay className="fixed left-0 right-0 top-0 bottom-0 w-100 -z-1">
        <source src="/images/main-vid.mp4" type="video/mp4" />
      </video>

      <main className="flex-center h-[500px] w-100">
        <h1 className="m-auto color-primary-10 text-[64px] font-bold">FOREST FOOTPRINT</h1>
      </main>
    </div>
  );
}
