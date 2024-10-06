import Navbar from "@/components/Navbar";
import Image from "next/image";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="custom-container pt-[100px]">

                <div className="sc-team">
                    <h3 className="font-bold text-[32px] text-center mb-[12px]">Team</h3>

                    <div className="flex flex-wrap gap-[20px] justify-center">
                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-1.png`} className="rounded-[8px] aspect-[1.5] object-cover w-full h-auto" />
                            <div className="mt-[8px] text-center">Ankeet Poudel</div>
                        </div>


                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-2.png`} className="rounded-[8px] aspect-[1.5] object-cover w-full h-auto" />
                            <div className="mt-[8px] text-center">Shovit Bhatt</div>
                        </div>


                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-3.png`} className="rounded-[8px] aspect-[1.5] object-cover w-full h-auto" />
                            <div className="mt-[8px] text-center">Abhishek Shakya</div>
                        </div>

                        
                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-4.png`} className="rounded-[8px] aspect-[1.5] object-cover w-full h-auto" />
                            <div className="mt-[8px] text-center">Rekha Angdembe</div>
                        </div>

                        
                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-5.png`} className="rounded-[8px] aspect-[1.5] object-cover w-full h-auto" />
                            <div className="mt-[8px] text-center">Aryan Thapa Magar</div>
                        </div>

                        
                        <div className="team max-w-[300px] w-full">
                            <Image width={250} height={200} alt="team" src={`/images/team-6.png`} className="rounded-[8px] aspect-[1.5] object-cover object-top w-full h-auto" />
                            <div className="mt-[8px] text-center">Shaksham Ghimire</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default About;