import supabase from "../../Supabase";

export async function DeleteFromFav(data){
    const parsedData =JSON.parse(data)
try {
    const { error } = await supabase
  .from('Favourites')
  .delete()
  .eq("id",parsedData.id )
} catch (error) {
    console.error(error);
    throw error
}
          
}