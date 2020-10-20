import { table } from "./utils/Airtable";
import auth0 from "./utils/auth0";

const createTodo = auth0.requireAuthentication(async (req, res) => {
  const { description } = req.body;
  const { user } = await auth0.getSession(req);

  // We don't want to let users create todos without a description.
  if (!description) {
    res.statusCode = 400;
    res.json({ msg: "Cannot create todo with blank description" });
    return;
  }

  try {
    const createdRecords = await table.create([{ fields: { description, userId: user.sub } }]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: {
        completed: false,
        ...createdRecords[0].fields,
      }
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});

export default createTodo;
