import supabase from "./Supabase";
import { revalidatePath } from "next/cache";
export async function scheduleExtraClasses(classData){

const { data, error } = await supabase
  .from("Extra_Classes")
  .insert(classData)
  .select();
  if (error){
      console.error("Error fetching timetable:", error);
      return null;
   } 
   revalidatePath("/terms");
   return data

}