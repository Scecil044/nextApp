import { useEffect, useState } from "react";

export default function Chat() {
    

  return (
    <div>
      {/* Chat header */}
      <div className="w-full min-h-16 shadow-md shadow-indigo-800 p-2">
        <div className="flex flex-col gap-1">
          <div className="rounded-full text-white bg-blue-700 h-12 w-12 flex items-center justify-center">You</div>
          <h3 className="text-xs ml-1">Online</h3>
        </div>
      </div>
      {/* main container */}
      <section className="flex flex-col gap-3 p-5 bg-gray-100 h-screen">
        <div className="flex justify-start">
          <div className="flex gap-2">
            <div className="rounded-full h-10 w-10 shadow-md flex items-center justify-center text-lg bg-gray-200">Y</div>
            <div className="max-w-xs md:max-w-md bg-white rounded-lg shadow-md p-3">
              <p className="text-gray-800">Your chats will appear in this section. Unless otherwise, this is it</p>
              <span className="text-xs text-gray-500 mt-1 block">10:00 AM</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex gap-1">
            <div className="max-w-xs md:max-w-md bg-blue-500 rounded-lg shadow-md p-3">
              <p className="text-white">sent messages will bbe listed in this section because i decided so</p>
              <span className="text-xs text-blue-100 mt-1 block">10:01 AM</span>
            </div>
            <div className="rounded-full h-10 w-10 shadow-md flex items-center justify-center text-lg bg-gray-200">M</div>
          </div>
        </div>
      </section>
      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form onSubmit="" className="max-w-2xl mx-auto flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-full px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
