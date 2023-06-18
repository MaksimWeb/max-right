interface Props {
  text: string;
  data: DataType;
  handleClick: (data: any) => void;
}

type DataType =
  | { login: string; password: string }
  | { title: string; text: string };

export default function ModalButton({ text, data, handleClick }: Props) {
  return (
    <button
      type='button'
      className='text-white bg-gradient-to-r from-red-500 to-purple-900 rounded-md'
      onClick={() => handleClick(data)}
    >
      {text}
    </button>
  );
}
