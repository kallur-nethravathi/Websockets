const ws = new WebSocket('ws://localhost:8080');
const counterDisplay = document.getElementById('counter');
const channelSelect = document.getElementById('channel');
const subscribeButton = document.getElementById('subscribe');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

// Handle connection open
ws.onopen = () => {
    console.log('Connected to WebSocket server');
    counterDisplay.textContent = 'Select a counter and subscribe';
};

// Handle incoming messages
ws.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        if (data.error) {
            counterDisplay.textContent = `Error: ${data.error}`;
        } else {
            counterDisplay.textContent = `${data.channel}: ${data.counter}`;
        }
    } catch (error) {
        console.error('Message error:', error);
        counterDisplay.textContent = 'Error: Invalid message';
    }
};

// Handle errors
ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    counterDisplay.textContent = 'Error: Connection issue';
};

// Handle connection close
ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
    counterDisplay.textContent = 'Disconnected';
};

// Subscribe to selected channel
subscribeButton.addEventListener('click', () => {
    const channel = channelSelect.value;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'subscribe', channel }));
    }
});

// Send increment action
incrementButton.addEventListener('click', () => {
    const channel = channelSelect.value;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'increment', channel }));
    }
});

// Send decrement action
decrementButton.addEventListener('click', () => {
    const channel = channelSelect.value;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'decrement', channel }));
    }
});