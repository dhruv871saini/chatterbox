
### Project Overview

**Chatterbox** is a full-stack real-time chat application featuring user authentication, instant messaging, and online status tracking.<cite></cite>

### Architecture Flowchart

```mermaid
graph TB
    subgraph "Frontend - React"
        Login["Login Component"]
        Signup["Signup Component"]
        Slider["User List Sidebar"]
        Messages["Message Display"]
        Redux["Redux Store"]
    end
    
    subgraph "Backend - Node.js/Express"
        AuthRoutes["Auth Routes<br/>/api/v1/user"]
        MessageRoutes["Message Routes<br/>/api/v1/message"]
        AuthMiddleware["JWT Middleware"]
        UserController["User Controller"]
        MessageController["Message Controller"]
    end
    
    subgraph "Real-time Layer"
        SocketIO["Socket.IO Server"]
        UserSocketMap["User Socket Map"]
    end
    
    subgraph "Database"
        MongoDB["MongoDB"]
        UserModel["User Model"]
        MessageModel["Message Model"]
        ConversationModel["Conversation Model"]
    end
    
    Login -->|"POST /login"| AuthRoutes
    Signup -->|"POST /register"| AuthRoutes
    AuthRoutes --> UserController
    UserController --> UserModel
    UserModel --> MongoDB
    
    Slider -->|"GET /user"| AuthRoutes
    Messages -->|"POST /send/:id"| MessageRoutes
    Messages -->|"GET /:id"| MessageRoutes
    
    MessageRoutes --> AuthMiddleware
    AuthMiddleware --> MessageController
    MessageController --> MessageModel
    MessageController --> ConversationModel
    MessageModel --> MongoDB
    ConversationModel --> MongoDB
    
    MessageController -->|"emit newMessage"| SocketIO
    SocketIO --> UserSocketMap
    SocketIO -->|"real-time delivery"| Messages
    
    Login -->|"dispatch setAuthUser"| Redux
    Redux --> Slider
    Redux --> Messages
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB
    participant Redux
    
    User->>Frontend: Enter credentials
    Frontend->>Backend: POST /api/v1/user/login
    Backend->>MongoDB: Verify credentials
    MongoDB-->>Backend: User data
    Backend-->>Frontend: JWT cookie + user data
    Frontend->>Redux: dispatch setAuthUser
    Frontend->>User: Redirect to /home
```  

### Real-time Messaging Flow

```mermaid
sequenceDiagram
    participant Sender
    participant Frontend
    participant MessageController
    participant MongoDB
    participant SocketIO
    participant Receiver
    
    Sender->>Frontend: Send message
    Frontend->>MessageController: POST /api/v1/message/send/:id
    MessageController->>MongoDB: Save message & conversation
    MongoDB-->>MessageController: Saved
    MessageController->>SocketIO: getReceiverSocketId
    SocketIO-->>MessageController: socketId or undefined
    alt Receiver Online
        MessageController->>SocketIO: emit newMessage
        SocketIO->>Receiver: Real-time delivery
    end
    MessageController-->>Frontend: 201 Created
``` 

### Tech Stack

**Frontend:**
- React with Hooks (useState, useEffect, useSelector, useDispatch)
- Redux for state management
- React Router for navigation
- Axios for HTTP requests
- Socket.IO client for real-time communication
- React Hot Toast for notifications chatterbox:1-6 chatterbox:1-9 

**Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- Socket.IO for WebSocket connections
- JWT for authentication
- bcrypt for password hashing chatterbox:1-13 

### Key Features

1. **User Authentication**: Secure signup/login with JWT tokens stored in HTTP-only cookies chatterbox:32-37 
2. **Real-time Messaging**: Instant message delivery using Socket.IO chatterbox:19-26 
3. **User Search**: Filter users by name to start conversations chatterbox:31-40 
4. **Online Status**: Track which users are currently online chatterbox:22-26 
5. **Conversation History**: Persistent message storage with MongoDB chatterbox:3-14 

### Installation & Setup

```bash
# Clone repository
git clone https://github.com/dhruv871saini/chatterbox.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontends
npm install

# Start backend server
cd ../backend
npm start

# Start frontend (in separate terminal)
cd ../frontends
npm start
``` 

### API Endpoints

**Authentication:**
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/` - Get all users

**Messaging:**
- `POST /api/v1/message/send/:id` - Send message to user
- `GET /api/v1/message/:id` - Get conversation with user chatterbox:32-32 chatterbox:25-25 chatterbox:18-18 chatterbox:13-13 

### Data Models

**User Model**: Stores user credentials and profile information<cite></cite>

**Message Model**: Individual message with sender, receiver, and content chatterbox:3-22 

**Conversation Model**: Links two users with their message history chatterbox:3-14 
