function status(request, response) {
  response.status(200).json({ key: "amo muito minha família" });
}

export default status;
