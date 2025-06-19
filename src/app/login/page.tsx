import DefaultHeaders from "@/components/DefaultHeaders";
import RegisterModal from "@/components/RegisterModal";



export default function Login() {
    return (
        <div className="flex-col h-dvh overflow-y-hidden">
            <DefaultHeaders />

            <div className="flex justify-center items-center h-full">
                <RegisterModal />
            </div>
        </div>
    );
}
