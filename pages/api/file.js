export const config = { api: { bodyParser: { sizeLimit: "5mb" } } };
export default async function handler(
  req = NextApiRequest,
  res = NextApiResponse
) {
  res.status(200).end("uploaded");
}
