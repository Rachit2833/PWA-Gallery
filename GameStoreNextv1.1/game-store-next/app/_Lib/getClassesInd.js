import supabase from "./Supabase";

export async function getClassesInd() {
  const { data, error } = await supabase
    .from("NewTimeTable")
    .select("Subjects(*),*,Teachers(*)")
  if (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
  return data;
}
