import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import Category from './Category';
import LogoutButton from '../auth/LogoutButton';

export default async function BottomNav() {
  // TO DO
  // 서버 컴포넌트 - 클라이언트 컴포넌트로 분리한 후 로그아웃 기능 추가
  // 프로필 사진 부분 아이콘 또는 사진 나타나도록 구현하기. 눌렀을 때 테두리 페이지 활성화 표시
  const { id } = await getSession();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      profileImg: true,
    },
  });

  return (
    <nav className='lg:hidden fixed bottom-0 bg-white w-full flex justify-between items-center px-10 py-4 bg-opacity-90'>
      <Category profileImg={user!.profileImg} />
      <LogoutButton />
    </nav>
  );
}
