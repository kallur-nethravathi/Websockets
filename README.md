# WebSocket Collaborative Counter PoC with Subscriptions

A proof-of-concept demonstrating real-time collaborative counter updates using WebSockets with a subscription model. Clients can subscribe to one of two counters (`counterA` or `counterB`) and receive updates only for their chosen counter. Built with Node.js, the `ws` library, and Express.

## Features
- Real-time counter synchronization for subscribed clients.
- Subscription model: clients choose to receive updates for `counterA` or `counterB`.
- Web interface with dropdown to select and subscribe to a counter, plus buttons to increment (+1) or decrement (-1).
- Lightweight WebSocket server that broadcasts updates to subscribed clients only.

## Technologies
- **Node.js**: Server runtime environment.
- **WebSocket (`ws`)**: Library for WebSocket server implementation.
- **Express**: Serves the static HTML/JavaScript client.
- **JavaScript/HTML**: Client-side logic and UI.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended).
- [Git](https://git-scm.com/) for cloning the repository.
- Basic understanding of JavaScript and WebSockets.

## Setup
1. **Clone the Repository**:

   git clone <your-repo-url>
   cd websocket-counter-poc

2.**Install Dependencies**:

   npm install

3.**Run the Server**:

   node server.js

4. **Access the Application**:
-Open http://localhost:8080 in multiple browser tabs.
-Select a counter (counterA or counterB) and click "Subscribe".
-Use the "+1" or "-1" buttons to update the counter; only clients subscribed to the same counter see updates.

  ***How It Works***
-The server maintains two counters (counterA, counterB) and tracks client subscriptions using a Map.
-Clients connect via WebSocket (ws://localhost:8080) and send a subscription request (e.g., { action: 'subscribe', channel: 'counterA' }).
-The server sends the current counter value to the client upon subscription.
-When a client sends an increment or decrement action, the server updates the relevant counter and broadcasts the new value only to clients subscribed to that channel.
-Each client updates its UI to show the counter value for its subscribed channel.