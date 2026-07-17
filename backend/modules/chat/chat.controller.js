  require("dotenv").config();
  const { StreamChat } = require("stream-chat");

  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;


  const streamOptions = { timeout: 10000 };

  
  exports.createChatChannel = async (req, res) => {
    try {
      const { doctorId } = req.body;
      const motherId = req.user.id;

      if (!doctorId) {
        return res.status(400).json({
          success: false,
          message: "Doctor ID is required to start a chat!",
        });
      }

      if (!apiKey || !apiSecret) {
        return res.status(500).json({
          success: false,
          message: "Stream configuration is missing on server!",
        });
      }

      const serverClient = StreamChat.getInstance(apiKey, apiSecret, streamOptions);

      const channelId = `chat-${motherId}-${doctorId}`.toLowerCase().replace(/[^a-z0-9-_]/g, "_");

      const channel = serverClient.channel("messaging", channelId, {
        created_by_id: motherId,
        members: [motherId, doctorId],
      });

      await channel.create();

      return res.status(200).json({
        success: true,
        message: "Chat channel established successfully",
        data: {
          channelId,
          channelType: "messaging",
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  
  exports.getUserChannels = async (req, res) => {
    try {
      const userId = req.user.id;

      if (!apiKey || !apiSecret) {
        return res.status(500).json({
          success: false,
          message: "Stream configuration is missing on server!",
        });
      }

      const serverClient = StreamChat.getInstance(apiKey, apiSecret, streamOptions);

      const filter = { members: { $in: [userId] } };
      const sort = [{ last_message_at: -1 }];

      const channels = await serverClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });

      const formattedChannels = channels.map((c) => ({
        id: c.id,
        type: c.type,
        memberCount: c.state.watcher_count,
        lastMessage: c.state.messages[c.state.messages.length - 1]?.text || "No messages yet",
      }));

      return res.status(200).json({
        success: true,
        data: formattedChannels,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  
  exports.sendMessage = async (req, res) => {
    try {
      const { channelId, text } = req.body;
      const senderId = req.user.id;

      if (!channelId || !text) {
        return res.status(400).json({
          success: false,
          message: "Channel ID and message text are required!",
        });
      }

      const serverClient = StreamChat.getInstance(apiKey, apiSecret, streamOptions);

      const channel = serverClient.channel("messaging", channelId);

      const response = await channel.sendMessage({
        text: text,
        user_id: senderId,
      });

      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        data: {
          messageId: response.message.id,
          text: response.message.text,
          senderId: response.message.user.id,
          createdAt: response.message.created_at,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };