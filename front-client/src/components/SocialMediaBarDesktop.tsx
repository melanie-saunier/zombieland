import Image from "next/image";

export default function SocialMediaBarDesktop() {
  return (
    <div className="hidden md:flex justify-end gap-4 border-solid border-b-2 border-primary-purple-300 bg-black p-4">
      <a href={"https://www.youtube.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
        <Image src="/images/icons/youtube-circle.png" alt="Logo de Youtube" width={24} height={24}/>
      </a>
      <a href={"https://www.facebook.com/?locale=fr_FR"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
        <Image src="/images/icons/facebook.png" alt="Logo de Facebook" width={24} height={24}/>
      </a>
      <a href={"https://www.instagram.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
        <Image src="/images/icons/instagram.png" alt="Logo de Instagram" width={24} height={24}/>
      </a>
      <a href={"https://www.tiktok.com/fr/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
        <Image src="/images/icons/tik-tok.png" alt="Logo de Tik-tok" width={24} height={24}/>
      </a>
    </div>
  );
}