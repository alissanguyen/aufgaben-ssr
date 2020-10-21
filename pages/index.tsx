import { NextPageContext } from "next";
import Head from "next/head";
import * as React from "react";
import Navbar from "../components/Navbar";
import { AufgabenTodoItem, AufgabenTodosRecord } from "../types";
import { getMinifiedRecord, table } from "./api/utils/Airtable";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { TodosProvider } from "../components/TodosContext";
import { ISession } from "@auth0/nextjs-auth0/dist/session/session";
import auth0 from "./api/utils/auth0";

interface HomeProps {
  err?: string;
  initialTodos: AufgabenTodosRecord;
  session: ISession | null | undefined;
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <Head>
      
        <link rel="icon" href="/logo.svg"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Aufgaben</title>
      </Head>
      <TodosProvider initialTodos={props.initialTodos}>
        <main>
          <Navbar session={props.session} />
          <h1 className="text-2xl text-center mb-4">My Todos</h1>
          {props.session ? <AddTodoForm /> : null}
          <TodoList />
          {!props.session ? <p className="text-center">Have an account? ➜ Login</p> : null}
        </main>
      </TodosProvider>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = context.req ? await auth0.getSession(context.req) : null;

  try {
    const todos = session
      ? await table
          .select({ filterByFormula: `userId = "${session.user.sub}"` })
          .firstPage()
      : []; //TODO: Invite new user to register for an account
    const initialTodos = todos
      .map(getMinifiedRecord)
      .reduce<AufgabenTodosRecord>((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
    return {
      props: {
        initialTodos,
        session,
      },
    };
  } catch (err) {
    console.error(err)
    return {
      props: {
        session,
        initialTodos: {},
        error: "Something went wrong",
      },
    };
  }
}

export default Home;
