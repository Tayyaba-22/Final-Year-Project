const v2 = require("cloudinary");
const fs = require("fs");

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on v2
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on v2 ", localFilePath);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error coming while uploading file : " + error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteImageCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    let urlArray = localFilePath.split("/");
    let image = urlArray[urlArray.length - 1];
    let imageName = image.split(".")[0];
    console.log(imageName);
    //upload the file on v2
    const response = await v2.uploader.destroy(imageName, (error, result) => {
      console.log(result);
    });
    // file has been uploaded successfull
    console.log("file is deleted on v2 ", localFilePath);
    return response;
  } catch (error) {
    console.log("Error coming while deleting file : " + error);
    return null;
  }
};

module.exports = { uploadCloudinary, deleteImageCloudinary };
