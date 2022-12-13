import { ReactComponent as CaretDownSvg } from "../../assets/caret-down.svg"

type Props = {
    fill?: string;
}

export const CaretDown: React.FC<Props> = ({ fill = "primary" }) => {
    return <CaretDownSvg fill={fill} height="1em" />
}