import { revalidatePath } from "next/cache";
import supabase from "./Supabase";

export async function getCancelledClasses(teacherId) {
  let { data, error } = await supabase
    .from("CancelledClasses")
    .select("*")
    .eq("Teacher", teacherId);
  if (error) {
    console.error(error);
    return null;
  }
   revalidatePath("/orders");
  return data;
}
