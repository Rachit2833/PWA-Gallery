import supabase from "../../Supabase";

export async function updateData(newData, id) {
  try {
    const { data, error } = await supabase
      .from('Rewinds')
      .update({ Image: newData })
      .eq('id', id)
      .select();
    
    if (error) {
      // Handle the error, you can log it or throw it again if needed
      console.error("Supabase error:", error);
      throw error;
    }

    return data;
  } catch (catchError) {
    // Handle the error in the catch block
    console.error("An error occurred:", catchError);
    // You can throw the error again or handle it in a specific way based on your needs
    throw catchError;
  }
}
