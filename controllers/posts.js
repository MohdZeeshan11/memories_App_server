const mongoose = require('mongoose');
const Post = require('../model/posts');


const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({success:true,posts});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}
const createPost = async (req,res)=>{
    const post = req.body;
    try {
        const posts = await Post.create(post);
        res.status(201).json({success:true,posts});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}
const updatePost = async (req,res) =>{
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json('no post with that id')

    try {
        const updatePost = await Post.findByIdAndUpdate(_id,post,{new:true})
        res.status(201).json({success:true,updatePost});
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
    
}
const deletePost = async (req,res) =>{
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json('no post with that id')

    try {
       const deletePost =  await Post.findByIdAndRemove(_id);
    //    console.log('deletePost = ',deletePost);
       res.status(201).json({success:true,deletePost});
    } catch (error) {
        return res.status(404).json('no post with that id')
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}