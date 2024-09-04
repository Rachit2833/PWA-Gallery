"use server";
import { revalidatePath } from "next/cache";
import { addNewEvent } from "./addNewEvent";
import { getSubjects } from "./getSubjects";
import { getTeachers } from "./getTeachers";
import { scheduleExtraClasses } from "./scheduleExtraClasses";
import { updateData, uploadAssignment } from "./uploadData";
import { uploadFile } from "./uploadFile";
import { auth, signIn, signOut } from "./auth";
import toast from "react-hot-toast";
import { redirect } from "next/dist/server/api-utils";
import { getClassAttendance } from "./getSubjectAttendance";
  function replaceBlankWithUnderscore(input) {
    return input.replace(/ /g, "_");
  }

export async function submitAssignment(formData) {
  try {
    const Subject = replaceBlankWithUnderscore(formData.get("Subject"));
    const subjects = await getClassAttendance(Subject);
    const student = subjects.filter((item) => item.student_id === 12345678);
    const file = formData.get("AssignmentFile");
    const AssignmentNumber = formData.get("Assignment_No");

    const uploadResult = await uploadFile(file);
    if (!uploadResult) {
      throw new Error("File upload failed");
    }
    const name = file.name;
    const FormData = {
      status: "Submitted",
      url: `https://nwsfywcbwulcsggurrwc.supabase.co/storage/v1/object/public/Profile/${name}`,
      submittedDate: new Date(),
    };

    const abc = await updateData(AssignmentNumber, FormData, 12345678, Subject);
    revalidatePath("/product");
  } catch (error) {
    console.error("Failed to submit assignment:", error);
    throw new Error("Assignment submission failed");
  }
}
export async function addClass(formData) {
  // Create a plain object from FormData
  const formDataObj = Object.fromEntries(formData.entries());

  // Create the new object with the additional time property
  const ob = {
    ...formDataObj,
    time: formData.get("FromTime") + "-" + formData.get("ToTime"),
  };
  delete ob["FromTime"];
  delete ob["ToTime"];
  delete ob["$ACTION_ID_46b0c120f6c64961e237175ba0168f8ee58b2785"];

  try {
    const res = await scheduleExtraClasses(ob);

    if (res.error) {
      throw new Error(res.error.message);
    }

    revalidatePath("/terms"); // Update this path to the one you need to revalidate
  } catch (error) {
    throw new Error("Class scheduling failed");
  }
}
export async function addEvent(formData) {
  // Create a plain object from FormData
  const formDataObj = Object.fromEntries(formData.entries());

  // Create the new object with the additional time property
  const ob = {
    ...formDataObj,
    Time: formData.get("FromTime") + "-" + formData.get("ToTime"),
  };
  delete ob["FromTime"];
  delete ob["ToTime"];

  try {
    const res = await addNewEvent(ob);

    if (res.error) {
      throw new Error(res.error.message);
    }

    revalidatePath("/terms"); // Update this path to the one you need to revalidate
  } catch (error) {
    throw new Error("Event scheduling failed");
  }
}
export async function syncClasses() {
  revalidatePath("/orders");
}
export async function addAssignment(formData) {
  try {
    const sel = formData.get("subject");
    const file = formData.get("AssignmentFile");

    const uploadResult = await uploadFile(file);
    if (!uploadResult) {
      throw new Error("File upload failed");
    }

    const url = `https://nwsfywcbwulcsggurrwc.supabase.co/storage/v1/object/public/Profile/${file.name}`;
    const subjects = await getSubjects();
    const sub = subjects.filter((item) => item.Name === sel);

    const newAssignment = {
      Subject: formData.get("subject"),
      AssignedDate: new Date().toISOString().split("T")[0],
      AssignmentNumber: formData.get("AssignmentNumber"),
      Topic: formData.get("Topic"),
      Url: url,
      dueDate: formData.get("DueDate"),
    };

    const assignData = sub[0].Assignment;
    assignData.push(newAssignment);
    await uploadAssignment(sel, assignData);
  } catch (error) {
    console.error("Failed to add assignment:", error);
    throw new Error("Assignment addition failed");
  }
}
export async function useSignIn(formData){
      
        await signIn("google", {
          redirectTo: formData.get("page") === "teacher" ? "/orders" : "/",
        });
         
}
export async function useSignOut() {
  await signOut("google", { redirectTo: "/" });
}