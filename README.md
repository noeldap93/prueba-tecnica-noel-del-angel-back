# Prueba Tecnica 
Hecho por Noel Del Angel para una prueba tecnica. noel.delangel@outlook.com

## Que incluye?
- Manejo de auth con JWT, inicio de sesion con usuario y contrasena
- Toda el api requiere auth, excepto los endpoints con el decorador `@Public`
- Manejo de permisos (Roles sencillos: administrador/usuario) con el decorador `@AdminsOnly`
- Todas las inputs de usuario estan validadas con class validator.
- Las respuestas se adaptan en automatico con class transform/class serializer para limpiar los valores privados (user.password por ejemplo).

## Los datos
- Los datos de los usuarios se almacenan en json en `/data/users.json`
- La lista de admins es una lista de IDs separada por comas en la variable de ambiente `ADMINS`
- Las credenciales del admin por defecto son `admin@example.com` la contrasena: `admin`
- La contrasena por defecto en los usuarios es: `zxcv1234`

## Para correr el proyecto
- Antes de iniciar:
```
npm i
```

- Para iniciar el proceso:
```
npm start
```

## Para verificar el status
- Hay un endpoint publico para verificar el status en la raiz [http://localhost:3000]
- Se incluyo documentacion sencilla con swagger [http://localhost:3000/swagger] 