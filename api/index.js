export default async function handler(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing user_id (q)" });
    }

    // Original API call
    const response = await fetch(`https://tg-to-num-six.vercel.app/?key=rootxsuryansh&q=${q}`);
    const data = await response.json();

    // 🔥 Modify response
    delete data.credit;
    delete data.owner;
    delete data.admin;

    // 👇 TERA CUSTOM
    data.owner = "@ZyroX9";
    data.credit = "@ZyroXZone";
    data.note = "Api BY Zyro 🚀";

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
