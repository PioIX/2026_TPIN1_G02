# 2026_TPIN1_G02
Repositorio del grupo 2
Diseño de tablas:
CREATE TABLE IF NOT EXISTS Jugadores(
    id_jugador int auto_increment unique NOT NULL,
    nombre varchar(100),
    usuario varchar(50) unique,
    contrasena varchar(255),
    es_admin boolean default 0,
    fecha_registro datetime,
    PRIMARY KEY(id_jugador)
);

CREATE TABLE IF NOT EXISTS Puntajes(
    id_puntaje int auto_increment unique NOT NULL,
    puntaje int,
    fecha datetime,
    id_jugador int,
    PRIMARY KEY(id_puntaje),
    FOREIGN KEY(id_jugador) REFERENCES Jugadores(id_jugador)
);


CREATE TABLE IF NOT EXISTS Categorias(
    id_categoria int auto_increment unique NOT NULL,
    nombre varchar(100),
    comparacion varchar(100),
    PRIMARY KEY(id_categoria)
);

CREATE TABLE IF NOT EXISTS Items(
    id_item int auto_increment unique NOT NULL,
    nombre varchar(100),
    imagen_url varchar(255),
    valor decimal(15,2),
    id_categoria int,
    PRIMARY KEY(id_item),
    FOREIGN KEY(id_categoria) REFERENCES Categorias(id_categoria)
);