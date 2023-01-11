const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
} = require('../controllers/posts');
const auth = require('../middleware/authorization');

// console.log('auth =', auth);

router.route('/').get(auth,getAllPosts).post(auth,createPost);
router.route('/:id').patch(auth,updatePost).delete(auth,deletePost);
router.route('/likePost/:id').patch(auth,likePost)

module.exports = router;