import { verifySession } from '../lib/dal';
import HeaderAdmin from '@/components/HeaderAdmin';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await verifySession()

  return (
    <>
      <HeaderAdmin auth={auth} />
      <main>
        {children}
      </main>
    </>
  );
}
