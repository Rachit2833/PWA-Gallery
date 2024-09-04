import supabase from "./Supabase";

export async function uploadFile(file, storageName = "Profile") {
  const { data, error } = await supabase.storage
    .from(storageName)
    .upload(file.name, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(error);
    return null;
  }

  return data; // Return the data on successful upload
}
