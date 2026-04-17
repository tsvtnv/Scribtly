import { contrastColor, initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ClientAvatar({
  name,
  color,
  size = 40,
  className,
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const text = contrastColor(color);
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full font-medium", className)}
      style={{
        width: size,
        height: size,
        background: color,
        color: text,
        fontSize: Math.max(10, Math.floor(size * 0.4)),
      }}
    >
      {initials(name)}
    </div>
  );
}
