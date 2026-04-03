import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { tw } from "@/lib/tokens";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  dark?: boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  dark?: boolean;
  multiline: true;
}

type Props = InputProps | TextareaProps;

export default function Input({ label, dark = false, className = "", ...rest }: Props & { multiline?: boolean }) {
  const base = `${dark ? tw.inputDark : tw.input} ${className}`;
  const labelClass = dark ? tw.labelDark : tw.label;

  return (
    <div>
      {label && <label className={labelClass}>{label}</label>}
      {"multiline" in rest && rest.multiline ? (
        <textarea
          className={`${base} resize-none`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={base} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}
