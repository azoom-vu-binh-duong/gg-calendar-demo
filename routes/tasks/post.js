import { insertTask } from "../../helpers/googleService/tasks.js";

export default async (req, res) => {
  const taskData = req.body;

  try {
    const event = await insertTask(taskData);
    res.send(event);
  } catch (error) {
    res.status(404).send(error);
  }
};
