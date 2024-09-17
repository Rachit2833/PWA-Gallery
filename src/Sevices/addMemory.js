import supabase from "../../Supabase";
import {  uploadFileFromDocuments } from "./addToBucket";


export async function addMemory(Newdata) {
  let date = new Date();
  let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date
    .getHours()
    .toString()
    .padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  let uniqueFilename = `${formattedDate}-${Newdata.Image[0].name}`;
  uploadFileFromDocuments(Newdata.Image[0], uniqueFilename);
  const { data, error } = await supabase
    .from("Images")
    .insert([
      {
        Location: Newdata.Location,
        Image: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/images/${uniqueFilename}`,
        Description: Newdata.Description,
        Date: new Date(),
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
