import supabase from "./Supabase";

export async function addNewEvent(newData){
const { data, error } = await supabase
  .from("ExtraEvents")
  .insert(newData)
  .select(); 
   if (error) {
     console.error("Error fetching timetable:", error);
     return null
   }
   return data 
}