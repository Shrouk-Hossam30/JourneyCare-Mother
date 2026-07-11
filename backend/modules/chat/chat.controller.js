require("dotenv").config();
const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

exports.generateStreamToken = async (req, res) => {
  try {
    const userId = req.user && req.user._id
        ? req.user._id.toString()
        : "user_test_zaghloul_2026";

    if (!apiKey || !apiSecret) {
      return res.status(400).json({
        status: "error",
        message: "Stream API Key or Secret is missing!",
      });
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    
    await serverClient.upsertUser({
      id: userId,
      name: req.user ? req.user.name : "Zaghloul Test User", 
      role: "user",
    });

    
    const token = serverClient.createToken(userId);

    return res.status(200).json({
      status: "success",
      simulation: !req.user ? "Active (Testing Mode)" : "Inactive (Live Mode)",
      data: {
        userId,
        token,
        apiKey,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};