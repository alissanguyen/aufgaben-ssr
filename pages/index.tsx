import { NextPageContext } from "next";
import Head from "next/head";
import * as React from "react";
import Navbar from "../components/Navbar";
import { AufgabenTodoItem, AufgabenTodosRecord } from "../types";
import { getMinifiedRecord, table } from "./api/utils/Airtable";
import TodoList from "../components/TodoList";
import { TodosProvider } from "../components/TodosContext";

interface HomeProps {
  err?: string;
  initialTodos: AufgabenTodosRecord;
}

const Home: React.FC<HomeProps> = (props) => {
  console.log(props.initialTodos);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Aufgaben</title>
      </Head>
      <TodosProvider initialTodos={props.initialTodos}>
        <main>
          <Navbar />
          <TodoList />
        </main>
      </TodosProvider>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const todos = await table.select().firstPage();
    const initialTodos = todos
      .map(getMinifiedRecord)
      .reduce<AufgabenTodosRecord>((acc, cur, arr) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
    return {
      props: {
        initialTodos,
      },
    };
  } catch (err) {
    return {
      props: {
        session: null,
        initialTodos: {},
        error: "Something went wrong",
      },
    };
  }
}

export default Home;
