import { getTasks } from "../../helpers/googleService/tasks.js";

export default async (req, res) => {
  try {
    const tasks = await getTasks();
    const tasklistsResponse = await tasks.tasklists.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      orderBy: "startTime",
    });
    const tasklistsData = tasklistsResponse.data.items;
    res.send(tasklistsData);
  } catch (error) {
    res.status(404).send(error);
  }
};
