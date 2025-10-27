import { Icon as LucideIcon } from "lucide-react"; // juste pour le type
import Link from "next/link";

type LinkProps = {
  path: string;
  text: string;
  style: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
};

export default function LinkButton({ path, text, style, Icon }: LinkProps) {
  return (
    <Link href={path} className={`m-2 p-2 md:m-4 md:py-4 flex items-center w-fit ${style} text-neutral-50 width-inherit md:px-12 justify-center font-bold`}>
      {Icon && <Icon size={24} className="mx-2" />}
      {text}
    </Link>
  );
} 