import Gun from 'gun/gun';
import 'gun/sea';

let database = new Gun({
    peers: process.env.PEERS ? process.env.PEERS.split(",") : [],
    axe: false
});

let user = database.user().recall({ sessionStorage: true });

export { database, user };

