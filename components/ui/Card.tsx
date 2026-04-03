import { tw } from "@/lib/tokens";

interface Props {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function Card({ children, dark = false, className = "" }: Props) {
  return (
    <div className={`${dark ? tw.cardDark : tw.card} ${className}`}>
      {children}
    </div>
  );
}
