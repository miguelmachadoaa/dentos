# DentOs
DentOs

Para realizar la instalacion <br><br>

Una vez clonado el proyecto encontrara dos carpetas<br><br>

Cliente y Server <br>

<br> **El Server** <br>

1.-Para iniciar el servidor debera primero modificar el archivo .env y colocar los datos de coexion a la basededatos posgres. <br><br>
2.-Luego ejecuar el comando php artisan migrate:fresh --seed para ejecutar las migraciones y seeder <br><br>
3.-Se creara un usurios con las credenciales email admin@gmail.com y password 123456<br><br>
4.-ejecuar el comando php artisan serve y levantara un servido en  http://127.0.0.1:8000 a donde se conectara el Front<br><br>

**El Cliente** <br><br>
1.-Esta hecho en React y se inicia entrando a la carpeta Cliente y ejecutando el Comando npm start <br><br>
2.-Y se puede acceder en el navegoador colocando localhost:3000 <br><br>

Ya con esto la app queda funcionando 
