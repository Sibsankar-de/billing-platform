import { cn } from "../utils";

export const Loader = ({
  size = 20,
  className,
  stroke = 2,
}: {
  size?: number;
  className?: string;
  stroke?: number;
}) => {
  return (
    <div
      className={cn(
        "border-white/30 border-t-white rounded-full animate-spin",
        className
      )}
      style={{ width: size, height: size, borderWidth: `${stroke}px` }}
    ></div>
  );
};
