import Navbar from "@/components/Navbar";
import Image from "next/image";

const ContactPage = () => {
    return (
        <>
            <Navbar />

            <div className="custom-container">
                <div className="flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-between pt-[150px]">
                    <div className="max-w-[574px] w-full text-center lg:text-left">
                        <div className="title font-bold text-[32px]">Contact</div>
                        <div className="description text-[18px] color-neutral-30 mb-[20px]">We are ready to hep you and solve any queries.</div>

                        <div className="info">
                            <div className="mb-[12px] flex justify-center lg:justify-start gap-2">
                                <Image width={24} height={24} src={`/images/location.png`} alt='location' />

                                <span className="color-primary-47">Kathmandu, Nepal</span>
                            </div>

                            <div className="flex gap-2 justify-center lg:justify-start">
                                <Image width={24} height={24} src={`/images/email.png`} alt='email' />

                                <span className="color-primary-47">forestfootprint@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <Image src={`/images/contact.png`} alt="contact-illustration" width={400} height={350} />
                </div>
            </div>
        </>
    )
}

export default ContactPage;
