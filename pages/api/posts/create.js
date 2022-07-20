import db from "../../../libs/db.js";
import authorization from "../../../middlewares/authorization.js";

export default async function handler(req, res) {
  // Jika request method selain post maka akan merespon status code 405 (Method Not Allowed)
  if (req.method !== "POST")
    return res.status(405).json({
      message: "METHOD NOT ALLOWED",
    });

  console.log(req.body);

  const auth = await authorization(req, res);

  console.log(auth);

  // Menggambil dari request content body dan destruct menjadi title dan content
  const { title, content } = req.body;

  // insert ke database menggunakan async await
  const create = await db("post").insert({
    title,
    content,
  });

  // mengquery data yang baru saya dibuat menggunkan async await
  const createdData = await db("post").where("id", create).first();

  // respond dengan status code 200 (Success) dan menampilkan "Post created successfully" dan data yang baru saya dibuat
  res.status(200).json({
    message: "Post created successfully",
    data: createdData,
  });
}
