import supabase from "../../Supabase";

export async function addToFav(data) {

  try {
    const { error } = await supabase
      .from('Favourites')
      .insert([data])
      .select();
  } catch (error) {
    console.error(error);
  }
}
