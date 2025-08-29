import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                <div className="flex flex-col gap-4 max-w-sm">
                    <h2 className="text-2xl font-bold text-white">Tracker Vagas</h2>
                    <p className="text-gray-400">
                        Gerencie e acompanhe suas candidaturas a empregos com facilidade.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-white mb-2">Links Úteis</h3>
                    <a href="#" className="hover:text-green-400 transition-colors">Home</a>
                    <a href="#" className="hover:text-green-400 transition-colors">Sobre</a>
                    <a href="#" className="hover:text-green-400 transition-colors">Contato</a>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-white mb-2">Siga-nos</h3>
                    <div className="flex gap-4">
                        <a href="https://github.com/carloserickms" target="_blank" aria-label="GitHub" className="hover:text-blue-600 transition-colors">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/carlos-erick" target="_blank" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="my-8 border-gray-700" />

            <p className="text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Tracker Vagas. Todos os direitos reservados.
            </p>
        </footer>
    );
}
