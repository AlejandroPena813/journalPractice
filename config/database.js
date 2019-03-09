const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports =
{
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: crypto,
    db: 'myJournal'
};
//TODO {
// eventually diff environments --> Lazy loading, auth interceptors. Event emitters.
// Practice observables better. Inter component communication.
// Sockets(only update when offline, can send when back up). Implement caching
// }