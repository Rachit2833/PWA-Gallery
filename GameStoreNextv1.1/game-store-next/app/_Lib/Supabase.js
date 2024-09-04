import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nwsfywcbwulcsggurrwc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53c2Z5d2Nid3VsY3NnZ3VycndjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMzkxNTksImV4cCI6MjAxMzYxNTE1OX0.8QzpCUrYRpGak8P101jTx3bHBl8CeWRUTN4pAxBdfCQ"
);

export default supabase;
