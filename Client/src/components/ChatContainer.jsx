import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesDummyData]);

  return selectedUser ? (
    <div className="h-full flex flex-col overflow-y-auto relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 sticky top-0 z-40 mx-4 border-b border-stone-500">
        <img
          src={selectedUser?.profileImage || assets.profile_martin}
          alt={`${selectedUser?.name || "User"} profile`}
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser?.name || "Martin Johnson"}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back to user list"
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="max-md:hidden max-w-5"
        />
      </div>
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messagesDummyData.map((msg) => (
          <div
            key={msg.id || msg.createdAt} // Use unique ID if available
            className={`flex items-end gap-2 mb-4 ${
              msg.senderId === "680f5116f10f3cd28382ed02"
                ? "justify-end"
                : "flex-row-reverse justify-end"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt="Chat image"
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all bg-violet-500/30 text-white ${
                  msg.senderId === "680f5116f10f3cd28382ed02"
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f5116f10f3cd28382ed02"
                    ? assets.avatar_icon
                    : selectedUser?.profileImage || assets.profile_martin
                }
                alt="User avatar"
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Box */}
      <div className="sticky bottom-0 flex items-center gap-3 p-3 bg-gray-800/80 z-10">
        <input
          type="text"
          placeholder="Send a message"
          className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-gray-700"
        />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img
            src={assets.gallery_icon}
            alt="Upload image"
            className="w-5 cursor-pointer"
          />
        </label>
        <img
          src={assets.send_button}
          alt="Send message"
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center  gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="App logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
