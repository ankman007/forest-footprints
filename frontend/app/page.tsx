'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useRef } from "react";


export default function Home() {

  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // @ts-expect-error STFU


      const video: HTMLVideoElement = videoRef.current;
      const scrollPosition = window.scrollY;
      const videoHeight = video.offsetHeight;
      const videoTop = video.offsetTop;
      const videoBottom = videoTop + videoHeight;

      if (scrollPosition >= videoTop && scrollPosition <= videoBottom) {
        // Play the video when scrolling down
        video.play();
      } else {
        // Pause the video when scrolling up
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="main-wrapper">
        <video ref={videoRef} muted loop autoPlay className="fixed lg:object-[-40px] left-0 right-0 top-0 bottom-0 object-cover w-[100vw] h-[100vh] -z-10 opacity-60">
          <source className="w-[100vw] h-[100vh] object-cover" src="/images/main-vid.mp4" type="video/mp4" />
        </video>

        <main className="flex-center h-[100vh] w-100">
          <h1 className="m-auto text-center color-neutral-0 text-[56px] lg:text-[64px] font-bold">FOREST FOOTPRINT</h1>
        </main>

        <div className="bg-primary-90">

          <div className="custom-container">
            <section className={`sc-intro py-[64px] pb-[0px]`}>
              <div className="sc-title text-[32px] font-bold text-center mb-[24px]">How We Make an Impact</div>

              <Image src={`/images/tool.png`} alt="main" width={1143} height={569} />
            </section>

            <section className={`sc-features py-[64px]`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="info-1">
                  <div className="title text-[32px] font-bold color-neutral-0">Deforestation</div>
                  <div className="description color-neutral-20">
                    Shows the rate of deforestation from one point of history to another or present condition.
                  </div>
                </div>

                <div className="info-2">
                  <div className="title text-[32px] font-bold color-neutral-0">Events</div>
                  <div className="description color-neutral-20">
                    Empowering people to participate in the event restoring the greenery in the world.
                  </div>
                </div>

                <div className="info-3">
                  <div className="title text-[32px] font-bold color-neutral-0">Recent Data</div>
                  <div className="description color-neutral-20">
                    Showing recent data showing public the situation of the forest across the world
                  </div>
                </div>

              </div>
            </section>

            <section className={'sc-impact py-[64px]'}>
              <div className="max-w-[500px] w-full mx-auto mb-[32px]">
                <div className="sc-title text-[32px] font-bold mb-[12px] text-center">See the Change: Take Charge with Our Forest Tracker</div>
                <div className="description color-neutral-20 text-center">Our platform help you to stay informed by engaging with local environment</div>
              </div>

              <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
                <div className="information max-w-[500px] w-full">
                  <div className="info-1 mb-[40px]">
                    <div className="title text-[32px] font-bold color-neutral-0">Join local events</div>
                    <div className="description color-neutral-20">
                      Take action by tracking deforestation participating in the local event
                    </div>
                  </div>

                  <div className="info-2">
                    <div className="title text-[32px] font-bold color-neutral-0">Environmental Impact</div>
                    <div className="description color-neutral-20">
                      Support global effort to  combat climate change and preserver the biodiversity through the data driven action.
                    </div>
                  </div>
                </div>

                <Image className="mb-[24px]" src={`/images/change.png`} alt="change" width={500} height={400} />
              </div>
            </section>

            <section className={'sc-discover py-[64px]'}>
              <div className="max-w-[500px] w-full mx-auto mb-[32px]">
                <div className="sc-title text-[32px] font-bold mb-[12px] text-center">Discover the uses: Empower yourself with tracking tool</div>
                <div className="description color-neutral-20 text-center">Step by step for using the tool</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="step">
                  <Image className="w-full mb-[8px]" src={`/images/step-1.png`} alt="step-1" width={500} height={400} />

                  <div className="text-center color-primary-20 text-[16px]">Setp 1: Access the interactive Map</div>
                </div>

                <div className="step">
                  <Image className="w-full mb-[8px]" src={`/images/step-2.png`} alt="step-1" width={500} height={400} />

                  <div className="text-center color-primary-20 text-[16px]">Step 2: Select a location to to explore</div>
                </div>

                <div className="step">
                  <Image className="w-full mb-[8px]" src={`/images/step-3.png`} alt="step-1" width={500} height={400} />

                  <div className="text-center color-primary-20 text-[16px]">Step 3: Participation in the event</div>
                </div>
              </div>
            </section>

          </div>
        </div>
        <footer className="py-[64px] bg-primary-94">
          <Image className="w-fit mb-[24px] mx-auto" src={`/images/full-logo.png`} alt="step-1" width={150} height={55} />

          <div className="text-center text-[20px]">Deforestation Tracking Tool</div>
          <div className="text-center  text-[16px] color-neutral-30">Empowering people to take action</div>
        </footer>
      </div>
    </>
  );
}
