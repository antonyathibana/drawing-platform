# Real-Time Collaborative Drawing Web Application

A simple, beginner-friendly web application that allows two users to draw collaboratively in real-time using room codes. Perfect for college mini projects and viva presentations.

## 🎨 Features

- **Real-time Collaboration**: Two users can draw together simultaneously
- **Room-based System**: Use 6-digit room codes to connect users
- **Clean Interface**: Simple, professional UI design
- **Cross-platform**: Works on desktop and mobile devices
- **No Database Required**: All data is transmitted in real-time
- **Well-commented Code**: Easy to understand for viva preparation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Drawing Engine**: HTML Canvas API
- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.IO (WebSockets)
- **Styling**: Custom CSS with responsive design

## 📁 Project Structure

```
draw platform/
├── server.js              # Express + Socket.IO server
├── package.json           # Project dependencies
├── README.md              # This file
└── public/
    ├── index.html         # Main application page
    ├── style.css          # Application styling
    └── script.js          # Client-side JavaScript
```

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd "/Users/antonyadith/Desktop/draw platform"
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Open the same URL in another browser window/tab for testing

## 📱 How to Use

### For Students (Viva Explanation)

1. **Home Page**:
   - Enter a 6-digit room code (e.g., 123456)
   - Or click "Generate Random Room Code"
   - Click "Join Room"

2. **Drawing Page**:
   - Use your mouse to draw on the canvas
   - Your drawings appear in real-time on your friend's canvas
   - Use "Clear Canvas" to erase all drawings
   - "Back to Home" returns to the main page

3. **Collaboration**:
   - Share your room code with a friend
   - Both users enter the same code
   - Start drawing simultaneously!

## 🔧 Code Explanation (For Viva)

### Backend (server.js)
- **Express.js**: Creates HTTP server and serves static files
- **Socket.IO**: Handles real-time WebSocket connections
- **Room Management**: Users join specific rooms using codes
- **Data Broadcasting**: Server forwards drawing data to all users in same room

### Frontend (public/)
- **index.html**: Main application structure with two pages (home and drawing)
- **style.css**: Responsive design with gradient backgrounds and modern styling
- **script.js**: Client-side logic including:
  - Canvas drawing functions
  - Socket.IO event handling
  - Room management
  - Touch support for mobile devices

### Key Technologies Explained

1. **HTML5 Canvas**: Drawing surface for creating graphics and interactive drawings
2. **WebSockets**: Enables real-time, bidirectional communication between client and server
3. **Socket.IO**: Library that simplifies WebSocket usage and handles fallbacks
4. **Room System**: Users are grouped into virtual rooms for isolated collaboration

## 🎯 Functional Requirements Met

- ✅ Homepage with project title and room code input
- ✅ Drawing canvas with mouse/touch support
- ✅ Real-time drawing synchronization
- ✅ Two-user room system
- ✅ No login or database required
- ✅ Clean, minimal UI design
- ✅ Mobile and desktop compatibility
- ✅ Clear canvas functionality
- ✅ Well-structured, commented code

## 🔬 Testing Instructions

1. **Start the server** as described above
2. **Open two browser windows** to `http://localhost:3000`
3. **Test the flow**:
   - Generate or enter a room code in both windows
   - Click "Join Room" in both
   - Draw in one window - see it appear in the other
   - Test the "Clear Canvas" button
   - Test the "Back to Home" functionality

## 🎓 Academic Value

This project demonstrates:
- **Client-Server Architecture**: Understanding of web application structure
- **Real-time Communication**: WebSockets and Socket.IO implementation
- **Canvas API**: HTML5 graphics programming
- **Event-driven Programming**: Handling user interactions and network events
- **Responsive Design**: CSS media queries and flexible layouts
- **Modern JavaScript**: ES6+ features and async programming

## 🐛 Troubleshooting

- **Port already in use**: Change the PORT in server.js or kill the process using port 3000
- **Canvas not responding**: Check browser console for JavaScript errors
- **Drawing not syncing**: Verify both users are in the same room code
- **Mobile issues**: Ensure touch events are enabled and canvas is properly sized

## 📝 Code Comments

All code files contain detailed comments explaining:
- Function purposes
- Event handling mechanisms
- Data flow processes
- Socket.IO event management
- Canvas drawing operations

This makes the code perfect for viva preparation and academic review.

---

**Created for College Mini Project**  
*Real-Time Collaborative Drawing Web Application Using Room Code*
# drawing-platform
# drawing-platform
