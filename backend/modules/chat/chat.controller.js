require("dotenv").config();
const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

// 1. إنشاء غرفة محادثة بين الأم والدكتور
exports.createChatChannel = async (req, res) => {
  try {
    const { doctorId } = req.body; // بنستقبل الـ ID بتاع الدكتور اللي الأم هتشات معاه
    const motherId = req.user.id;   // الـ ID بتاع الأم الحالية اللي مسجلة دخول

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

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    // بننشئ معرف فريد للغرفة يجمع الـ IDs بتاعة الطرفين لمنع تكرار الغرف
    const channelId = `chat-${motherId}-${doctorId}`.toLowerCase().replace(/[^a-z0-9-_]/g, "_");

    // إنشاء الـ Channel من نوع 'messaging' وإضافة الطرفين كأعضاء
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

// 2. جلب كل غرف المحادثة النشطة لليوزر الحالي
exports.getUserChannels = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({
        success: false,
        message: "Stream configuration is missing on server!",
      });
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    // فلتر لجلب القنوات اللي اليوزر الحالي عضو فيها
    const filter = { members: { $in: [userId] } };
    const sort = [{ last_message_at: -1 }]; // ترتيب تنازلي حسب آخر رسالة

    const channels = await serverClient.queryChannels(filter, sort, {
      watch: true,
      state: true,
    });

    // استخراج البيانات المفيدة للـ Frontend
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

// 3. إرسال رسالة داخل غرفة محادثة معينة
exports.sendMessage = async (req, res) => {
  try {
    const { channelId, text } = req.body; // بنستقبل معرف الغرفة ونص الرسالة
    const senderId = req.user.id;         // الـ ID بتاع الشخص اللي بيبعت (الأم حالياً)

    if (!channelId || !text) {
      return res.status(400).json({
        success: false,
        message: "Channel ID and message text are required!",
      });
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    // الوصول للغرفة المحددة من نوع 'messaging'
    const channel = serverClient.channel("messaging", channelId);

    // إرسال الرسالة لـ GetStream
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