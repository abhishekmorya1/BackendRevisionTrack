const mongoose = require("mongoose");
const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
    try {
        // Fetch and clean ID
        let { id } = req.params;
        id = id.trim(); // Remove extra spaces or newline characters

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
            });
        }

        const { title, description } = req.body;

        // Update todo
        const todo = await Todo.findByIdAndUpdate(
            id, // Corrected: Directly pass the cleaned ID
            { title, description, updatedAt: Date.now() },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
            message: "Entry updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
