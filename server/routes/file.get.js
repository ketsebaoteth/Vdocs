// /server/routes/file/[name].get.js
import fs from "fs";

export default defineEventHandler(async (event) => {
  const base = "data";
  const filePath = path.join(base, event.context.params.name);

  console.log("file path is : ", filePath);

  return sendStream(event, fs.createReadStream(filePath));
});