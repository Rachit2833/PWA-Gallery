 import supabase from "../../Supabase";

export async function uploadFile(file,id) {
    // Generate a unique filename
    const uniqueFilename = `${id}.png`;

    console.log(file);
    const { data, error } = await supabase.storage.from('images').upload(uniqueFilename, file, {
        cacheControl: '3600',
        upsert: false,
    });

    if (error) {
        console.error('Error uploading file:', error);
        // Handle error as needed
    } else {
        // Handle success
    }
}



export async function uploadFileFromDocuments(file) {
  console.log(file.name);
  let uniqueFilename;
  if (file.name.split(".").length < 2) {

    uniqueFilename = `${file.name}.png`;
  } else {
    uniqueFilename = file.name;
  }

  const { data, error } = await supabase.storage
    .from("images")
    .upload(uniqueFilename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    // Handle error as needed
  } else {
    // Handle success
  }
}