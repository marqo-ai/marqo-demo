import { ReactComponent as Logo } from '../../assets/marqo-logo-white-text.svg';

const sizes: Record<string, number> = {
  xs: 16,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 128,
};

type LogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
};

const getSize = (size: number | string): number => {
  if (typeof size === 'number') {
    return size;
  }
  return sizes[size];
};

export const MarqoLogo: React.FC<LogoProps> = (props) => {
  const { size = 'xl' } = props;
  return <Logo className="marqoLogo" style={{ width: getSize(size), maxHeight: getSize(size) }} />;
};
