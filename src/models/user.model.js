const mongoose = require("mongoose");

const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true},
        phonenumber: { type: Number, required: true}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


userSchema.pre("save", function(next) { 
    if (!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    });
    
});

userSchema.methods.checkPassword = function(password) {
    return new Promise((res, rej) => {
        bcrypt.compare(password, this.password, function(err, same) {
            if(err) return rej(err);
    
            return res(same);
        });
    });
}



module.exports = mongoose.model("user", userSchema); 
