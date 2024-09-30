import Logo from '../assets/logo.svg'; // Certifique-se de que o caminho está correto
import Image from "next/image"

export default function Header() {
    return (
        <header className="min-h-52 stone-950 w-screen flex items-center justify-center">
            <Image src={Logo} width={150} alt="Logo" />
        </header>
    );
}