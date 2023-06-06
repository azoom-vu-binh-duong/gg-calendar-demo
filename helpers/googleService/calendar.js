import { google } from "googleapis";
import {
  googleAuthenticate,
  getCredential,
  saveCredential,
} from "./authentication.js";

export const getCalendar = async () => {
  let credential = await getCredential();
  if (!credential) {
    credential = await googleAuthenticate();
    saveCredential(credential);
  }
  return google.calendar({ version: "v3", auth: credential });
};

export const insertEvent = async (eventData) =>
  (await getCalendar()).events
    .insert({
      calendarId: "primary",
      requestBody: eventData,
    })
    .catch((err) => {
      console.log(err);
    });

// export const setPrivilegeWriter = async (account) =>
//   (await getCalendar()).acl
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
  (await getCalendar()).events
    .delete({
      calendarId: "primary",
      eventId: eventId,
    })
    .catch((err) => {
      console.log(err);
    });

export const updateEvent = async (eventId, eventData) => {
  (await getCalendar()).events
    .patch({
      calendarId: "primary",
      eventId: eventId,
      requestBody: eventData,
    })
    .catch((err) => {
      console.log(err);
    });
};
