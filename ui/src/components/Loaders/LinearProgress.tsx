import { Progress, useTheme } from "react-daisyui"

type Props = {
    className?: string;
    size: "thin" | "regular";
    fullWidth: boolean;
}

export const LinearProgress: React.FC<Props> = ({ className = "", size, fullWidth }) => {
    const { theme } = useTheme();

    return <div className={`${fullWidth ? "w-full" : "min-w-[50%]"} ${className}`}>
        <Progress className={`${size === "thin" ? "h-[5px]" : ""} ${theme === "dark" && "progress-accent bg-slate-700"}`} />
    </div>
}