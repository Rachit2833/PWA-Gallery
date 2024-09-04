import supabase from "./Supabase";
import { revalidatePath } from "next/cache";
export async function getConcludedClasses(teacherId){

let { data, error } = await supabase
  .from("ConcludedClasses")
  .select("*")
  .eq("Teacher",teacherId);
    if (error) {
      console.error("Error fetching timetable:", error);
      return null;
    }
    revalidatePath("/orders");
    return data;
}