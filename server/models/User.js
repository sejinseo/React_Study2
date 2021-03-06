const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
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

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')) {

        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
    });
    } else {
        next()
    }

})

userSchema.methods.comparePassword = function (plainPassword, cb) {

    // plainPassword 1234567  암호화된 비밀번호 !!#$!#$!#asdf234
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
            cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    user._id
    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decode) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decode, "token": token}, function(err, user){

            if(err) return cb(err);
            cb(null, user)
        })
    })



}

const User = mongoose.model('User', userSchema)

module.exports = { User }
// 다른 곳에서도 쓸 수 있게 exports 해줌