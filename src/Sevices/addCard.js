import supabase from "../../Supabase";

export async function addCard(FileData) {
    try {
        console.log("Adding card with data:", FileData);

        const { data, error } = await supabase
            .from('Images')
            .insert([FileData])
            .select();

        if (error) {
            console.error("Error adding card:", error);
        } else {
            console.log("Card added successfully:", data);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
}
