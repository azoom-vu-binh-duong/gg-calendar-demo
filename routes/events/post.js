import { insertEvent } from "../../helpers/googleService/calendar.js";

export default async (req, res) => {
  const eventData = req.body;

  try {
    const event = await insertEvent(eventData);
    res.send(event);
  } catch (error) {
    res.status(404).send(error);
  }
};
