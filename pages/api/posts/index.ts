import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import Joi from "joi";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import { readFile } from "../../../lib/utils";
import Post from "../../../models/Post";
import formidable from "formidable";
import cloudinary from "../../../lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      await dbConnect();
      res.json({ ok: true });
    }
    case "POST":
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile(req);

  let tags: string[] = [];
  console.log(body);
  // tags will be in string form so converting to array
  const {
    title,
    content,
    slug,
    meta,
  }: { title: string; content: string; slug: string; meta: string } = body as {
    title: string;
    content: string;
    slug: string;
    meta: string;
  };

  await dbConnect();
  const alreadyExits = await Post.findOne({ slug });
  if (alreadyExits)
    return res.status(400).json({ error: "Slug need to be unique!" });

  // create new post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  // uploading thumbnail if there is any
  const thumbnail = files.thumbnail?.[0] as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();

  res.json({ post: newPost });
};

export default handler;
