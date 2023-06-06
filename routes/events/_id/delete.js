import { deleteEvent } from "../../../helpers/googleService/calendar.js";

export default async (req, res) => {
  const eventId = req.params.id;

  try {
    await deleteEvent(eventId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send(error);
  }
};
