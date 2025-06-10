import Pusher from 'pusher-js';

// Fallback configuration for development
const DEFAULT_CONFIG = {
  key: 'your_pusher_app_key_here', // Replace with your actual Pusher app key
  cluster: 'ap1', // Replace with your actual cluster (e.g., 'ap1', 'eu', 'us2')
};

const PUSHER_APP_KEY = import.meta.env.VITE_PUSHER_APP_KEY || DEFAULT_CONFIG.key;
const PUSHER_APP_CLUSTER = import.meta.env.VITE_PUSHER_APP_CLUSTER || DEFAULT_CONFIG.cluster;

if (!PUSHER_APP_KEY || PUSHER_APP_KEY === 'your_pusher_app_key_here') {
  console.warn(
    'Using default Pusher configuration. For production, please set VITE_PUSHER_APP_KEY in your .env file'
  );
}

if (!PUSHER_APP_CLUSTER || PUSHER_APP_CLUSTER === 'ap1') {
  console.warn(
    'Using default Pusher cluster. For production, please set VITE_PUSHER_APP_CLUSTER in your .env file'
  );
}

const pusher = new Pusher(PUSHER_APP_KEY, {
  cluster: PUSHER_APP_CLUSTER,
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
  disabledTransports: ['xhr_streaming', 'xhr_polling'],
});

// Add connection error handling
pusher.connection.bind('error', (err: any) => {
  console.error('Pusher connection error:', err);
});

pusher.connection.bind('state_change', (states: any) => {
  console.log('Pusher connection state changed:', states);
});

export default pusher;
