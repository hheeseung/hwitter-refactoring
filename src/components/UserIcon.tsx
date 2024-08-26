import { FaUser } from 'react-icons/fa';

interface Props {
  custom: string;
}

export default function UserIcon({ custom }: Props) {
  return (
    <FaUser
      className={`text-primary bg-background rounded-xl p-2 shadow-sm ${custom}`}
    />
  );
}
