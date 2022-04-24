// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const Moralis = require("moralis/node");

const serverUrl = "YOUR-SERVER-URL";
const appId = "YOUR-APP-ID";
const masterKey = "YOUR-MASTER-KEY";

type Data = {
  name: string;
};

const setup = async () => {
  await Moralis.start({ serverUrl, appId, masterKey });
};

setup();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: "John Doe" });
};

export default handler;
