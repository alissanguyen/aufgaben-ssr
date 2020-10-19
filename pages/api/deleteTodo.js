import { getMinifiedRecord, table } from "./utils/airTable";

const deleteTodo = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

export default deleteTodo;
