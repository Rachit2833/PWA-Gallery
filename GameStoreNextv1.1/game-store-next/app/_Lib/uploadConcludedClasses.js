import supabase from "./Supabase";
export async function updateConcludedClasses(item) {

  const filteredItem = {
    Date: item.Date,
    Teacher: item.Subjects?.Teacher,
    Class: item.Class,
    subject: item.Subjects?.Name,
    time: item.time,
    type: item.type,
  };

  try {
    const { data, error } = await supabase
      .from("ConcludedClasses")
      .insert(filteredItem)
      .select();

    if (error) {
      console.error(error);
    } else {
      console.log(data); // Optionally log the data if needed

    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}
