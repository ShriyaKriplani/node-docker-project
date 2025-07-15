import Todo from '../models/todo.js'
export const createTodo = async(req,res)=>{

    try
    {
    const {title,description} = req.body;

    if(!title || !description)
    {
        return res.status(403).json({
        success:false,
        error: true,
        message : `Please send title and description`
    })
    }
    // create todo 
    await Todo.create({
        title,
        description
    })
    return res.status(200).json({
        success:true,
        error: false,
        message : `todo created`
    })
}
catch (err){
    return res.status(500).json({
        success:false,
        error: true,
        message : `Error : ${err}`
    })
}
}

export const getTodo = async(req,res)=>{

    try
    {
    const todo = await Todo.find()
    return res.status(200).json({
        success:true,
        error: false,
        message : {todo}
    })
}
catch (err){
    return res.status(500).json({
        success:false,
        error: true,
        message : `Error : ${err}`
    })
}
}

export const updateTodo = async(req,res)=>{

    try
    {
    const todoId = req.params.todoId;
    const title = req.body;

    if(!todoId)
    {
        return res.status(403).json({
        success:false,
        error: true,
        message : `Please id`
    })
    }
    //find
    const todo = await Todo.findByIdAndUpdate(todoId,title,{new : true})
    // update logic
    return res.status(200).json({
        success:true,
        error: false,
        message : `todo updated : ${todo}`
    })
}
catch (err){
    return res.status(500).json({
        success:false,
        error: true,
        message : `Error : ${err}`
    })
}
}

export const deleteTodo = async(req,res)=>{

    try
    {
    const todoId = req.params.todoId;
    if(!todoId)
    {
        return res.status(403).json({
        success:false,
        error: true,
        message : `Please id`
    })
    }
    //find
    const todo = await Todo.findByIdAndDelete(todoId)
    // update logic
    return res.status(200).json({
        success:true,
        error: false,
        message : `todo deleted : ${todo}`
    })
}
catch (err){
    return res.status(500).json({
        success:false,
        error: true,
        message : `Error : ${err}`
    })
}
}