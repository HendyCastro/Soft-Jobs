const pool = require('../config/basededatos');
const bcrypt = require('bcryptjs');

const verificarCredenciales = async (email, password) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const { rows: [usuario], rowCount } = await pool.query(consulta, [email]);

        if (!usuario || rowCount !== 1) {
            throw { code: 401, message: "Email o contraseña incorrecta" };
        }

        const { password: passwordEncriptada } = usuario;
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

        if (!passwordEsCorrecta) {
            throw { code: 401, message: "Email o contraseña incorrecta" };
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    verificarCredenciales
};
