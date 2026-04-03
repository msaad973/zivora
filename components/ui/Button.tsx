import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { tw } from "@/lib/tokens";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantMap: Record<Variant, string> = {
  primary: tw.btnPrimary,
  secondary: tw.btnSecondary,
  outline: tw.btnOutline,
  ghost: tw.btnGhost,
};

const sizeMap: Record<Size, string> = {
  sm: tw.btnSm,
  md: tw.btnMd,
  lg: tw.btnLg,
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

type Props = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  const base = `inline-flex items-center justify-center gap-2 ${variantMap[variant]} ${sizeMap[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, onClick, target, rel } = rest as ButtonAsLink;
    return (
      <Link href={href} className={base} onClick={onClick} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...btnRest } = rest as any;
  return (
    <button className={base} {...btnRest}>
      {children}
    </button>
  );
}
