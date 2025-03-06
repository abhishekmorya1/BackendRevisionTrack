// import the model
const Todo = require("../models/Todo");

// define route handler
exports.getTodo = async (req, res) => {
    try {
    //    fetch all todo items from database
       const todos = await Todo.find({});

    //    response 
       res.status(200)
       .json({
          success:true,
           data:todos,
           message:"Entire Todo data is fetched"
       })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: err.message,
        });
    }
} 

exports.getTodoById =  async (req,res) =>{
    try{
        // fetch the id
        const id=req.params.id;
    //    extract todo item by id
         const todo= await Todo.findById({_id:id})

        //  data for given id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No Data found with given id",
            })
        }
        // data for given id found
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fetched`
        })
    }
    catch(error){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: err.message,
        });
    }
}
