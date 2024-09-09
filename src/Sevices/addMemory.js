import supabase from "../../Supabase";
import {  uploadFileFromDocuments } from "./addToBucket";


export async function addMemory(Newdata) {

  uploadFileFromDocuments(Newdata.Image[0]);
  const { data, error } = await supabase
    .from("Images")
    .insert([
      {
        Location: Newdata.Location,
        Image: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/images/${Newdata.Image[0].name}`,
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
