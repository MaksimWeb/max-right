import type { IconType } from 'react-icons';

interface Props {
  text: string;
  icon?: IconType;
  size?: number;
  handleClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  icon,
  size,
  handleClick,
  className = '',
}: Props) {
  const Img = icon;
  return (
    <button
      type='button'
      className={`text-2xl flex items-center gap-x-2 hover:text-rose-600 hover:fill-rose-600 ${className}`}
      onClick={handleClick}
    >
      <span>{text}</span>
      {Img ? <Img size={`${size}rem`} /> : null}
    </button>
  );
}
