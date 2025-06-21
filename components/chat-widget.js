"use client";
import { sendToAI } from "@/app/actions";
import React, { useState } from "react";
import { capitalize } from "@/lib/utils";
import Markdown from 'react-markdown';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const prevMsgs = [...messages]
        setMessages((msgs) => [...msgs, { from: "user", text: input }]);
        setLoading(true);
        try {
            const response = await sendToAI(input, prevMsgs);
            setMessages((msgs) => [...msgs, { from: "bot", text: response }]);
        } catch (err) {
            setMessages((msgs) => [
                ...msgs,
                { from: "bot", text: "Error connecting to Gemini AI." },
            ]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="chat-widget-container">
            {open ? (
                <div className="chat-widget-popup content items-center">
                    <div className="chat-widget-header w-full">
                        <span>ChatBot</span>
                        <button
                            className="chat-widget-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                        >
                            <img className="icon"  src="/assets/MdiClose.svg"  width="24"  alt="Close"/>
                        </button>
                    </div>
                    <div className="chat-widget-body">
                        {messages.map((msg, idx) => 
                            <div key={idx} className={msg.from === "user" ? "chat-widget-msg-user" : "chat-widget-msg-bot"}>
                                <b>{capitalize(msg.from)}</b>: <Markdown>{msg.text}</Markdown>
                            </div>
                        )}
                        {loading && <div className="chat-widget-msg-bot">Thinking...</div>}
                    </div>
                    <form className="chat-widget-input-row flex gap-1" onSubmit={sendMessage}>
                        <input
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={loading}
                        />
                        <button className="btn" type="submit" disabled={loading || !input.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    className="chat-widget-button"
                    onClick={() => setOpen(true)}
                    aria-label="Open chat"
                >
                    💬
                </button>
            )}
        </div>
    );
}