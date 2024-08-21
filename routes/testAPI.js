import express from 'express';
var router = express.Router();

router.get('/', function(res) {
    res.send('API is working properly');
});

export default router;
