# OdysseyChromeExtension

## Tabla de Contenido
1. [Informacion General](#general-info)
2. [Tecnologías](#technologias)
3. [Instalación](#Intalación)
4. [Colaboración](#collaboration)
5. [FAQs](#faqs)
### General Info
***
Odyssey Music Extension es una extensión de navegador web para sistemas Chromium. Sus funcionalidades principales son las de buscar música y reproducirla, además de un sistema de recomendaciones. 

### Screenshot
![Captura OCE](https://github.com/kevinlml98/OdisseyChromeExtension/blob/main/Images/Captura.jpg)
## Technologias
***
Una lista de las tecnologías usadas en el proyecto
* NodeJs versión: v14.15.0.
* Visual Studio Code versión: 1.52.1

## Intalación
***
Para obtener la extensión, clone el repositorio
```
$ git clone https://github.com/kevinlml98/Bomber/OdisseyChromeExtension.git
```
* Dirijase al navegador
* Abra la ventana de extensiones y habilite la opciones de desarrollador
* Oprima la opción para cargar un archivo descomprimido
* Selecciones la carpeta en donde se encuentra el archivo manifest.json
* La extensión quedará habilitada por defecto

## Uso
***
Para ejecutar Odyssey Chrome Extension se deben seguir los siguientes pasos:
* Establecer la conexion con la Base de Datos de SQL, los datos de login son los siguientes:

  Local Host: 127.0.0.1:3306
  
  Password: 1234

* Ejecutar el comando node .\server.js en el directorio .\api-rest\
* Cargar la extension a Chrome con la opcion de "Cargar descomprimida" y cargar el "src" del cliente

## Advertencias
***
Los siguientes son requerimientos para que la extension funcione:

* La extension no funcionara correctamente si no esta funcionando el API-REST
* La base de datos debe ser creada con los archivos de SQL que se encuentran en la carpeta de "db"

## Collaboration
***
Este proyecto fue realizado por:
> Kevin Masis Leandro

> Adrian Gomez

> Andrés Rojas Madrigal

## FAQs
***
Una lista de preguntas frecuentes
1. **Instalación de Visual Studio Code**
Dirijase a https://code.visualstudio.com/ y siga los pasos que presenta el sitio

2. __Instalación de Nodejs__ 
Dirijase a https://nodejs.org/es/ y siga los pasos que muestra el sitio

| Tecnológico de Costa Rica | 2020 | Ingeniería en Computadores |
