const mongoose = require('mongoose');
const Post = require('../model/posts');


const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({success:false,message:error.message})
    }
}
const createPost = async (req,res)=>{
    const post = req.body;
    // const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        const posts = await Post.create(post);
        res.status(201).json(posts);
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
        const updatedPost = await Post.findByIdAndUpdate(_id,post,{new:true})
        res.status(201).json(updatedPost);
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
       res.status(201).json(deletePost);
    } catch (error) {
        return res.status(404).json('no post with that id')
    }
}

const likePost = async (req, res) => {
    const { id:_id } = req.params;
    console.log('id = ',_id);
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`No post with id: ${id}`);
    
    try {
        const post = await Post.findById(_id);
        console.log('post =',post);
        const updatedPost = await Post.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
        // console.log('updatedPost = ',updatedPost);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
}