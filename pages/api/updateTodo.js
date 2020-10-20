import { getMinifiedRecord, table } from "./utils/Airtable";
import auth0 from "./utils/auth0";

const updateTodo = auth0.requireAuthentication(async (req, res) => {
  const { id, fields } = req.body;
  const {user} = await auth0.getSession(req);

  // We don't want to let users update todos to have blank descriptions.
  if (!fields.description) {
    res.statusCode = 400;
    res.json({ msg: "Cannot update todo to have a blank description" });
    return;
  }

  try {
    const updatedRecords = await table.update([{ id, fields }]);

    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

export default updateTodo;
