import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  // Jika request method selain get maka akan merespon status code 405 (Method Not Allowed)
  if (req.method !== "GET")
    return res.status(405).json({
      message: "METHOD NOT ALLOWED",
    });

  await authorization(req, res);

  // ambil id query
  const { id } = req.query;

  // mengambil request dari table posts
  const data = await db("post").where({ id }).first();

  if (!data)
    return res.status(404).json({
      statusCode: 404,
      message: "Data tidak ditemukan",
    });

  res.status(200).json({
    message: "Posts data",
    data,
  });
}
