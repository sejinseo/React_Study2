const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // seo sejin@naver.com 이렇게 쳤을때 빈칸을 없애주는 역할
        unique: 1 
        // 유니크 값 주기
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        // 관리자 설정
        type: Number,
        default: 0
    },
    image: String,
    token: {
        // 유효성 관리 할 수 있게
        type: String
    },
    tokenExp: {
        // 토큰 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
// 다른 곳에서도 쓸 수 있게 exports 해줌