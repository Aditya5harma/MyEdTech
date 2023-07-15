const cloudinary = require("cloudinary").v2

exports.cloudinaryUpload = async(file,folder,height,quality) => {
    const options = {folder: folder}
    if(quality) {
        options.quality = quality;
    }
    if(height){
        options.height = height;
    }
    options.resource_type = "auto";
    console.log(`options-${options.folder} ${file.tempFilePath}`)
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}
