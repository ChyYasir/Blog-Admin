import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudinary from "../../lib/cloudinary";
import { readFile } from "../../lib/utils";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      return uploadNewImage(req, res);
    case "GET":
      return readAllImages(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

const uploadNewImage: NextApiHandler = async (req, res) => {
  try {
    const { files } = await readFile(req);
    const imageFile = Array.isArray(files.image)
      ? files.image[0]
      : ((files.image && files.image[0]) as formidable.File | undefined);

    if (!imageFile) {
      throw new Error("Image file not found.");
    }

    const { secure_url: url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      {
        folder: "dev-blogs",
      }
    );
    // console.log("Random");
    // console.log(url);
    res.json({ src: url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "dev-blogs",
    });

    const images = resources.map(({ secure_url }: any) => ({
      src: secure_url,
    }));
    res.json({ images });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
