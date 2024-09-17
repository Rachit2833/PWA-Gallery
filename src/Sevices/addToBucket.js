import supabase from "../../Supabase";

export async function uploadFile(file, id) {
  // Generate a unique filename
  const uniqueFilename = `${id}.png`;

  console.log(file);
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

export async function uploadFileFromDocuments(file, uniqueFilename) {
  try {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(uniqueFilename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return { success: false, error: error.message };
    } else {
      console.log("Upload successful:", data);
      // Assuming you want to return some useful data
      return { success: true, data: data };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: error.message };
  }
}
