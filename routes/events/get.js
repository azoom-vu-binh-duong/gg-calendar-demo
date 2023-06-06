import { getCalendar } from "../../helpers/googleService/calendar.js";

export default async (req, res) => {
  try {
    const calendar = await getCalendar();
    const calendarData = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = calendarData.data.items;
    res.send(events);
  } catch (error) {
    res.status(404).send(error);
  }
};
