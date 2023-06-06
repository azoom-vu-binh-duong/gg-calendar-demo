import { getTasks } from "../../../helpers/googleService/tasks.js";

export default async (req, res) => {
  try {
    const tasklistId = req.params.tasklistId;
    const tasks = await getTasks();
    const tasksData = await tasks.tasks
      .list({
        tasklist: tasklistId,
      })
    const tasksDataItem = tasksData.data.items;
    res.send(tasksDataItem);
  } catch (error) {
    console.log(error);
  }
};
