import supabase from "./Supabase";

export async function getExtraEvent(){

let { data: ExtraEvents, error } = await supabase
  .from("ExtraEvents")
  .select("*");
    if (error) {
     console.error("Error fetching timetable:", error);
      return null;
   }
   return ExtraEvents
}