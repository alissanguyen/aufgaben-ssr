import Head from "next/head";
import * as React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Aufgaben</title>
      </Head>
      <main>
        <Navbar/>
        <h1>Aufgaben</h1>
      </main>
    </>
  );
};

export default Home;
