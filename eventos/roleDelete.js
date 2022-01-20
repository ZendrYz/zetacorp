const db = require('megadb')
const premium = new db.crearDB('premium');

module.exports = async (zetacorp, role) => {
    if (premium.tiene(role.member.id)) {
        if (role.member.hasPermission('ADMINISTRATOR')) return;
        role.clone({ reason: 'Antiroles habilitado'})
    } 
}