const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('public'));

// Counter states and subscriptions
const counters = {
    counterA: 0,
    counterB: 0
};
const subscriptions = new Map(); // Maps WebSocket client to subscribed channel

// Broadcast counter updates to subscribed clients
function broadcastCounter(channel) {
    const message = JSON.stringify({ channel, counter: counters[channel] });
    for (let [client, subChannel] of subscriptions) {
        if (subChannel === channel && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
}

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            const { action, channel } = message;

            if (action === 'subscribe' && ['counterA', 'counterB'].includes(channel)) {
                subscriptions.set(ws, channel);
                console.log(`Client subscribed to ${channel}`);
                ws.send(JSON.stringify({ channel, counter: counters[channel] }));
            } else if (action === 'increment' && subscriptions.get(ws) === channel) {
                counters[channel]++;
                console.log(`Incremented ${channel}: ${counters[channel]}`);
                broadcastCounter(channel);
            } else if (action === 'decrement' && subscriptions.get(ws) === channel) {
                counters[channel]--;
                console.log(`Decremented ${channel}: ${counters[channel]}`);
                broadcastCounter(channel);
            } else {
                ws.send(JSON.stringify({ error: 'Invalid action or channel' }));
            }
        } catch (error) {
            console.error('Message error:', error);
            ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
    });

    // Handle disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        subscriptions.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        subscriptions.delete(ws);
    });
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
    console.log('WebSocket server running on ws://localhost:8080');
});