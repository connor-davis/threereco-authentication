import Gun from 'gun/gun';
import 'gun/sea';

let database = new Gun({
    peers: [options],
    axe: false
});

let user = database.user().recall({ sessionStorage: true });

export { database, user };

