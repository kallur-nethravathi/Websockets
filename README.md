WebSocket Collaborative Counter PoC with Subscriptions
A proof-of-concept demonstrating real-time collaborative counter updates using WebSockets with a subscription model. Clients can subscribe to one of two counters (counterA or counterB) and receive updates only for their chosen counter. Built with Node.js, the ws library, and Express.
✨ Features

Real-time Counter Synchronization: Updates are reflected instantly for subscribed clients.
Subscription Model: Clients can choose to receive updates for either counterA or counterB.
Interactive Web Interface: Includes a dropdown to select and subscribe to a counter, with buttons to increment (+1) or decrement (-1) the counter.
Efficient Broadcasting: The WebSocket server sends updates only to clients subscribed to the relevant counter.

🛠️ Technologies

Node.js: Server-side runtime environment.
WebSocket (ws): Library for implementing the WebSocket server.
Express: Serves the static HTML/JavaScript client.
JavaScript/HTML: Handles client-side logic and the user interface.

📋 Prerequisites
Before you begin, ensure you have the following:

Node.js (v16 or later recommended)
Git for cloning the repository
Basic understanding of JavaScript and WebSockets

🚀 Setup
Follow these steps to get the project up and running:

Clone the Repository:
git clone <your-repo-url>
cd websocket-counter-poc


Install Dependencies:
npm install


Run the Server:
node server.js


Access the Application:

Open http://localhost:8080 in multiple browser tabs.
Select a counter (counterA or counterB) from the dropdown and click Subscribe.
Use the +1 or -1 buttons to update the counter. Only clients subscribed to the same counter will see the updates.



🔍 How It Works

The server maintains two counters (counterA and counterB) and tracks client subscriptions using a Map.
Clients connect via WebSocket (ws://localhost:8080) and send a subscription request (e.g., { action: 'subscribe', channel: 'counterA' }).
Upon subscription, the server sends the current counter value to the client.
When a client sends an increment or decrement action, the server updates the relevant counter and broadcasts the new value only to clients subscribed to that counter.
Each client updates its UI to display the counter value for its subscribed channel.


