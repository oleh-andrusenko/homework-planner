import formidable from "formidable"

import path from "path"
import fs from "fs/promises"

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFile = (req, saveLocally) => {
  const options = {}
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/userAvatars")
    options.fileName = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename
    }
    options.maxFileSize = 4000 * 1024 * 1024
    options.keepExtensions = true
  }

  const form = formidable(options)
  return new Promise((resolve, reject) => {
    console.log("PROMISE...")
    form.parse(req, (err, fields, files) => {
      console.log("fields:", fields)
      console.log("files:", files)
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const handler = async (req, res) => {
  try {
    const fd = await req.formData()
    console.log("REQ", fd)
    await fs.readdir(path.join(process.cwd() + "/public", "/userAvatars"))
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/userAvatars"))
  }
  await readFile(req, true)
  res.json({ done: "ok" })
}

export { handler as POST }
