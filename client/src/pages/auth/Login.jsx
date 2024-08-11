// import React, { useState, useRef, useEffect } from 'react';

// const Message = ({ message, isSender }) => (
//   <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
//     <div className={`flex ${isSender ? 'flex-row-reverse' : 'flex-row'} items-end`}>
//       <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//         {message.sender.charAt(0).toUpperCase()}
//       </div>
//       <div className={`mx-2 py-3 px-4 bg-white rounded-lg ${isSender ? 'rounded-br-none' : 'rounded-bl-none'} shadow`}>
//         <p className="text-sm">{message.content}</p>
//       </div>
//     </div>
//   </div>
// );

// const Login = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'John', content: 'Hey there!', timestamp: '10:00 AM' },
//     { id: 2, sender: 'You', content: 'Hi John, how are you?', timestamp: '10:01 AM' },
//     // { id: 3, sender: 'John', content: 'I'm doing great, thanks for asking!', timestamp: '10:02 AM' },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       setMessages([...messages, {
//         id: messages.length + 1,
//         sender: 'You',
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Chat Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
//           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//             J
//           </div>
//           <div className="ml-4">
//             <h2 className="font-semibold text-lg">John Doe</h2>
//             <p className="text-sm text-gray-500">Online</p>
//           </div>
//         </div>
//       </div>

//       {/* Message List */}
//       <div className="flex-1 overflow-y-auto px-4 py-4">
//         <div className="max-w-2xl mx-auto">
//           {messages.map((message) => (
//             <Message 
//               key={message.id} 
//               message={message} 
//               isSender={message.sender === 'You'}
//             />
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Message Input */}
//       <div className="bg-white border-t border-gray-200 px-4 py-4">
//         <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto flex">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded-r-full px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


export default function Login() {
  return (
    <div>
      <form></form>
    </div>
  )
}
