import { NextPageContext } from "next";
import Head from "next/head";
import * as React from "react";
import Navbar from "../components/Navbar";
import { AufgabenTodoItem } from "../types";
import { minifyRecords, table } from "./api/utils/Airtable";

interface HomeProps {
  err?: string;
  initialTodos: AufgabenTodoItem[];
}

const Home: React.FC<HomeProps> = (props) => {
  const { initialTodos } = props;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Aufgaben</title>
      </Head>
      <main>
        <Navbar />
        <h1>Aufgaben </h1>
        <ul>
          {initialTodos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.fields.description} |{" "}
                {todo.fields.completed ? "DONE" : "INCOMPLETE"}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
        initialTodos: [],
      },
    };
  }
}

export default Home;
