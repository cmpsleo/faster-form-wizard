import Head from "next/head";

import { Signup } from "@/signup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Signup - A basic stepper signup.</title>
      </Head>
      <Signup />
    </>
  );
}
