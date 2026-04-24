function validateBody(req, res, next) {
  const { data } = req.body;

  if (data === undefined || data === null) {
    return res.status(400).json({ error: "request body must include a 'data' field" });
  }

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "'data' must be an array of strings" });
  }


  req.body.data = data.map((item) =>
    typeof item === "string" ? item : String(item)
  );

  next();
}

module.exports = { validateBody };