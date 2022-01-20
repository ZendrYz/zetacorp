const db = require('megadb')
const premium = new db.crearDB('premium');

module.exports = async (zetacorp, roleCreate) => {
    if (premium.tiene(role.member.id)) {
        if (roleCreate.member.hasPermission('ADMINISTRATOR')) return;
        roleCreate.delete({ reason: 'Antiroles habilitado'})
    } 
}