import { insertTasklist } from "../../helpers/googleService/tasks.js";

export default async (req, res) => {
  const tasklistData = req.body;

  try {
    const tasklist = await insertTasklist(tasklistData);
    res.send(tasklist);
  } catch (error) {
    res.status(404).send(error);
  }
};
