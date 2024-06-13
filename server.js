import express from express
import mongoose from "mongoose";
import cors from cors
import User from "./Model/searchUser"

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/searchApi")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Connection Error: ", err));

function calculateAge(birthdate) {
  const today = new Date();
  const birthDateObj = new Date(birthdate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
}

app.post("/adduser", async (req, res) => {
  try {
    console.log("req.body--->", req.body);
    const userData = await User.create(req.body);
    console.log("user", userData);
    return res.json(userData);
  } catch (error) {
    console.log("error--->", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/searchUsers", async (req, res) => {
  let query = {};

  if (req.query.searchString) {
    const searchString = req.query.searchString;
    const regex = new RegExp(searchString, "i"); // 'i' makes the regex case-insensitive
    query.$or = [{ firstName: regex }, { lastName: regex }, { email: regex }];
  }

  // Search by city
  if (req.query.city) {
    query["addresses.city"] = req.query.city;
  }

  try {
    const users = await User.find(query).exec();

    // Filter users by age if age criteria are provided
    let usersWithAge = users.map((user) => ({
      ...user.toObject(),
      age: calculateAge(user.birthdate),
    }));

    if (req.query.ageGte) {
      usersWithAge = usersWithAge.filter(
        (user) => user.age >= parseInt(req.query.ageGte, 10)
      );
    }

    if (req.query.ageLte) { 
      usersWithAge = usersWithAge.filter(
        (user) => user.age <= parseInt(req.query.ageLte, 10)
      );
    }

    res.json(usersWithAge);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
