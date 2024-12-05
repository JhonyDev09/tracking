const bcrypt = require('bcrypt');

// Configuración
const SALT_ROUNDS = 10; // Asegúrate de que coincidan con los generados
const contrasena = 'pAs$word1'; // Contraseña original ingresada
const storedHash = '$2b$10$F9JjkqX6lWkFccRHaendfOPUnKWh6iVKcKIqOd6NKqp'; // Hash almacenado

// Comparar contraseña con el hash
bcrypt.compare(contrasena, storedHash, (err, isMatch) => {
  if (err) throw err;
  console.log(`¿Coinciden?: ${isMatch}`); // Debería imprimir "true" si es válido
});
