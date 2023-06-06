import { updateEvent } from "../../../helpers/googleService/calendar.js";

export default async (req, res) => {
  const eventData = req.body;
  const eventId = req.params.id;

  try {
    const event = await updateEvent(eventId, eventData);
    res.send(event);
  } catch (error) {
    res.status(404).send(error);
  }
};
