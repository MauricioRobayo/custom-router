import type { NextPage } from "next";
import { readFile } from "fs/promises";
// import Module1 from "../components/Module1";
// import Module2 from "../components/Module2";
// import Module3 from "../components/Module3";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ComponentType } from "react";

const Module1 = dynamic(() => import("../components/Module1"));
const Module2 = dynamic(() => import("../components/Module2"));
const Module3 = dynamic(() => import("../components/Module3"));

const modulesMap: { [key: string]: (() => JSX.Element) | ComponentType<{}> } = {
  Module1,
  Module2,
  Module3,
};

interface ModuleConfig {
  path: string;
}

type Modules = Record<string, ModuleConfig>;

const Home: NextPage<{ modules: Modules }> = ({ modules }) => {
  const { asPath } = useRouter();

  const pathModule = Object.entries(modules).find(
    ([_, { path }]) => path === asPath
  );

  if (!pathModule) {
    return <div>No module on that path</div>;
  }

  const Module = modulesMap[pathModule[0]];

  return <Module />;
};

export async function getServerSideProps() {
  const json = await readFile("./modules.json", "utf-8");

  return {
    props: { modules: JSON.parse(json) },
  };
}

export default Home;
