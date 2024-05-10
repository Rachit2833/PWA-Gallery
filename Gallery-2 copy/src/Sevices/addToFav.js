import supabase from "../../Supabase";

export async function addToFav(data) {
  console.log(data);
  try {
    const { error } = await supabase
      .from('Favourites')
      .insert([data])
      .select();
  } catch (error) {
    console.error(error);
  }
}
