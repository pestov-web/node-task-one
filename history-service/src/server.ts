import app from "./app";

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`History service running on port ${PORT}`);
});
