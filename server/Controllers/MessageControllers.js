const MessageModel = require("../Modules/Message");

const createMessage = async (req, res) => {
  const { chatId, text, senderId } = req.body;

  const message = new MessageModel({
    chatId,
    text,
    senderId,
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await MessageModel.find({ chatId });
    console.log(messages + "m");
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createMessage, getMessage };
