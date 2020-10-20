import { table } from "./utils/Airtable";

const createTodo = async (req, res) => {
  const { description } = req.body;

  // We don't want to let users create todos without a description.
  if (!description) {
    res.statusCode = 400;
    res.json({ msg: "Cannot create todo with blank description" });
    return;
  }

  try {
    const createdRecords = await table.create([{ fields: { description } }]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

export default createTodo;
