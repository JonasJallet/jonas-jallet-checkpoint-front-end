import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Checkpoint Frontend</title>
        <meta name="description" content="Wooooooow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-screen">{children}</div>
    </>
  );
}
