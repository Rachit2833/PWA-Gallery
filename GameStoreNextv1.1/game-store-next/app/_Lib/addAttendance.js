import supabase from "./Supabase";

export async function addAttendance( tableName,columnName ,columnType){
    console.log(tableName,columnName,"asdbd");
    const sql = `ALTER TABLE "${tableName}" ADD COLUMN "${columnName}" ${columnType};`;

    const { data, error } = await supabase.rpc("execute_sql", { query: sql });

    if (error) {
      console.error("Error adding column:", error.message);
    } else {
      console.log("Column added successfully:", data);
    }
}