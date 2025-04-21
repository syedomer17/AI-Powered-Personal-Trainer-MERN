# 🏋️‍♂️ AI-Powered Personal Trainer

An intelligent fitness companion designed to personalize your workout experience. Built with the **MERN stack**, this app leverages **AI capabilities** to generate customized workout plans, provide real-time feedback, and track progress effortlessly.

---

## 🚀 Features

✅ **AI-Generated Workout Plans** – Tailored routines based on user fitness levels and goals.  
✅ **Real-Time Exercise Feedback** – AI-driven insights to improve form and performance.  
✅ **Progress Tracking** – Visualize your fitness journey with interactive analytics.  
✅ **Personalized Recommendations** – Adaptive training suggestions to maximize results.  
✅ **User-Friendly Dashboard** – Clean and modern UI for seamless navigation.  
✅ **Workout History** – Keep track of past workouts and improvements.  
✅ **Customizable Goals** – Set fitness goals and get AI-driven suggestions.  
✅ **Nutrition Guidance** – AI-powered diet recommendations to complement workouts.  
✅ **Community Support** – Engage with other fitness enthusiasts and share progress.  

---

## 🛠 Tech Stack

| **Technology** | **Usage** |
|--------------|----------|
| React | Frontend library |
| Tailwind CSS | Styling & UI components |
| Node.js | Backend runtime |
| Express.js | Server-side framework |
| MongoDB | NoSQL database |
| Gemini API | AI-driven insights |
| JWT | Authentication |
| Cloudinary | Image & video storage |

### Frontend:
- **React** (with Vite) – Fast frontend development
- **react-router-dom** – Client-side navigation
- **Framer Motion** – Smooth animations
- **GSAP** – Advanced animations
- **React-Toastify** – Beautiful notifications
- **Axios** – API requests
- **Tailwind CSS** – Modern styling

### Backend:
- **Node.js** – Backend runtime
- **Express.js** – Server-side framework
- **MongoDB & Mongoose** – NoSQL database & modeling
- **bcrypt** – Password hashing
- **config** – Configuration management
- **cors** – Cross-Origin Resource Sharing
- **express-rate-limit** – API rate limiting
- **jsonwebtoken (JWT)** – Secure authentication tokens
- **nodemailer** – Email handling
- **nodemon** – Auto-restarting server

---

## 📦 Installation

```bash
# Clone the repository
git clone git@github.com:syedomer17/AI-Powered-Personal-Trainer-MERN.git

# Navigate to the project directory
cd AI-Powered-Personal-Trainer-MERN

# Install dependencies for the backend
cd server
npm install

# Start the backend server
npm start

# Install dependencies for the frontend
cd ../client 
npm install

# Start the frontend server
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file in the backend directory and add:

```
PORT=8080
DB_URL="mongodb url"
EMAIL="Your email"
Password="your passowrd"
JWT_SECRET=""
SERVER_URL="http://localhost:PORT"
```

---

## 📜 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/getall` | Fetches all users |
| POST | `/emailverify/:token` | Verify email by token |
| GET | `/getbyid/:id` | Fetches user by ID |
| POST | `/register` | Registers a new user |
| POST | `/login` | Logs in a user and returns a token |
| DELETE | `/deletebyid/:id` | Deletes a user by ID |
| PUT | `/api/user/update` | Updates user information |

---

## 📌 Future Enhancements

- 🏆 AI-powered voice coaching
- 📊 Advanced progress visualization
- 📅 Social workout challenges
- 🎥 Video workout guides
- 🔔 Smart workout reminders
- 📱 Mobile app version
- 🏋️‍♀️ Integration with wearable fitness devices

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a PR or open an issue.

---

## 📜 License

This project is licensed under the MIT License.
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 🔗 Connect with Me

👤 **syedomer17**  
📧 syedomerali2006@gmail.com  
🔗 [GitHub](https://github.com/syedomer17) | [LinkedIn](https://www.linkedin.com/in/syed-omer-ali-b73501324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app )

---

🚀 *Get ready to transform your workouts with AI!* 💪
