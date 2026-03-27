export default async function handler(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing user_id (q)" });
    }

    // ⏳ EXPIRY SYSTEM (15 days)
    const startDate = new Date("2026-03-27"); // 👈 aaj ki date daal
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 15) {
      return res.status(403).json({
        error: "API Expired ❌",
        message: "This API is no longer available. Contact owner."
      });
    }

    // Original API call
    const response = await fetch(`https://tg-to-num-six.vercel.app/?key=rootxsuryansh&q=${q}`);
    const data = await response.json();

    // 🔥 REMOVE unwanted fields
    delete data.credit;
    delete data.owner;
    delete data.admin;
    delete data.help_group;     // ❌ remove channel
    delete data.your_usage;     // ❌ remove limit system

    // 👑 CUSTOM DATA
    data.owner = "@ZyroX9";
    data.credit = "@ZyroXZone";
    data.note = "Api BY Zyro 🚀";

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
