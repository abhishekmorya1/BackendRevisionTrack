const mongoose = require("mongoose"); 
// import the model
const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
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

                await Todo.findByIdAndDelete(id);

                res.status(200).json({
                    success: true,
                    message: "Entry delete successfully",
                });
    }
     catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
