import { google } from "googleapis";
import {
  googleAuthenticate,
  getCredential,
  saveCredential,
} from "./authentication.js";

export const getTasks = async () => {
  let credential = await getCredential();
  if (!credential) {
    credential = await googleAuthenticate();
    saveCredential(credential);
  }
  return google.tasks({ version: "v1", auth: credential });
};

export const insertTasklist = async (tasklistData) =>
  (await getTasks()).tasklists
    .insert({ requestBody: tasklistData })
    .catch((err) => {
      console.log(err);
    });

export const insertTask = async (taskData) =>
  (await getTasks()).tasks
    .insert({ tasklist: "MTE0NzY0MDIwNzIyOTcwMDQ4NTM6MDow", requestBody: taskData })
    .catch((err) => {
      console.log(err);
    });

// export const setPrivilegeWriter = async (account) =>
//   (await getTasks()).acl
//     .insert({
//       calendarId: "primary",
//       requestBody: {
//         role: "owner",
//         scope: {
//           type: "user",
//           value: account,
//         },
//       },
//     })
//     .catch((err) => {
//       console.log(err);
//     });

export const deleteEvent = async (eventId) =>
  (await getTasks()).events
    .delete({
      calendarId: "primary",
      eventId: eventId,
    })
    .catch((err) => {
      console.log(err);
    });

export const updateEvent = async (eventId, eventData) => {
  (await getTasks()).events
    .patch({
      calendarId: "primary",
      eventId: eventId,
      requestBody: eventData,
    })
    .catch((err) => {
      console.log(err);
    });
};
