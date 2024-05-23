import express from 'express';
import Server from 'socket.io';
import http from 'http';



const app = express();


// socket connection
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : process.env.FRONTEND_URL,
        Credentials : true
    }
})



// socket running at http://localhost:8080

// online user
const onlineUser = new Set();


io.on('connection', async (socket) => {
    console.log("connect User", socket.id);

    const token = socket.handshake.auth.token

    // current user details
    const user = await getUserDetailsFromToken(token);

    // create a room
    socket.join(user?._id.toString());
    onlineUser.add(user?._id.toString());


    io.emit('onlineUser', Array.from(onlineUser));


    socket.on('message-page', async (userId) => {
        console.log('userId', userId);
        const userDetails = await UserModel.findById(userId).select("-password");


        const payload = {
            _id : userDetails?._id,
            name : userDetails?.name,
            email : userDetails?.email,
            profile_pic : userDetails?.profile_pic,
            online : onlineUser.has(userId)
        }

        socket.emit('message-user', payload);


        // get previous message 
        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                { sender : user?._id, receiver : userId },
                { sender : userId, receiver : user?._id }
            ]
        }).populate('messages').sort({ updateAt : -1 });

        socket.emit('message', getConversationMessage?.message || [])
    })
})