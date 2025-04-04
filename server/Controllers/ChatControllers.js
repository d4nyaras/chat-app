const ChatModel = require("../Modules/Chat");

// Create a new chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = new ChatModel({ members: [firstId, secondId] });
    const response = await newChat.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all chats for a user
const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userChats = await ChatModel.find({ members: userId });
    // await ChatModel.find({
    //   members:{$in [ userId]}
    // })

    res.status(200).json(userChats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await ChatModel.find({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createChat, findUserChats, findChat };
