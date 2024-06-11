const mongoose=require("mongoose")


// Define user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Simple email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Simple 10-digit number validation
                return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        }
    },
    birthdate: {
        type: Date
    },
    addresses: [{
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String
        },
        pincode: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    // Simple pincode validation
                    return /^\d{4,6}$/.test(value);
                },
                message: props => `${props.value} is not a valid pincode!`
            }
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        type: {
            type: String,
            // enum: ['Home', 'Office'],
            required: true
        }
    }]
});

// Create User model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;





