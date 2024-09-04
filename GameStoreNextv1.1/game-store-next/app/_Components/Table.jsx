import React, { useState } from 'react';
import supabase from '../_Lib/Supabase';

const CreateTable = ({ isSubjectSelected, setIsSubjectSelected }) => {
   const [columns, setColumns] = useState([
      { name: 'student_id', type: 'int8 REFERENCES "Student"(id)' },
   ]);

   const addColumnToState = () => {
      setColumns([...columns, { name: '', type: '' }]);
   };

   const handleColumnChange = (index, field, value) => {
      const newColumns = columns.slice();
      newColumns[index][field] = value;
      setColumns(newColumns);
   };

   const createTable = async () => {
      const columnDefinitions = columns.map(col => `"${col.name}" ${col.type}`).join(', ');

      const sql = `
      -- Create the new table
      CREATE TABLE IF NOT EXISTS "${isSubjectSelected}" (
        ${columnDefinitions}
      );

      -- Enable Row Level Security
      ALTER TABLE "${isSubjectSelected}" ENABLE ROW LEVEL SECURITY;

      -- Allow all users to SELECT
      CREATE POLICY select_policy
      ON "${isSubjectSelected}"
      FOR SELECT
      USING (true);

      -- Allow all users to INSERT
      CREATE POLICY insert_policy
      ON "${isSubjectSelected}"
      FOR INSERT
      WITH CHECK (true);

      -- Allow all users to UPDATE
      CREATE POLICY update_policy
      ON "${isSubjectSelected}"
      FOR UPDATE
      USING (true);

      -- Allow all users to DELETE
      CREATE POLICY delete_policy
      ON "${isSubjectSelected}"
      FOR DELETE
      USING (true);
    `;

      const { data, error } = await supabase.rpc('execute_sql', { query: sql });

      if (error) {
         console.error('Error creating table and applying policies:', error.message);
      } else {
         console.log('Table created and policies applied successfully:', data);
      }
   };

   const addColumnToTable = async (columnName, columnType) => {
      const sql = `ALTER TABLE "${isSubjectSelected}" ADD COLUMN "${columnName}" ${columnType};`;

      const { data, error } = await supabase.rpc('execute_sql', { query: sql });

      if (error) {
         console.error('Error adding column:', error.message);
      } else {
         console.log('Column added successfully:', data);
      }
   };

   return (
      <div>
         <h1>Create New Table</h1>
         <input
            type="text"
            value={isSubjectSelected}
            onChange={(e) => setIsSubjectSelected(e.target.value)}
            placeholder="Table Name"
         />

         {columns.map((column, index) => (
            <div key={index}>
               <input
                  type="text"
                  value={column.name}
                  onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                  placeholder="Column Name"
               />
               <input
                  type="text"
                  value={column.type}
                  onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                  placeholder="Column Type"
               />
            </div>
         ))}

         <button onClick={addColumnToState}>Add Column</button>
         <button onClick={createTable}>Create Table</button>

         <h2>Add Column to Existing Table</h2>
         <input
            type="text"
            placeholder="New Column Name"
            onChange={(e) => setColumns([{ name: e.target.value, type: columns[0].type }])}
         />
         <input
            type="text"
            placeholder="New Column Type"
            onChange={(e) => setColumns([{ name: columns[0].name, type: e.target.value }])}
         />
         <button onClick={() => addColumnToTable(columns[0].name, columns[0].type)}>Add Column to Table</button>
      </div>
   );
};

export default CreateTable;