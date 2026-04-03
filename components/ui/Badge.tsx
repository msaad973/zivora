import { tw } from "@/lib/tokens";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: Props) {
  return (
    <span className={`${tw.badge} ${className}`}>
      {children}
    </span>
  );
}
