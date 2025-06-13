/*CREATE DATABASE if EXISTS senabot;*/

CREATE TABLE beneficios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255),
  descripcion TEXT,
  publico_objetivo VARCHAR(255),
  fecha_inicio DATE,
  fecha_termino DATE,
  link TEXT,
  institucion VARCHAR(255),
  estado ENUM('vigente', 'vencido', 'proximo')
);
