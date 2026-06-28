# Proyecto Interdisciplinario — Primer Cuatrimestre

**Título:** Higher or Lower
**Grupo:** 02
**División:** A

## Integrantes

- Joaquin Brizuela Frias
- Juan Ignacio Romano Mancuso
- Mateo Alejandro Carucci
- Mateo Alejandro Leonardi

---

## Descripción de la propuesta

La opción de juego será Higher or Lower. El juego consiste en elegir una u otra opción dependiendo de lo que se pida. Por ejemplo, si es sobre elegir la canción más famosa, en la mitad derecha de la pantalla te aparecerán 2 botones: uno en el que seleccionas que la canción de la derecha es más famosa y otro en el que seleccionas que es menos famosa. Si acertás se te suma 1 de puntaje y sino se reinicia el juego. En caso de que no falles por mucho tiempo, en determinado momento se empezarán a repetir las opciones, por lo que no hay un límite como tal.

---

## Alcance

- **Sistema de Login y Registro:** el usuario podrá registrarse con DNI, nombre completo, usuario y contraseña. El login validará credenciales mediante fetch contra la base de datos y redirigirá al juego o al panel admin según el tipo de usuario.
- **Juego Higher or Lower:** cada sesión terminará recién cuando el usuario pierda. Se mostrarán dos opciones (canciones, películas, etc.) y el jugador deberá indicar cuál tiene mayor popularidad o valor. Cada acierto suma 1 punto; al fallar, la partida termina y se registra el puntaje.
- **Base de Datos en MySQL:** se almacenarán las opciones de juego (nombre, imagen, valor de comparación, categoría), los perfiles de jugadores y los puntajes máximos. Las tablas tendrán al menos una relación (jugadores → puntajes).
- **Ranking y puntaje histórico:** al finalizar cada partida se registrará el puntaje del jugador y se mostrará una tabla con los mejores puntajes globales, actualizada dinámicamente mediante fetch.
- **Usuario Administrador:** accede con un usuario especial ("admin") y en lugar de ingresar al juego accede a un panel exclusivo para agregar, editar y eliminar opciones de juego, gestionar usuarios y borrar registros de puntajes.
- **Interfaz Dinámica con manejo del DOM:** la pantalla de juego se actualizará sin recargar la página. Las opciones se cargarán desde la base de datos mediante fetch y se renderizan dinámicamente con JavaScript usando clases y objetos.
- **Gestión del repositorio con GitFlow:** cada integrante trabajará en su rama correspondiente y realizará commits regulares.

---

## Tareas

1. Creación y configuración del repositorio en GitHub (estructura de carpetas frontend/backend, .gitignore, ramas por integrante)
2. Diseño de la base de datos (tablas: jugadores, ítems con nombre/imagen/valor/categoría, puntajes; claves foráneas y relaciones)
3. Investigación y carga de contenido (selección de la temática, recopilación de ítems con sus valores reales de comparación y carga en la BD)
4. Diseño de imagen y de la UI (bocetos en Canva: pantalla de juego con ítem izquierdo visible + ítem derecho oculto, botones Higher/Lower, contador de racha)
5. Backend – login y registro (rutas del servidor que reciben los datos del formulario, los validan contra la BD y devuelven la respuesta al frontend)
6. Backend – lógica del juego (rutas que devuelven un par de ítems aleatorios desde la BD; al acertar el segundo ítem pasa a ser el nuevo punto de referencia; al fallar se guarda el puntaje)
7. Backend – ranking y panel admin (rutas para consultar, agregar, editar y eliminar ítems, usuarios y puntajes en la BD)
8. Frontend – login y registro (HTML, CSS y JS con fetch a las rutas del servidor)
9. Frontend – pantalla del juego (renderizado del par de ítems, botones Higher/Lower, revelación del valor oculto, actualización del ítem de referencia con DOM y clases)
10. Frontend – fin de partida y ranking (pantalla con puntaje final y tabla de mejores puntajes cargada con fetch)
11. Frontend – panel de administrador, menú y cómo jugar (formularios para agregar, editar y eliminar ítems; gestión de usuarios y puntajes; página de menú principal y página de cómo jugar)
12. Testeo, integración y puesta en producción

---

## Responsabilidades

| Integrante | Tareas |
|---|---|
| Romano | 1, 3, 4 y 11 |
| Brizuela | 2, 5 y 8 |
| Leonardi | 6, 7 y 9 |
| Carucci | 3, 10, 11 y 12 |

---

## Entregables

**Primer entregable — Login y Registro (hasta el 25/6)**
Backend completo de login y registro (rutas /Login y /Registro), frontend de login y registro (index.html con fetch al servidor) y lógica del juego en el backend (rutas /Items y /Puntajes).

**Segundo entregable — Panel Administrador (hasta el 2/7)**
Backend de ranking y panel admin (rutas /Ranking, /Jugadores, /Categorias, CRUD de /Items y /Puntajes), frontend de la pantalla del juego (juego.html con clases Item y Juego, manejo del DOM) y frontend del panel de administrador (admin.html).

**Entrega final — Juego completo (hasta el 13/7)**
Frontend de fin de partida y ranking (ranking.html), frontend de menú y cómo jugar (menu.html, como-jugar.html), testeo, integración y puesta en producción.

---

## Diseño

[Ver bocetos en Canva](https://canva.link/wc2e6jqw550w8en)
