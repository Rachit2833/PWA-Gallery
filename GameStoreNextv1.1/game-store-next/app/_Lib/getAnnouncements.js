import supabase from "./Supabase";
export async function getAnnouncements() {
  let { data: NewAnnouncements, error } = await supabase
    .from("NewAnnouncements")
    .select("*");
  if (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
  return NewAnnouncements;
}
