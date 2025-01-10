import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create SocketContext
const SocketContext = createContext();

// Provide the Socket connection throughout the app
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [id,setid]=useState()
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        socket.on("userid",(data)=>{
            setid(data)
        })
    //  setid(sessionStorage.getItem("userid"))
        // Create socket connection when the app starts
        const newSocket = io('http://localhost:8000/mySpace', {
            auth: {
                token: id
            }
        });
        console.log(newSocket)
        newSocket.on('connect', (data) => {
            console.log("socket Connected")
        })
        newSocket.on('disconnect', (data) => {
            console.log("socket DisConnected")
        })
       
        setSocket(newSocket);
        // Cleanup the socket when the app unmounts
        return () => {
            newSocket.off('connect');
            newSocket.off('disconnect');
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
