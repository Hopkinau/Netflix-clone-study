import { getSession, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorities from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModel';
import useInfoModal from '@/hooks/useInfoModal';
// 这个函数是禁止user自己点击URL 到下一页，必须要login才行
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  // const { data: favorites = [] } = useFavorities;
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        {/* <MovieList title='My List' data={favorites} /> */}
      </div>
    </>
  );
}
