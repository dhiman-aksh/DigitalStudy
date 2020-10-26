const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/index', (req, res) => {
    res.render('index');
})

router.get('/faq', (req, res) => {
    res.render('faq');
})

router.get('/student_ui', (req, res) => {
    res.render('student_ui');
})

router.get('/teacher_ui', (req, res) => {
    res.render('teacher_ui');
})


module.exports = router;

