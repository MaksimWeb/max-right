import { Navbar } from '../navbar';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
