import supabase from "./Supabase";

export async function createUser(newdata) {
   
const { data, error } = await supabase
  .from("Student")
  .insert(newdata)
  .select();
  if (error) {
    console.error( error);
    return null;
  }

  return data;
          
}