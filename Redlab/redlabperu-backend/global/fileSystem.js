const fs = require("fs")
const path = require("path");
const { url : rootUrl, pathRootStaticFiles, port } = require("../config");
const pathsStaticFiles = require("../config/properties/pathsStaticFiles");

/*
This function take the original absolute path (which is tmp) and moves it (all sync) to public 
static path folder by its typeFile (logo, typeService, etc. See 'pathsStaticFiles.js') 
and returns the absolute public url to save in DB
*/
//CA
function saveFile(originalAbsolutePath, typeFile) {
    const data = fs.readFileSync(originalAbsolutePath);
    
    const pathStaticFile = pathsStaticFiles[typeFile]
    //When the file is uploaded it uses an unique name, we take it
    const uniqueNameFile = originalAbsolutePath.substring(originalAbsolutePath.lastIndexOf('\\')+1,originalAbsolutePath.length)
    const rootAbsolutePath = path.resolve("."); //absolute path of 'index.js'
    const pathUrl =  `${pathRootStaticFiles}/${pathStaticFile}/${uniqueNameFile}`;
    const newAbsolutePath = `${rootAbsolutePath}/${pathUrl}`;
    console.log('hereee')
    console.log(uniqueNameFile)
    console.log(rootAbsolutePath)
    console.log(pathUrl)
    console.log(newAbsolutePath)
    
    fs.writeFileSync(newAbsolutePath, data);
    
    const publicUrl = `${rootUrl}:${port}/${pathUrl}`
    return publicUrl;
}
//CA

module.exports = {
  saveFile
}