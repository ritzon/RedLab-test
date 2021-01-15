# Content
 - [Demo](#demo)
 - [How to deploy](#how-to-deploy)
 - [How to make API request](#how-to-make-api-request)
   - [HTTP Verbs](#http-verbs)
   - [Login](#login)
   - [Subscription](#subscription)
     - [Menu intranet](#menu-intranet)
     - [Menu mobile](#menu-mobile)
     - [Registered users](#registered-users)
   - [Private endpoints](#private-endpoints)
   - [Standard of ok responses with data](#standard-of-ok-responses-with-data)
   - [Standard of ok responses without data](#standard-of-ok-responses-without-data)
   - [Standard of not ok responses](#standard-of-not-ok-responses)
 - [All endpoints](#all-endpoints)
   - [User](#user)
     - Get a list of users
     - Get one user by userId
     - Change password by userId
     - Assign roles for one User
     - Get a List of Role by User
     - Remove Role for user
   - [Agency](#agency)
     - Agency's basic information
     - Update agency's basic information
     - Agency's social networks
     - Agency's logo
   - [TypeService](#typeservice)
     - List of type services
     - Get one type of service by id (:id)
     - Get requirements by type of service (:id)
     - Get activities by type of service (:id)
     - Create a new type of service with its image.
     - Update a type of service by ID  with its image (optional).
     - Delete a type of service by ID.
   - [Requirement](#requirement)
     - Get list of requirements
     - Create a new requirement.
     - Update a requirement by id
     - Delete a requirement by id
   - [Client](#client)
     - List of clients
     - Get one Client
     - Get client's request by userId
     - Update client by userId
     - Delete client by userId
     - Get a client's list of transactions by userId `Deprecated`
     - Add specifications for Client profile `Deprecated`
     - Add or update preferences for client profile
     - Get preferences for client profile by useId
   - [Personal (Employee)](#personal-employee)
     - List of employees
     - Get one Employee by employeeId
     - Get a employee's list of transactions by userId and status (optional) `Deprecated`
     - Create a employee with roles
     - Update a employee with roles by userId
     - Delete employee by userId
     - Count all the clients of an agent by employeeId
   - [Role](#role)
     - Get list of Roles
     - Get one role
     - Create a new role with its functions
     - Update a Role with its functions
   - [Activity](#activity)
     - Get list of activities
     - Create a new activity.
     - Update an activity by id
     - Delete an activity by id
   - [SocialNetwork](#socialnetwork)
     - Get list of social networks
     - Update agency's url social network by ID
     - Delete a socialNetwork by id
    - [Functions](#functions)
      - Get list of functions
      - Get one function
      - Update an function by id
      - Get a List of Functions with Links. (For set functions to roles)
     - [TypeRequest](#typerequest)
       - Get list of type requests
       - Create a new type request.
       - Update a type request by id
       - Delete a type request by id
     - [Warranty](#warranty)
       - Get list of Warranties
       - Get one Warranty
       - Create a new warranty.
       - Update a warranty by id
       - Delete a warranty by id
     - [Contract](#contract)
       - Get list of Contracts
       - Get One Contract
       - Create a new contract.
       - Update a contract by id
       - Delete a contract by id
       - Get a list of Warranties of one contract
     - [TypeIncidence](#typeincidence)
       - get a List of Type Incidences
       - get a One Type Incidence
       - Create one Type Incidence
       - Update one Type Incidence
       - Delete at Type Incidence
     - [Incidence](#incidence)
       - get a list of Incidences by userId (optional)
       - get One Incidence
       - Create a incidence
       - Edit one Incidence
       - Delete one incidence
       - Respond a Incidence and send a email.
       - Get count of incidences by userId
     - [TypeSpecification](#typespecification)
       - get a List of Type Specifications
       - get a One Type Specifications
       - Create a type of Specification
       - Edit a type of Specification
       - Delete a type of specifications
    - [Specification](#specification)
       - get a List of Specifications
       - get a One Specifications
       - Create one Specification
       - Update one Specification
       - Delete One Specification
     - [State](#state)
       - Get list of states
       - Get state's cities by id (:id)
       - Get state's municipalities by id (:id)
     - [Municipality](#municipality)
       - Get munucipality's parishes by id (:id)
     - [Promotion](#promotion)
       - get a List of Promotions 
       - get a One Promotion (Property not for now)
       - Create a Promotion
       - Edit a Promotion
       - Delete a Promotion
       - Add properties to one Promotion
       - Add Specification to one Promotion
       - Activate or Deactivate a Promotion
       - Remove a active promotion
     - [Request](#request)
       - Get list of pending request `Deprecated`
       - Get list of request by status (optional) and userId
       - Create a request for type of service
       - Approve a request
       - Get count of requests by userId
       - Reject request by requestId
       - Get request by id
     - [Property](#property)
       - Get list of Properties
       - Get One Property
       - Create a Property
       - Add a transaction for the property
       - update data of one property
       - Create a publication for put in the catalogue
       - Get a list of Properties that are available
     - [TypeProperty](#typeproperty)
       - Get a list of Type Properties
       - Get one Type Property
       - Get all Type specifications and specific especifications for one type of property
       - Create a type of Property
       - Update a type of Property
       - Delete a type of Property
     - [TypeContact](#typecontact)
       - Get a list of Types Contacts (The user can be blank or null)
       - Get a one Type Contact (The user can be blank or null)
       - Create a type of Contact
       - Update a type of Contact
       - Delete a type of Contact
     - [Subject (Contact)](#subject-contact)
       - Get list of subjects
       - Create a new subject.
       - Update a subject by id
       - Delete a subject by id
     - [Contact](#contact)
       - Get a list of Contacts (The user can be Blank or null)
       - Get a one Contact (The user can be Blank or null)
       - Create a Contact
       - Respond a Contact and send a email.
       - Delete a contact by id
     - [Transaction](#transaction)
       - Get a list of transactions  by status (optional), userId (client or agent) and transactions which offering property to clients (sell, rent, etc)
       - Get a transaction by transactionId
       - Approve a transaction's requirement by transactionId and requirementId
       - Reject a transaction's requirement by transactionId and requirementId with observation
       - Upload file of a transaction's requirement by transactionId and requirementId
       - Approve a transaction's activity by transactionId and activityId
       - Reject a transaction's activity by transactionId and activityId
       - Reserve a transaction with its property by transactionId
       - Remove reservation of transaction with its property by transactionId
       - Get count of transactions by userId
       - Get count of Type Services transactions by userId
     - [QualificationCriteria](#qualificationcriteria)
       - get a list of Qualification criteria
       - Create a qualification criteria
       - Edit one qualification criteria by id
       - Delete one qualificationCriteria
     - [TypeCalification](#typecalification)
       - Get a list of Types Califications
       - Get a one Type Calification
       - Create a type of Calification
       - Update a type of Calification
       - Delete a type of Calification
     - [Calification](#calification)
       - Get a list of Califications
       - Get a one Calification
       - Calificate a transaction by TransactionId
       - Update a Calification
       - Delete a Calification
     - [TypeAppointment](#typeappoinment)
       - Get a list of TypeAppointments
       - Get a one Type Appointment
       - Create one Type Appointment
       - Update one Type Appointment
       - Delete one Type Appointment
     - [Appointment](#appointment)
       - Get a list of Appointments
       - Get a one Appointment
       - Create an appoitment
       - Update a Appointment
       - Delete a Appointment
       - Get schedule by userId 
     - [Notification](#notification)
       - Check and return the cant of notifications which the user don't have been read
       - Get all notifications of an user ordered by date
       - Get unread notifications of an user ordered by date
       - Get count of notifications by userId
     - [Color](#color)
       - get a list of Colors
       - get One Color
       - Create a color
       - Edit one Color
       - Delete one color
     - [Inspection](#inspection)
       - get a list of inspection
       - Create a inspection with its file
       - Edit a inspection by inspectionId
       - Delete one inspection by id
    - [Report](#report)
       - Get request by type services in the entire year
       - Get appointments by employee id or type services in a range of dates
       - Get incidences in a range of dates
       - Get Type Services with properties on each month in a range of dates
       - Get Contacts on each month in a range of dates
       - Get the time of transactions for each status
       - Get Clients and see if they have requests.
 - [Developers](#developers)

# Demo

https://ignus-backend-jchiquin.c9users.io/

# How to deploy

- git clone https://gitlab.com/Ethereum-Ignus/ignus-backend.git
- cd ignus-backend
- npm install
- npm start

# How to make API request

### HTTP Verbs
| HTTP Verb / Method | Action             |
|:-------------------|:-------------------|
| `GET`              | Read               |
| `POST`             | Create             |
| `PUT`              | Update         |
| `DELETE`           | Delete             |

### Login 

You have to put username and password through request headers.

https://ignus-backend-jchiquin.c9users.io/login (GET)

``` js
fetch('https://ignus-backend-jchiquin.c9users.io/login', { 
   method: 'GET', 
   headers: new Headers({
     'Authorization': 'Basic '+btoa('jchiquin:12345'), 
     'Content-Type': 'application/json',
   }), 
 })
 .then(response=>{
    return response.json()
    })
    .then(response=>{
        console.log(response)
    })
```

That would give you a json like this:

``` json
{
    "status": true,
    "data": {
        "user": {
            "id": 2,
            "email": "jcamacaro",
            "urlAvatar": "https://ignus-backend-jchiquin.c9users.io/public/imgs/avatar/avatardefault.png",
            "firstFunction": "/dashboard",
            "notificationSMS": true,
            "notificationWS": true,
            "notificationEmail": true
        },
        "person": { //client or employee
            "id": 1,
            "identification": "24758462",
            "firstName": "José Rafael",
            "lastName": "Camacaro",
            "gender": "Masculino",
            "phoneNumber": "04165695483"
        },
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1N..."
    }
}
```

_* You can see the user list exactly like you do with the clients and the employees list, scroll by down for figure out*_
_* https://ignus-backend-jchiquin.c9users.io/api/user *_

### Subscription

- https://ignus-backend-jchiquin.c9users.io/api/user/client (POST)

INPUT
``` json
{
	"username": "jorgechiquinv@gmail.com", 
    "firstName": "Jorge", 
    "lastName": "Chiquin",
    "gender": "Masculino",
    "phoneNumber": "04164863486"
    "birthDate": "23/08/1995",
    "notificationEmail": true,
    "notificationSMS": false,
    "notificationWS": false
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "code message",
        "I001": "Usuario - Creado exitosamente!"
    }
}
```

### Menu intranet
- https://ignus-backend-jchiquin.c9users.io/api/user/menu/intranet/:user_id (GET)

Get the Menu for One User based on Roles and their functions

OUTPUT:
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Registrar",
            "sub": []
        },
        {
            "id": 2,
            "name": "Gestionar contratos",
            "sub": []
        },
        {
            "id": 3,
            "name": "Generar reportes",
            "sub": []
        },
        {
            "id": 4,
            "name": "Dashboard",
            "link": "/dashboard",
            "icon": "fa fa-fw fa-dashboard",
            "sub": []
        },
        {
            "id": 5,
            "name": "Transacciones",
            "link": "1",
            "icon": "fa fa-address-book",
            "sub": [
                {
                    "id": 6,
                    "name": "Solicitud",
                    "icon": "fa fa-address-book",
                    "sub": [
                        {
                            "id": 7,
                            "name": "Registro",
                            "link": "/registrosolicitud",
                            "icon": "fa fa-user"
                        }
                    ]
                }
            ]
        }
    ]
}
```

### Menu Mobile
- https://ignus-backend-jchiquin.c9users.io/api/user/menu/mobile/:user_id (GET)

Get the Menu for One User based on Roles and their functions

OUTPUT:
```json
{
    "status": true,
    "data": [
        {
            "id": 47,
            "title": "Home",
            "page": "DashboardPage",
            "icon": "Home",
            "sub": []
        },
        {
            "id": 48,
            "title": "Perfil",
            "page": "ProfilePage",
            "icon": "contact",
            "sub": []
        },
        {
            "id": 49,
            "title": "Agenda",
            "page": "SchedulePage",
            "icon": "calendar",
            "sub": []
        },
        {
            "id": 50,
            "title": "Catálogo",
            "page": "PortfolioPage",
            "icon": "briefcase",
            "sub": []
        },
        {
            "id": 51,
            "title": "Preferencias",
            "page": "UserPreferencesPage",
            "icon": "settings",
            "sub": []
        },
        {
            "id": 52,
            "title": "Calificación",
            "page": "QualificationPage",
            "icon": "star",
            "sub": []
        },
        {
            "id": 53,
            "title": "Incidencias",
            "page": "IncidentsPage",
            "icon": "copy",
            "sub": []
        },
        {
            "id": 54,
            "title": "Atención al Cliente",
            "page": "IncidentsPage",
            "icon": "archive",
            "sub": []
        }
    ]
}
```

### Registered users

|User             |Password |Role     |
|:------------------------------|:----------|:--------|
|ysidrofernandez3012@gmail.com  |12345    |Client   |
|camacaroj21@gmail.com      |12345    |Employee |
|jorgechiquinv@gmail.com    |12345    |Root   |

### Private endpoints

Now with the accessToken you can make request for all endpoints who start with `/api/` (because they are private)

https://ignus-backend-jchiquin.c9users.io/api/user (GET)

``` js
fetch('https://ignus-backend-jchiquin.c9users.io/api/user', { 
   method: 'GET', 
   headers: new Headers({
     'Content-Type': 'application/json',
     'accessToken' : "(...)eyJ0eXAiOiJKV1Qi(...)"
   }), 
 })
 .then(response=>{
    return response.json()
    })
    .then(response=>{
        console.log(response)
    })
```

### Standard of ok responses with data

All endpoint that returns data, mostly those with verb GET, will have a template like this:

```json
{
    "status": true,
    "data": {
        //an object
    }
        or
    "data": [
        //an array of objects
    ]
}
```

### Standard of ok responses without data

When you create (POST), update (PUT) or delete (DELETE) by using an endpoint, it will have a responses like this:

```json
{
    "status": true,
    "message": {
        "code": "code message",
        "text": "Inmobiliaria modificada con éxito"
    }
}
```

### Standard of not ok responses

Whenever you receive a exception, bad request, error, etc. the response must be like this:

```json
{
    "status": false,
    "message": {
        "code": "code message",
        "text": "Inmobiliaria no encontrada"
    }
}
```

# All endpoints

## User
- https://ignus-backend-jchiquin.c9users.io/api/user (GET)
 
Get a list of users

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "user": {
                "id": 2,
                "email": "camacaroj21@gmail.com",
                "urlAvatar": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/avatar/avatardefault.png",
                "notificationSMS": true,
                "notificationWS": true,
                "notificationEmail": true
            },
            "person": {
                "id": 1,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino",
                "phoneNumber": "04164567391"
            }
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/user/:userId (GET)
 
Get one user by userId

OUTPUT
```json
{
    "status": true,
    "data": {
        "user": {
            "id": 1,
            "email": "ysidrofernandez3012@gmail.com",
            "urlAvatar": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/avatar/avatardefault.png",
            "notificationSMS": true,
            "notificationWS": true,
            "notificationEmail": true
        },
        "person": {
            "id": 1,
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "gender": "Masculino",
            "phoneNumber": "04167587462"
        }
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/user/:userId (PUT)

Change password by userId

INPUT
```json
{
  "currentPassword": "12345", 
  "newPassword": "nueva" 
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I002",
        "text": "Usuario - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/user/role/:user_id (PUT)

Assign roles for one User

INPUT
```json
{
  "roles": [1,3]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I092",
        "text": "Usuario - Roles agregados exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/user/role/:user_id (GET)

Get a List of Role by User

OUTPUT
``` json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Root",
            "description": "Modo Dios",
            "functions": [
                {
                    "id": 1,
                    "name": "Registrar",
                    "description": "Cambiar luego"
                },
                {
                    "id": 2,
                    "name": "Gestionar contratos",
                    "description": "Cambiar luego"
                },
                {
                    "id": 3,
                    "name": "Generar reportes",
                    "description": "Cambiar luego"
                },
                {
                    "id": 4,
                    "name": "Dashboard",
                    "description": "Muestra de datos"
                },
                {
                    "id": 5,
                    "name": "Transacciones",
                    "description": "Nucleo"
                },
                {
                    "id": 6,
                    "name": "Solicitud",
                    "description": "Hijo de transaccion"
                }
            ]
        },
        {
            "id": 3,
            "name": "Empleado",
            "description": "Rol Empleado",
            "functions": [
                {
                    "id": 2,
                    "name": "Gestionar contratos",
                    "description": "Cambiar luego"
                },
                {
                    "id": 3,
                    "name": "Generar reportes",
                    "description": "Cambiar luego"
                }
            ]
        }
    ]
}
```


- https://ignus-backend-jchiquin.c9users.io/api/user/:user_id/remove_role/:role_id (GET)

Remove Role for user

is everything is ok, you got a json like this

``` json
{
    "data": {
        "message": {
            "code": "I010", 
            "text": "Recaudo - Eliminado exitosamente!"
        }
    }
}
```

## Agency
- https://ignus-backend-jchiquin.c9users.io/api/agency (GET)
 
Agency's basic information

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "rif": "J929939399-2",
        "name": "INMOBILIARIUM C.A.",
        "mission": "Prestar el mejor servicio de ventas, administración de inmuebles y condominios, de manera efectiva cumpliendo con los principios éticos y morales, para así satisfacer las necesidades del mercado inmobiliario: Residencial, Comercial e Industrial, obteniendo plena satisfacción de nuestros clientes a nivel regional, mediante la integración de un equipo de trabajo capacitado, con tecnología e información avanzada, proporcionando servicio con altos estándares de calidad que permita la identificación de nuestros clientes con la empresa.",
        "vision": "Estar bajo el reconocimiento de la ciudadanía local, regional y nacional, como una empresa comercializadora de bienes muebles y administración de condominios con la solidez de servicios basados en la reputación, seguridad y estabilidad con el fin de lograr ser pionera en el mercado como organización única y ejemplo para la competencia bajo principios morales y éticos.",
        "generalObjective": "Para INMOBILIARIUM C.A. el objetivo esencial es manifestar nuestro existir, los altos valores de honestidad y responsabilidad, unidos a la pasión, ingenio y constancia han sido las fuentes de inspiración del trabajo realizado, el cual unido a la tecnología actual, hacen de nuestra organización una herramienta útil, segura y confiable para nuestros clientes.",
        "ubication": "Av.Los Leones, Centro Comercial París, Piso 2, Nivel París, Local 3-1 Barquisimeto, Edo. Lara",
        "foundationDate": "1995-10-01",
        "phoneNumber": "0416-4333456",
        "phoneNumber2": "0251-2349583",
        "socialNetworks": [
            {
                "id": 1,
                "name": "Facebook",
                "urlLogo": "https://ignus-backend-jchiquin.c9users.io/public/imgs/socialNetwork/facebook.png",
                "urlAgencySocialNetwork": "https://www.facebook.com/",
                "fontAwesome": "fa-facebook",
                "iconIonic": "logo-facebook"
            },
            .
            .
        ],
        "logo":
            {
                "id": 1,
                "url": "https://ignus-backend-jchiquin.c9users.io/public/imgs/logo/basic-logo.png",
                "description": "Logo sin fondo"
            }
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/agency (PUT)

Update agency's basic information

INPUT
```json
{
    "rif": "",
    "name": "",
    "mission": "",
    "vision": "",
    "generalObjective": "",
    "ubication": "",
    "foundationDate": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I002",
        "text": "Inmobiliaria modificada con éxito"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/agency/socialNetwork (GET)
 
Agency's social networks

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Facebook",
            "urlLogo": "https://ignus-backend-jchiquin.c9users.io/public/imgs/socialNetwork/facebook.png",
            "urlAgencySocialNetwork": "https://www.facebook.com/inmobiliarium.perez",
            "fontAwesome": "fa-facebook",
            "iconIonic": "logo-facebook"
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/agency/logo (GET)
 
Agency's logo

OUTPUT
```json
{
    "status": true,
    "data":
        {
            "id": 1,
            "url": "https://ignus-backend-jchiquin.c9users.io/public/imgs/logo/basic-logo.png",
            "description": "Logo sin fondo"
        }
}
```

## TypeService

- https://ignus-backend-jchiquin.c9users.io/api/typeService?offeringProperty (GET)

List of type services

```javascript
offeringProperty =>
true: "sell, rent, etc",
false: "buy, lease, etc"
```
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Compra",
            "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
            "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/compra.jpg",
            "offeringProperty": true
            "requirements": [
                {
                    "id": 12,
                    "name": "Documento de sociedades mercantiles.",
                    "description": "Subir Documento de sociedades mercantiles."
                },
                .
                .
            ],
            "activities": [
                {
                    "id": 1,
                    "name": "Suscribirse al sistema",
                    "description": "Suscribirse al sistema"
                },
                .
                .
            ]
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeService/:id (GET)

Get one type of service by id (:id)

For example:

https://ignus-backend-jchiquin.c9users.io/api/typeService/1

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Compra",
        "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
        "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/compra.jpg",
        "offeringProperty": true
        
        "requirements": [
            {
                "id": 12,
                "name": "Documento de sociedades mercantiles.",
                "description": "Subir Documento de sociedades mercantiles."
            },
            .
            .
        ],
        "activities": [
            {
                "id": 1,
                "name": "Suscribirse al sistema",
                "description": "Suscribirse al sistema"
            },
            .
            .
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeService/requirement/:id (GET)

Get requirements by type of service (:id)

For example: 

https://ignus-backend-jchiquin.c9users.io/api/typeService/requirement/1

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 12,
            "name": "Documento de sociedades mercantiles.",
            "description": "Subir Documento de sociedades mercantiles."
        },
        {
            "id": 13,
            "name": "Documento de liberación de hipoteca.",
            "description": "Subir Documento de liberación de hipoteca."
        }
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeService/activity/:id (GET)

Get activities by type of service (:id)

For example: 

https://ignus-backend-jchiquin.c9users.io/api/typeService/activity/1

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Suscribirse al sistema",
            "description": "Suscribirse al sistema"
        },
        {
            "id": 2,
            "name": "Solicitar servicio",
            "description": "Solicitar servicio"
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeService (POST)

Create a new type of service with its image.

INPUT

*Note: Upload the image (it could be of any type) by using `form-data` with any name you want*
```json
{
  "name": "",
  "description": "",
  "offeringProperty": true,
  "requirements": [1,2,3], //Requirements ID
  "activities": [1] //Activities ID
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I027",
        "text": "Tipo de servicio - Creado exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeService/:id (PUT)

Update a type of service by ID  with its image (optional).

INPUT

*Note: Upload the image (it could be of any type) by using `form-data` with any name you want*
```json
{
  "name": "",
  "description": "",
  "offeringProperty": true,
  "requirements": [1,2,3], //Requirements ID
  "activities": [1] //Activities ID
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I029",
        "text": "Tipo de servicio - Modificado exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeService/:id (DELETE)

Delete a type of service by ID.

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I031",
        "text": "Tipo de servicio - Eliminado exitosamente!"
    }
}
```

## Requirement

- https://ignus-backend-jchiquin.c9users.io/api/requirement (GET)

Get list of requirements
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Títulos supletorios.",
            "description": "Subir Títulos supletorios."
        },
        {
            "id": 2,
            "name": "Declaración sucesoral (principal).",
            "description": "Subir Declaración sucesoral (principal)."
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/requirement (POST)

Create a new requirement.

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I003",
        "text": "Recaudo - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/requirement/:id (PUT)

Update a requirement by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I005",
        "text": "Recaudo - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/requirement/:id (DELETE)

Delete a requirement by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I007",
        "text": "Recaudo - Eliminado exitosamente!"
    }
}
```

## Client

- https://ignus-backend-jchiquin.c9users.io/api/client (GET)

List of clients

OUTPUT
``` json
{
    "status": true,
    "data": [
        {
            "user": {
                "id": 1,
                "username": "yfernandez"
            },
            "person": {
                "id": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "29/10/1995",
                "gender": "Masculino"
            },
            "roles": [],
            "state": {
            "id": 3,
            "name": "Apure"
            },
            "municipality": {
                "id": 33,
                "name": "Pedro Camejo"
            },
            "parish": {
                "id": 100,
                "name": "Cunaviche"
            }
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/client/:id (GET)

Get one Client

OUTPUT
```json
{
    "status": true,
    "data": {
        "user": {
            "id": 1,
            "username": "ysidrofernandez3012@gmail.com"
        },
        "person": {
            "id": 1,
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "bankName": "Provincial",
            "bankAccount": "01089298237843892366",
            "birthDate": "29/10/1995",
            "gender": "Masculino"
        },
        "roles": [
            {
                "id": 4,
                "name": "Cliente",
                "description": "Rol cliente"
            }
        ],
        "specifications": [
            {
                "id": 1,
                "name": "Cantidad de baños",
                "typeInput": "number"
            },
            {
                "id": 3,
                "name": "Estacionamiento",
                "typeInput": "checkbox"
            },
            {
                "id": 5,
                "name": "Número de piso",
                "typeInput": "number"
            },
            {
                "id": 7,
                "name": "Metros cuadrados",
                "typeInput": "number"
            }
        ],
        "state": {
            "id": 3,
            "name": "Apure"
        },
        "municipality": {
            "id": 33,
            "name": "Pedro Camejo"
        },
        "parish": {
            "id": 100,
            "name": "Cunaviche"
        }
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/client/request/:userId (GET)

Get client's request by userId

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 2,
            "requestDate": "18/12/2018",
            "wishDate": "31/12/2018",
            "status": "Solicitada",
            "client": {
                "id": 1,
                "userId": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino"
            },
            "employee": {},
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "typeRequest": {
                "id": 3,
                "name": "Servicio",
                "description": "Solicitar un servicio"
            }
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/client/:user_id (PUT)

Update client by userId

INPUT
```json
{
    "identification": "",
    "firstName": "",
    "lastName": "",
    "birthDate": "", 
    "bankName": "", 
    "bankAccount": "",
    "phoneNumber": "",
    "gender": "",
    "parish_id": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I002",
        "text": "Usuario - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/client/:user_id (DELETE)

Delete client by userId

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I004",
        "text": "Usuario - Eliminado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/client/transaction/:userId?status (GET)

Get a client's list of transactions by userId and status (optional) `Deprecated`

```javascript
P: "En proceso",
I: "Incidencia",
F: "Finalizada",
C: "Cancelada",
D: "Completada",
H: "Publicada en catalogo",
Q: "Calificado",
R: "Reservada"
```
Example:
```
?status=P,F,C   All transactions canceled, in process, in incidence
?status=P       All transactions in process
?status         All transacions
```

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "status": "En proceso",
            "nameForClient": "Venta, agente: José Rafael Camacaro - En proceso",
          "nameForEmployee": "Venta, cliente: Ysidro José Fernández Sangronis - En proceso",
            "request": {
                "id": 2,
                "requestDate": "18/12/2018",
                "wishDate": "31/12/2018",
                "status": "Aprobada"
            },
            "client": {
                "id": 1,
                "userId": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino"
            },
            "employee": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "activities": [
              {
                  "id": 1,
                  "name": "Suscribirse al sistema",
                  "description": "Suscribirse al sistema",
                  "reviewDate": "06/01/2019",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Solicitar servicio",
                  "description": "Solicitar servicio",
                  "nextToExecute": true,
                  "reviewDate": "06/01/2019",
                  "observation": "Datos erróneos",
                  "status": "Rechazado"
              },
              {
                  "id": 3,
                  "name": "Solcitar cita",
                  "description": "Solcitar cita",
                  "status": "Espera"
              },
              .
              .
            ],
            "requirements": [
                {
                  "id": 1,
                  "name": "Títulos supletorios.",
                  "description": "Subir Títulos supletorios.",
                  "reviewDate": "30/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_7789587b43a1b1a0da795b23f973ccf9.pdf",
                  "uploadDate": "29/12/2018",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Declaración sucesoral (principal).",
                  "description": "Subir Declaración sucesoral (principal).",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
                  "uploadDate": "30/12/2018",
                  "status": "Espera"
              },
              {
                  "id": 3,
                  "name": "Declaración sucesoral (sustitutiva).",
                  "description": "Subir Declaración sucesoral (sustitutiva).",
                  "reviewDate": "31/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_a2f03211f521be812168a94eb0dad7cc.txt",
                  "uploadDate": "30/12/2018",
                  "observation": "Documento no legible, subirlo de nuevo.",
                  "status": "Rechazado"
              },
                .
                .
            ],
            "property": {
                "id": 1,
                "ubication": "Zona este, Av Lara",
                "buildDate": "14/02/1991",
                "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, dueño: Jorge Chiquín",
                "typeProperty": {
                    "id": 1,
                    "name": "Casa"
                },
                "client": {
                    "id": 2,
                    "identification": "26141319",
                    "firstName": "Jorge",
                    "lastName": "Chiquín",
                    "birthDate": "23/08/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                },
                "TypeService": {
                    "id": 3,
                    "name": "Venta",
                    "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                    "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/venta.jpg",
                    "offeringProperty": false
                }
        }
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/client/specifications/:id (PUT)

Add specifications for Client profile `Deprecated`
*note: the id belongs to USER ID*

INPUT
```json
{
    "specifications": [1,2,4,6]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I100",
        "text": "Usuario - Especificaciones añadidas exitosamente"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/client/preference/:clientId (PUT)

Add or update preferences for client profile
*note: the id belongs to clientId *

INPUT
```json
{
   "TypePropertyId":1,
   "TypeServiceId":1,
   "ParishId":480,
   "buildDate":"19/08/1970",
   "typeSpecifications":[
      {
         "id":1,
         "name":"Estructura",
         "description":"Especificaciones de infraestructura",
         "specifications_checkbox":[
            {
               "id":3,
               "name":"Estacionamiento",
               "typeInput":"checkbox",
               "quantity":false,
               "bin_quantity":false
            },
            .
            .
         ],
         "specifications_number":[
            {
               "id":1,
               "name":"Cantidad de baños",
               "typeInput":"number",
               "quantity":"2"
            },
            .
            .
         ]
      },
      .
      .
   ]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I087",
        "text": "Cliente - Preferencias modifcadas exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/property/client/preference/:userId (GET)

Get preferences for client profile by useId

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "ubication": "Zona este, Av Lara",
        "buildDate": "13/02/1991",
        "status": "Inicial",
        "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, propietario: Jorge Chiquín",
        "typeProperty": {
            "id": 1,
            "name": "Casa"
        },
        "owner": [
            {
                "id": 2,
                "username": "jorgechiquinv@gmail.com",
                "identification": "26141319",
                "firstName": "Jorge",
                "lastName": "Chiquín",
                "birthDate": "22/08/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            }
        ],
        "state": {
            "id": 5,
            "name": "Barinas"
        },
        "municipality": {
            "id": 58,
            "name": "Barinas"
        },
        "parish": {
            "id": 180,
            "name": "Manuel Palacio Fajardo"
        },
        "TypeService": {
            "id": 3,
            "name": "Venta",
            "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
            "urlImage": "localhost/public/imgs/typeService/venta.jpg",
            "offeringProperty": true
        },
        "Promotions": [],
        "typeSpecifications": [
            {
                "id": 1,
                "name": "Estructura",
                "description": "Especificaciones de infraestructura",
                "specifications_checkbox": [
                    {
                        "id": 3,
                        "name": "Estacionamiento",
                        "typeInput": "checkbox",
                        "quantity": 2,
                        "bin_quantity": false
                    }
                ],
                "specifications_number": [
                    {
                        "id": 1,
                        "name": "Cantidad de baños",
                        "typeInput": "number",
                        "quantity": 3
                    },
                    {
                        "id": 2,
                        "name": "Cantidad de habitaciones",
                        "typeInput": "number",
                        "quantity": 4
                    }
                ]
            },
            {
                "id": 2,
                "name": "Diseño",
                "description": "Color, tipo de piso, etc",
                "specifications_checkbox": [],
                "specifications_number": []
            },
            {
                "id": 3,
                "name": "Cercanía",
                "description": "Especificaciones de cercanía",
                "specifications_checkbox": [],
                "specifications_number": []
            }
        ]
    }
}
```

## Personal (Employee)

- https://ignus-backend-jchiquin.c9users.io/api/employee (GET)

List of employees

OUTPUT
``` json
{
    "status": true,
    "data": [
        {
            "user": {
                "id": 2,
                "username": "camacaroj21@gmail.com",
                "urlAvatar": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/avatar/avatardefault.png"
            },
            "person": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "phoneNumber": "04164567391",
                "gender": "Masculino"
            },
            "roles": [
                {
                    "id": 3,
                    "name": "Empleado",
                    "description": "Rol Empleado"
                },
                .
                .
            ],
            "arrayDaysOfWorks": [
                1,
                2,
                3,
                4,
                5
            ],
            "arrayFreeDays": [
                0,
                6
            ]
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/employee/:employeeId (GET)

Get one Employee by employeeId

OUTPUT
```json
{
    "status": true,
    "data": {
        "user": {
            "id": 2,
            "username": "camacaroj21@gmail.com",
            "urlAvatar": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/avatar/avatardefault.png"
        },
        "person": {
            "id": 1,
            "identification": "24758462",
            "firstName": "José Rafael",
            "lastName": "Camacaro",
            "gender": "Masculino",
            "phoneNumber": "04164567391"
        },
        "roles": [
            {
                "id": 3,
                "name": "Empleado",
                "description": "Rol Empleado"
            },
            .
            .
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/employee/transaction/:userId (GET)

Get a employee's list of transactions by userId and 
status (optional) `Deprecated`

```javascript
P: "En proceso",
I: "Incidencia",
F: "Finalizada",
C: "Cancelada",
D: "Completada",
H: "Publicada en catalogo",
Q: "Calificado",
R: "Reservada"
```
Example:
```
?status=P,F,C   All transactions canceled, in process, in incidence
?status=P       All transactions in process
?status         All transacions
```

OUTPUT
``` json
{
    "status": true,
    "data": [
         {
            "id": 2,
            "status": "En proceso",
            "nameForClient": "Venta, agente: José Rafael Camacaro - En proceso",
            "nameForEmployee": "Venta, cliente: Ysidro José Fernández Sangronis - En proceso",
            "request": {
                "id": 2,
                "requestDate": "20/12/2018",
                "wishDate": "31/12/2018",
                "status": "Aprobada"
            },
            "client": {
                "id": 1,
                "userId": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino"
            },
            "employee": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "activities": [
              {
                  "id": 1,
                  "name": "Suscribirse al sistema",
                  "description": "Suscribirse al sistema",
                  "reviewDate": "06/01/2019",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Solicitar servicio",
                  "description": "Solicitar servicio",
                  "nextToExecute": true,
                  "reviewDate": "06/01/2019",
                  "observation": "Datos erróneos",
                  "status": "Rechazado"
              },
              {
                  "id": 3,
                  "name": "Solcitar cita",
                  "description": "Solcitar cita",
                  "status": "Espera"
              },
              .
              .
            ],
            "requirements": [
                {
                  "id": 1,
                  "name": "Títulos supletorios.",
                  "description": "Subir Títulos supletorios.",
                  "reviewDate": "30/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_7789587b43a1b1a0da795b23f973ccf9.pdf",
                  "uploadDate": "29/12/2018",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Declaración sucesoral (principal).",
                  "description": "Subir Declaración sucesoral (principal).",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
                  "uploadDate": "30/12/2018",
                  "status": "Espera"
              },
              {
                  "id": 3,
                  "name": "Declaración sucesoral (sustitutiva).",
                  "description": "Subir Declaración sucesoral (sustitutiva).",
                  "reviewDate": "31/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_a2f03211f521be812168a94eb0dad7cc.txt",
                  "uploadDate": "30/12/2018",
                  "observation": "Documento no legible, subirlo de nuevo.",
                  "status": "Rechazado"
              },
                .
                .
            ],
            "property": {
                "id": 1,
                "ubication": "Zona este, Av Lara",
                "buildDate": "14/02/1991",
                "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, dueño: Jorge Chiquín",
                "typeProperty": {
                    "id": 1,
                    "name": "Casa"
                },
                "client": {
                    "id": 2,
                    "identification": "26141319",
                    "firstName": "Jorge",
                    "lastName": "Chiquín",
                    "birthDate": "23/08/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                },
                "TypeService": {
                    "id": 3,
                    "name": "Venta",
                    "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                    "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/venta.jpg",
                    "offeringProperty": false
                }
        }
        .
        .
    ]
}
```


- https://ignus-backend-jchiquin.c9users.io/api/user/employee (POST)

Create a employee with roles

INPUT
``` json
{ 
    "username": "valid@email.com", 
    "firstName": "example", 
    "lastName": "example lastname",
    "gender": "any",
    "identification": "any",
    "roles": [1, 2], // rolesId
    "days": [0,1,4,5] // working days
}
```

OUTPUT

``` json
{
    "data": {
        "message": {
            "code": "I001", 
            "text": "Usuario - registrado exitosamente"
        }
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/employee/:user_id (PUT)

Update a employee with roles by userId

INPUT
```json
{
    "identification": "",
    "firstName": "",
    "lastName": "",
    "gender": "",
    "roles": [1, 2], //rolesId
    "days": [0,1,4,5] // working days
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I002",
        "text": "Usuario - Modificado exitosamente!"
    }
}
```


- https://ignus-backend-jchiquin.c9users.io/api/employee/:user_id (DELETE)

Delete employee by userId

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I002",
        "text": "Usuario - Eliminado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/employee/count/client/:employeeId (GET)

Count all the clients of an agent by employeeId

OUTPUT

```json
{
    "status": true,
    "data": {
        "count": 3
    }
}
```


## Role

- https://ignus-backend-jchiquin.c9users.io/api/role (GET)

Get list of Roles

``` json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Root",
            "description": "Modo Dios",
            "functions": [
                {
                    "id": 1,
                    "name": "Registrar",
                    "description": "Cambiar luego"
                },
                {
                    "id": 2,
                    "name": "Gestionar contratos",
                    "description": "Cambiar luego"
                },
                {
                    "id": 3,
                    "name": "Generar reportes",
                    "description": "Cambiar luego"
                }
            ]
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/role/:id (GET)

Get one role

OUTPUT
``` json
{
    "status": true,
    "data": {
        "id": 3,
        "name": "Empleado",
        "description": "Rol Empleado",
        "functions": [
            {
                "id": 2,
                "name": "Gestionar contratos",
                "description": "Cambiar luego"
            },
            {
                "id": 3,
                "name": "Generar reportes",
                "description": "Cambiar luego"
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/role (POST)

Create a new role with its functions

INPUT
```json
{
  "name": "Nuevo Rol",
  "description": "Probando API",
  "functions": [1,3]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I006",
        "text": "Rol - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/role/:id (PUT)

Update a Role with its functions

INPUT
```json
{
  "name": "Rol editado",
  "description": "Probando API",
  "functions": [1,3]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I008",
        "text": "Rol - Modificado exitosamente!"
    }
}
```

## Activity

- https://ignus-backend-jchiquin.c9users.io/api/activity (GET)

Get list of activities
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Suscribirse al sistema",
            "description": "Suscribirse al sistema"
        },
        {
            "id": 2,
            "name": "Solicitar servicio",
            "description": "Solicitar servicio"
        },
       .
       .
       .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/activity (POST)

Create a new activity.

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I015",
        "text": "Actividad - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/activity/:id (PUT)

Update an activity by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I017",
        "text": "Actividad - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/activity/:id (DELETE)

Delete an activity by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I019",
        "text": "Actividad - Eliminado exitosamente!"
    }
}
```

## SocialNetwork

- https://ignus-backend-jchiquin.c9users.io/api/socialNetwork (GET)

Get list of social networks
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Facebook",
            "urlLogo": "https://ignus-backend-jchiquin.c9users.io/public/imgs/socialNetwork/facebook.png",
            "urlAgencySocialNetwork": "https://www.facebook.com/",
            "fontAwesome": "fa-facebook"
        },
        {
            "id": 2,
            "name": "Twitter",
            "urlLogo": "https://ignus-backend-jchiquin.c9users.io/public/imgs/socialNetwork/twitter.png",
            "urlAgencySocialNetwork": "https://twitter.com/",
            "fontAwesome": "fa-twitter"
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/socialNetwork/:id (PUT)

Update agency's url social network by ID

INPUT
```json
{
  "urlAgencySocialNetwork" : "https://urlredsocial.com/inmobiliarium"
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I023",
        "text": "Red social - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/socialNetwork/:id (DELETE)

Delete a socialNetwork by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I025",
        "text": "Red social - Eliminado exitosamente!"
    }
}
```

## Functions

- https://ignus-backend-jchiquin.c9users.io/api/function (GET)

Get list of functions
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Registrar",
            "description": "Cambiar luego",
            "roles": [
                {
                    "id": 1,
                    "name": "Root",
                    "description": "Modo Dios"
                }
            ]
        },
        {
            "id": 2,
            "name": "Gestionar contratos",
            "description": "Cambiar luego",
            "roles": [
                {
                    "id": 1,
                    "name": "Root",
                    "description": "Modo Dios"
                },
                {
                    "id": 3,
                    "name": "Empleado",
                    "description": "Rol Empleado"
                }
            ]
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/function/:id (GET)

Get one function
 
OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Registrar",
        "description": "Cambiar luego",
        "roles": [
            {
                "id": 1,
                "name": "Root",
                "description": "Modo Dios"
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/function/:id (PUT)

Update an function by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I014",
        "text": "Función - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/function/linkable (GET)

Get a List of Functions with Links. (For set functions to roles)

*Note: Use the description attribute for fill a Select*

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Dashboard",
            "description": "Dashboard",
            "link": "/dashboard",
            "icon": "fa fa-fw fa-dashboard"
        },
        {
            "id": 2,
            "name": "Dashboard",
            "description": "Dashboard (Cliente)",
            "link": "/dashboardcustomer",
            "icon": "fa fa-fw fa-dashboard"
        },
        {
            "id": 5,
            "name": "Registro",
            "description": "Transaccion-Solictud-Registro",
            "link": "/registrosolicitud",
            "icon": "fa fa-user"
        },
        {
            "id": 6,
            "name": "Atención",
            "description": "Transaccion-Solictud-Atencion",
            "link": "/solicitud",
            "icon": "fa fa-building"
        },
        .
        .
        .
    ]
}
```

## TypeRequest

- https://ignus-backend-jchiquin.c9users.io/api/typeRequest (GET)

Get list of type requests
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Visita a inmueble",
            "description": "Solicitar visita a inmueble"
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeRequests (POST)

Create a new type request.

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I033",
        "text": "Tipo de solicitud - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeRequest/:id (PUT)

Update a type request by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I035",
        "text": "Tipo de solicitud - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeRequest/:id (DELETE)

Delete a type request by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I037",
        "text": "Tipo de solicitud - Eliminado exitosamente!"
    }
}
```

## Warranty

- https://ignus-backend-jchiquin.c9users.io/api/warranty (GET)

Get list of Warranties
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Daños electricos",
            "description": "Servicio",
            "contracts": [
                {
                    "id": 1,
                    "folioNumber": "F003",
                    "elaborationDate": "09/12/2018",
                    "firmDate": "13/01/2019"
                }
            ]
        },
        {
            "id": 2,
            "name": "Vigilancia",
            "description": "Vigilantes en el estacionamiento",
            "contracts": [
                {
                    "id": 1,
                    "folioNumber": "F003",
                    "elaborationDate": "09/12/2018",
                    "firmDate": "13/01/2019"
                }
            ]
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/warranty/:id (GET)

Get one Warranty
 
OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Daños electricos",
        "description": "Servicio",
        "contracts": [
            {
                "id": 1,
                "folioNumber": "F003",
                "elaborationDate": "09/12/2018",
                "firmDate": "13/01/2019"
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/warranty (POST)

Create a new warranty.

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I018",
        "text": "Garantia - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/warranty/:id (PUT)

Update a warranty by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I020",
        "text": "Garantia - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/warranty/:id (DELETE)

Delete a warranty by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I022",
        "text": "Garantia - Eliminado exitosamente!"
    }
}
```

## Contract

- https://ignus-backend-jchiquin.c9users.io/api/contract (GET)

Get list of Contracts
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "folioNumber": "F001",
            "elaborationDate": "09/12/2018",
            "firmDate": "13/01/2019",
            "urlFileContract": "https://ignus-backend-development-jchiquin.c9users.io/public/documents/contract/upload_7f6f0b66d8ee103937cb41e6e3a7b2f8.jpg",
            "owner": {
                "id": 2,
                "identification": "26141319",
                "firstName": "Jorge",
                "lastName": "Chiquín",
                "birthDate": "22/08/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            },
            "client": {
                "id": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "birthDate": "29/10/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            },
            "agent": {
                "id": 1,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeService": {
                "id": 3,
                "name": "Venta",
                "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                "urlImage": "localhost/public/imgs/typeService/venta.jpg",
                "offeringProperty": false
            },
            "warranties": []
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contract/:id (GET)

Get One Contract
 
OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "folioNumber": "F001",
        "elaborationDate": "09/12/2018",
        "firmDate": "13/01/2019",
        "urlFileContract": "https://ignus-backend-development-jchiquin.c9users.io/public/documents/contract/upload_7f6f0b66d8ee103937cb41e6e3a7b2f8.jpg",
        "owner": {
            "id": 2,
            "identification": "26141319",
            "firstName": "Jorge",
            "lastName": "Chiquín",
            "birthDate": "22/08/1995",
            "phoneNumber": "04167587462",
            "gender": "Masculino"
        },
        "client": {
            "id": 1,
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "birthDate": "29/10/1995",
            "phoneNumber": "04167587462",
            "gender": "Masculino"
        },
        "agent": {
            "id": 1,
            "identification": "24758462",
            "firstName": "José Rafael",
            "lastName": "Camacaro",
            "gender": "Masculino"
        },
        "typeService": {
            "id": 3,
            "name": "Venta",
            "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
            "urlImage": "localhost/public/imgs/typeService/venta.jpg",
            "offeringProperty": false
        },
        "warranties": []
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contract (POST)

Create a new contract.

INPUT
```json
{
    "folioNumber" : "",
    "elaborationDate" : "",
    "firmDate": "",
    "TransactionId": 1,
    "warranties": [1,2,5],
    "document": file
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I024",
        "text": "Contrato - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contract/:id (PUT)

Update a contract by id

INPUT
```json
{
    "folioNumber" : "",
    "elaborationDate" : "",
    "firmDate": "",
    "warranties": [1,2,5],
    "document": file
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I026",
        "text": "Contrato - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contract/:id (DELETE)

Delete a contract by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I028",
        "text": "Contrato - Eliminado exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/contract/warranty/:id (GET)

Get a list of Warranties of one contract

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Daños electricos",
            "description": "Servicio"
        },
        {
            "id": 2,
            "name": "Vigilancia",
            "description": "Vigilantes en el estacionamiento"
        }
    ]
}
```

## TypeIncidence 

- https://ignus-backend-jchiquin.c9users.io/api/typeIncidence/ (GET)

get a List of Type Incidences

OUTPUT
``` json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Error de contrato",
            "description": "Cambiar luego"
        },
        {
            "id": 2,
            "name": "Disponibilidad",
            "description": "Cambiar luego"
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeIncidence/:id (GET)

get one Type Incidence

OUTPUT
``` json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Error de contrato",
        "description": "Cambiar luego"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeIncidence/ (POST)

Create a new Type of Incidence

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I102",
        "text": "Tipo de incidencia - creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeIncidence/:id (PUT)

Modify a Type of Incidence

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I104",
        "text": "Tipo de incidencia - modificado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeIncidence/:id (DELETE)

Delete a Type of Incidence

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I106",
        "text": "Tipo de incidencia - eliminado exitosamente"
    }
}
```

## Incidence

- https://ignus-backend-jchiquin.c9users.io/api/incidence?userId (GET)

get a list of Incidences by userId (optional)

https://ignus-backend-jchiquin.c9users.io/api/incidence?userId=1  All incidence of userId 1

https://ignus-backend-jchiquin.c9users.io/api/incidence  All incidence


OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Problema a la hora de firmar el contrato",
            "description": "Ocurrio un problema",
            "date": "11/01/2019",
            "status": "Por responder",
            "decision": "Transacción cancelada", //Only if already has decision
            "conclusion": "Prueba", //Only if already has decision
            "transaction": {
                "id": 1,
                "status": "En proceso",
                "nameForClient": "Venta, agente: José Rafael Camacaro - En proceso",
                "nameForEmployee": "Venta, cliente: Ysidro José Fernández Sangronis - En proceso",
                "request": {
                    "id": 1,
                    "requestDate": "28/12/2018",
                    "wishDate": "31/12/2018",
                    "status": "Aprobada"
                },
                "client": {
                    "id": 1,
                    "userId": 1,
                    "username": "ysidrofernandez3012@gmail.com",
                    "identification": "25638459",
                    "firstName": "Ysidro José",
                    "lastName": "Fernández Sangronis",
                    "bankName": "Provincial",
                    "bankAccount": "01089298237843892366",
                    "birthDate": "30/10/1995",
                    "gender": "Masculino"
                },
                "employee": {
                    "id": 1,
                    "userId": 2,
                    "identification": "24758462",
                    "firstName": "José Rafael",
                    "lastName": "Camacaro",
                    "gender": "Masculino"
                },
                "typeService": {
                    "id": 1,
                    "name": "Compra",
                    "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                    "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                    "offeringProperty": true
                }
            },
            "typeIncidence": {
                "id": 1,
                "name": "Error de contrato",
                "description": "Cambiar luego"
            }
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/incidence/:id (GET)

get One Incidence

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Problema a la hora de firmar el contrato",
        "description": "Ocurrio un problema",
        "date": "05/01/2019",
        "decision": "Transacción cancelada", //Only if already has decision
        "conclusion": "Prueba", //Only if already has decision
        "transaction": {
            "id": 1,
            "status": "En proceso",
            "request": {
                "id": 1,
                "requestDate": "05/01/2019",
                "wishDate": "30/12/2018",
                "status": "Aprobada"
            },
            "client": {
                "id": 1,
                "username": "yfernandez",
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "birthDate": "29/10/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            },
            "employee": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            }
        },
        "typeIncidence": {
            "id": 1,
            "name": "Error de contrato",
            "description": "Cambiar luego"
        }
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/incidence/ (POST)

Create a incidence

INPUT
``` json
{
    "name": "Prueba incidencia",
    "description": "Probando API",
    "TransactionId": 1,
    "TypeIncidenceId": 1
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I030",
        "text": "Incidencia - Creado exitosamente"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/incidence/:id (PUT)

Edit one Incidence

INPUT
``` json
{
    "name": "Prueba incidencia",
    "description": "Probando API",
    "TransactionId": 1,
    "TypeIncidenceId": 1
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I032",
        "text": "Incidencia - Modificado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/incidence/:id (DELETE)

Delete one incidence

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I034",
        "text": "Incidencia - Eliminado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/incidence/respond/:id (PUT)

*Note: the id belongs to the Incidence*

Respond a Incidence and send a email.

INPUT
```json
{
    "message": "",
    "decision": true // To decide if the transaction is canceled or continue
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I073",
        "text": "Incidencia - Decisión tomada exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/incidence/count/:userId (GET)

Get count of incidences by userId

OUTPUT

```json
{
    "status": true,
    "data": {
        "count": 3
    }
}
```

## TypeSpecification

- https://ignus-backend-jchiquin.c9users.io/api/typeSpecification/ (GET)

get a List of Type Specifications

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Estructura",
            "description": "Especificaciones de infraestructura"
        },
        {
            "id": 2,
            "name": "Diseño",
            "description": "Color, tipo de piso, etc"
        },
        {
            "id": 3,
            "name": "Ubicación",
            "description": "Especificaciones de ubicaciones"
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeSpecification/:id (GET)

get a One Type Specifications

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Estructura",
        "description": "Especificaciones de infraestructura",
        "specifications": {
            "{{#each typeSpecification.Specifications}}": {
                "id": "{{this.id}}",
                "name": "{{this.name}}",
                "description": "{{this.description}}"
            }
        }
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeSpecification/ (POST)

Create a type of Specification

INPUT

```json
{
    "name": "",
    "description": ""
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I036",
        "text": "Tipo de Especificacion - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeSpecification/:id (PUT)

Edit a type of Specification

INPUT

```json
{
    "name": "",
    "description": ""
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I038",
        "text": "Tipo de Especificacion - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeSpecification/:id (DELETE)

Delete a type of specifications

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I040",
        "text": "Tipo de Especificacion - Eliminado exitosamente"
    }
}
```
## Specification

- https://ignus-backend-jchiquin.c9users.io/api/Specification/ (GET)

get a List of Specifications

*Note: you can pass filter by params*

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| type          | c             | Filter by typeInput 'checkbox' |
| type          | n             | Filter by typeInput 'number'   |

OUTPUT
``` json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Cantidad habitaciones",
            "description": "numero de habitaciones"
        },
        {
            "id": 2,
            "name": "Color",
            "description": "Color"
        },
        {
            "id": 3,
            "name": "Este de la ciudad",
            "description": "Especificaciones de ubicaciones"
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/specification/:id (GET)

get a One Specifications

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Cantidad habitaciones",
        "description": "numero de habitaciones"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/specification/ (POST)

Create One Specification

INPUT
```json
{
    "name": "Nuevo con Array",
    "description": "Description array",
    "typeInput": "",
    "TypeSpecificationId": 1,
    "TypeProperties": [1,2]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I108",
        "text": "Especificación - creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/specification/:id (PUT)

Modify One Specification

INPUT
```json
{
    "name": "Nuevo con Array",
    "description": "Description array",
    "typeInput": "",
    "TypeSpecificationId": 1,
    "TypeProperties": [1,2]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I110",
        "text": "Especificación - modificado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/specification/:id (DELETE)

Delete One Specification

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I112",
        "text": "Especificación - eliminado exitosamente"
    }
}
```

## State

- https://ignus-backend-jchiquin.c9users.io/api/state (GET)

Get list of states
 
OUTPUT

```json 
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Amazonas",
        },
        {
            "id": 2,
            "name": "Anzoátegui",
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/state/city/:id (GET)

Get state's cities by id (:id)
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 188,
            "name": "Aguada Grande",
        },
        {
            "id": 189,
            "name": "Atarigua",
        },
        .
        .
  ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/state/municipality/:id (GET)

Get state's municipalities by id (:id)
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 144,
            "name": "Andrés Eloy Blanco"
        },
        {
            "id": 145,
            "name": "Crespo"
        },
        .
        .
  ]
}
```
## Municipality

- https://ignus-backend-jchiquin.c9users.io/api/municipality/parish/:id (GET)

Get munucipality's parishes by id (:id)
 
OUTPUT

```json 
{
    "status": true,
    "data": [
        {
            "id": 469,
            "name": "Aguedo Felipe Alvarado"
        },
        {
            "id": 470,
            "name": "Buena Vista"
        },
        .
        .
    ]
}
```

## Promotion

- https://ignus-backend-jchiquin.c9users.io/api/promotion/ (GET)

get a List of Promotions 

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Apartamentos a mitad de precio",
            "description": "No te lo pierdas!",
            "urlImage": "localhost/public/imgs/promotion/promociones.png"
        },
        {
            "id": 2,
            "name": "Casas con 2 cuartos en oferta",
            "description": "Oferta",
            "urlImage": "localhost/public/imgs/promotion/promociones.png"
        },
        {
            "id": 3,
            "name": "Alquila un apartamento y lo pintamos",
            "description": "Promocion",
            "urlImage": "localhost/public/imgs/promotion/promociones.png"
        },
    ]
}
```

*Note: Pass status query for get promotions depending of Its status*

Available status:
- *G: Generado*
- *I: Inactivo*
- *A: Activo*

For example
- https://ignus-backend-jchiquin.c9users.io/api/promotion?status=I,A (GET)

OUTPUT

```json
{
    "status": true,
    "data": [
        {
            "id": 3,
            "name": "Alquila un apartamento y lo pintamos",
            "description": "Promocion",
            "properties": [],
            "specification": {
                "id": 1,
                "name": "Cantidad habitaciones",
                "description": "numero de habitaciones",
                "properties": []
            }
        },
        {
            "id": 4,
            "name": "Nueva promocion",
            "description": "Testeando endpoints modificados",
            "properties": [
                {
                    "id": 1,
                    "ubication": "Zona este, Av Lara",
                    "buildDate": "13/02/1991",
                    "nameDisplay": "Casa en Zona este, Av Lara, propietario: Jorge Chiquín"
                }
            ],
            "specification": {
                "properties": []
            }
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/:id (GET)

get a One Promotion (Property not for now)

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Apartamentos a mitad de precio",
        "description": "No te lo pierdas!",
        "urlImage": "localhost/public/imgs/promotion/promociones.png"
    }
}
```

*You can use the exact same status query for individual searchs* 

*EXAMPLE*

- https://ignus-backend-jchiquin.c9users.io/api/promotion/:id?status=I (GET)

OUTPUT
```json
{
        "id": 1,
        "name": "Apartamentos a mitad de precio",
        "description": "No te lo pierdas!",
        "status": "I",
        "bin_status": false,
        "urlImage": "localhost/public/imgs/promotion/promociones.png",
        "properties": [],
        "specifications": [
            {
                "id": 1,
                "name": "Cantidad de baños",
                "properties": [
                    {
                        "id": 1,
                        "ubication": "Zona este, Av Lara",
                        "buildDate": "13/02/1991",
                        "nameDisplay": "Casa en Zona este, Av Lara, propietario: Jorge Chiquín"
                    },
                    {
                        "id": 2,
                        "ubication": "Duaca",
                        "buildDate": "09/08/2003",
                        "nameDisplay": "Casa en Duaca, propietario: Ysidro José Fernández Sangronis"
                    }
                ]
            },
            {
                "id": 6,
                "name": "Ascensor",
                "properties": [
                    {
                        "id": 3,
                        "ubication": "Zona Oeste",
                        "buildDate": "09/08/2003",
                        "nameDisplay": "Apartamento en Zona Oeste, propietario: Luis Barraez"
                    }
                ]
            },
            {
                "id": 4,
                "name": "Número de plantas",
                "properties": [
                    {
                        "id": 3,
                        "ubication": "Zona Oeste",
                        "buildDate": "09/08/2003",
                        "nameDisplay": "Apartamento en Zona Oeste, propietario: Luis Barraez"
                    }
                ]
            }
        ]
    }
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/ (POST)

Create a Promotion

INPUT

```json
{
    "name": "",
    "description": "",
    "image": file
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I042",
        "text": "Promoción - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/:id (PUT)

Edit a Promotion

INPUT

```json
{
    "name": "",
    "description": "",
    "image": file
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I044",
        "text": "Promoción - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/:id (DELETE)

Delete a Promotion

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I046",
        "text": "Promoción - Eliminado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/properties/:id (PUT)

Add properties to one Promotion

*note: pass the ids of each property*

INPUT
```json
{
    "properties": [1,2,...]
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I044",
        "text": "Promoción - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/specifications/:id (PUT)

Add Specifications to one Promotion

INPUT
```json
{
	"specifications": [1,4,6]
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I044",
        "text": "Promoción - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/activate/:promotion_id (PUT)

Activate or Deactivate a Promotion

INPUT
```json
{
    "activate": boolean
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I044",
        "text": "Promoción - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/promotion/remove/:id (PUT)

Remove a active promotion

```json
{
    "status": true,
    "message": {
        "code": "I090",
        "text": "Promoción - Removida exitosamente"
    }
}
```

## Request

- https://ignus-backend-jchiquin.c9users.io/api/request/pending (GET)

Get list of pending request `Deprecated`

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 2,
            "requestDate": "14/12/2018",
            "wishDate": "31/12/2018",
            "status": "Solicitada",
            "client": {
                "id": 1,
                "userId": 2,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino",
                "phoneNumber": "04164567694"
            },
            "employee": {},
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "typeRequest": {
                "id": 3,
                "name": "Servicio",
                "description": "Solicitar un servicio"
            }
        }
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/request?status&userId (GET)

Get list of request by status (optional) and userId

```javascript
S: "Solicitada",
R: "Rechazada",
A: "Aprobada",
F: "Finalizada"
```
Example:
```
?status=S,A,R   All requests applied for, approved and rejected
?status=F       All requests finished
?status         All request
?userId         All request of One User
```

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 2,
            "requestDate": "14/12/2018",
            "nameForClient": "Venta, agente: José Rafael José Rafael - Aprobada",
            "nameForEmployee": "Venta, cliente: Ysidro José Ysidro José - Aprobada",
            "wishDate": "31/12/2018",
            "status": "Solicitada",
            "client": {
                "id": 1,
                "userId": 2,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino",
                "phoneNumber": "04164567694"
            },
            "employee": {},
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "typeRequest": {
                "id": 3,
                "name": "Servicio",
                "description": "Solicitar un servicio"
            },
	        "property": {
	            "id": 5,
	            "ubication": "Sector tamaca, calle 14 entre Av. 1A y 1B",
	            "buildDate": "23/01/1983",
	            "status": "Reservado",
	            "typeProperty": {
	                "id": 7,
	                "name": "Habitación"
	            },
	            "state": {
	                "id": 4,
	                "name": "Aragua"
	            },
	            "municipality": {
	                "id": 44,
	                "name": "Mario Briceño Iragorry"
	            },
	            "parish": {
	                "id": 130,
	                "name": "El Limón"
	            }
	        }
        }
        .
        .
    ]
}
```


- https://ignus-backend-jchiquin.c9users.io/api/request/pending (POST)

Create a request for type of service

INPUT

```json
{
   "ClientId":1,
   "EmployeeId":1,
   "wishDate":"25/01/2019",
   "turn":"AM",
   "PropertyId":2,
   "TypePropertyId":1,
   "TypeServiceId":1,
   "TypeRequestId":3,
   "ParishId":480,
   "typeSpecifications":[
      {
         "id":1,
         "name":"Estructura",
         "description":"Especificaciones de infraestructura",
         "specifications_checkbox":[
            {
               "id":3,
               "name":"Estacionamiento",
               "typeInput":"checkbox",
               "quantity":true,
            },
            .
            .
         ],
         "specifications_number":[
            {
               "id":1,
               "name":"Cantidad de baños",
               "typeInput":"number",
               "quantity":"2"
            },
            .
            .
         ]
      },
      .
      .
   ]
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I042",
        "text": "Solicitud - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/request/pending/approve/:id (PUT)

Approve a request

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I045",
        "text": "Solicitud - Aprobada exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/request/count/:userId (GET)

Get count of requests by userId

OUTPUT

```json
{
    "status": true,
    "data": {
        "count": 3
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/request/pending/reject/:requestId (PUT)

Reject request by requestId

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I085",
        "text": "Solicitud - Rechazada exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/request/:requestId (GET)

Get request by id

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 4,
        "requestDate": "22/12/2018",
        "nameForClient": "Alquiler, agente: Joan Rosendo - Solicitada",
        "nameForEmployee": "Alquiler, cliente: Ysidro José Fernández Sangronis - Solicitada",
        "wishDate": "31/12/2018",
        "status": "Solicitada",
        "client": {
            "id": 1,
            "userId": 1,
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "bankName": "Provincial",
            "bankAccount": "01089298237843892366",
            "birthDate": "30/10/1995",
            "gender": "Masculino",
            "phoneNumber": "04164567694"
        },
        "employee": {
            "id": 2,
            "userId": 3,
            "identification": "24841262",
            "firstName": "Joan",
            "lastName": "Rosendo",
            "phoneNumber": "04164567391",
            "gender": "Masculino"
        },
        "typeService": {
            "id": 2,
            "name": "Alquiler",
            "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
            "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/alquila.jpg",
            "offeringProperty": true
        },
        "typeRequest": {
            "id": 3,
            "name": "Servicio",
            "description": "Solicitar un servicio"
        },
        "property": {
            "id": 5,
            "ubication": "Sector tamaca, calle 14 entre Av. 1A y 1B",
            "buildDate": "23/01/1983",
            "status": "Reservado",
            "typeProperty": {
                "id": 7,
                "name": "Habitación"
            },
            "state": {
                "id": 4,
                "name": "Aragua"
            },
            "municipality": {
                "id": 44,
                "name": "Mario Briceño Iragorry"
            },
            "parish": {
                "id": 130,
                "name": "El Limón"
            }
        }
    }
}
```

## Property

- https://ignus-backend-jchiquin.c9users.io/api/property (GET)

Get list of Properties

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "ubication": "Zona este, Av Lara",
            "buildDate": "13/02/1991",
            "status": "Inicial",
            "nameDisplay": "Casa en Zona este, Av Lara, propietario: Jorge Chiquín",
            "typeProperty": {
                "id": 1,
                "name": "Casa"
            },
            "owner": [
                {
                    "id": 2,
                    "username": "jorgechiquinv@gmail.com",
                    "identification": "26141319",
                    "firstName": "Jorge",
                    "lastName": "Chiquín",
                    "birthDate": "22/08/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                }
            ],
            "state": {
                "id": 5,
                "name": "Barinas"
            },
            "municipality": {
                "id": 58,
                "name": "Barinas"
            },
            "parish": {
                "id": 180,
                "name": "Manuel Palacio Fajardo"
            },
            "TypeService": {
                "id": 3,
                "name": "Venta",
                "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                "urlImage": "localhost/public/imgs/typeService/venta.jpg",
                "offeringProperty": true
            },
            "Promotions": [],
            "typeSpecifications": [
                {
                    "id": 1,
                    "name": "Estructura",
                    "description": "Especificaciones de infraestructura",
                    "specifications_checkbox": [
                        {
                            "id": 3,
                            "name": "Estacionamiento",
                            "typeInput": "checkbox",
                            "quantity": 2,
                            "bin_quantity": false
                        }
                    ],
                    "specifications_number": [
                        {
                            "id": 1,
                            "name": "Cantidad de baños",
                            "typeInput": "number",
                            "quantity": 3
                        },
                        {
                            "id": 2,
                            "name": "Cantidad de habitaciones",
                            "typeInput": "number",
                            "quantity": 4
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Diseño",
                    "description": "Color, tipo de piso, etc",
                    "specifications_checkbox": [],
                    "specifications_number": []
                },
                {
                    "id": 3,
                    "name": "Cercanía",
                    "description": "Especificaciones de cercanía",
                    "specifications_checkbox": [],
                    "specifications_number": []
                }
            ]
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/:id (GET)

Get One Property

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "ubication": "Zona este, Av Lara",
        "buildDate": "13/02/1991",
        "status": "Inicial",
        "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, propietario: Jorge Chiquín",
        "typeProperty": {
            "id": 1,
            "name": "Casa"
        },
        "owner": [
            {
                "id": 2,
                "username": "jorgechiquinv@gmail.com",
                "identification": "26141319",
                "firstName": "Jorge",
                "lastName": "Chiquín",
                "birthDate": "22/08/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            }
        ],
        "state": {
            "id": 5,
            "name": "Barinas"
        },
        "municipality": {
            "id": 58,
            "name": "Barinas"
        },
        "parish": {
            "id": 180,
            "name": "Manuel Palacio Fajardo"
        },
        "TypeService": {
            "id": 3,
            "name": "Venta",
            "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
            "urlImage": "localhost/public/imgs/typeService/venta.jpg",
            "offeringProperty": true
        },
        "Promotions": [],
        "typeSpecifications": [
            {
                "id": 1,
                "name": "Estructura",
                "description": "Especificaciones de infraestructura",
                "specifications_checkbox": [
                    {
                        "id": 3,
                        "name": "Estacionamiento",
                        "typeInput": "checkbox",
                        "quantity": 2,
                        "bin_quantity": false
                    }
                ],
                "specifications_number": [
                    {
                        "id": 1,
                        "name": "Cantidad de baños",
                        "typeInput": "number",
                        "quantity": 3
                    },
                    {
                        "id": 2,
                        "name": "Cantidad de habitaciones",
                        "typeInput": "number",
                        "quantity": 4
                    }
                ]
            },
            {
                "id": 2,
                "name": "Diseño",
                "description": "Color, tipo de piso, etc",
                "specifications_checkbox": [],
                "specifications_number": []
            },
            {
                "id": 3,
                "name": "Cercanía",
                "description": "Especificaciones de cercanía",
                "specifications_checkbox": [],
                "specifications_number": []
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/pending/ (POST)

Create a Property

INPUT
```json 
{
  "ubication": "Barquisimeto",
  "buildDate": "11/10/1993",
  "specifications_checkbox": [1,3],
  "specifications_number": [2,4],
  "UserId": 5
}
```

OUTPUT

```json
{
    "status": true,
    "message": {
        "code": "I086",
        "text": "Inmueble - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/transaction/:id (POST)

Add a transaction for the property
*Note: the id belongs to the property*

INPUT
```json
{
  "TransactionId": ""
}
```
OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I084",
        "text": "Inmueble - Transacción asignada exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/:id (PUT)

update data of one property

INPUT
```json
{
    "ubication": "Ciudad",
  "buildDate": "date",
  "specifications_checkbox": [1,3],
    "specifications_number": [2,4],
  "ClientId": "",
    "TypeServiceId": ""
}
```
OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I088",
        "text": "Inmueble - Modificado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/publication/:transactionId (PUT)

Create a publication for put in the catalogue

INPUT
```json
{
  "title": "Apartamento tipo estudio",
  "description": "Cualquier descripcion...",
  "price": 25000.00,
  "file": images files
}
```
OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I120",
        "text": "Inmueble - publicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/property/catalogue (GET)

Get a list of Properties that are available

#### You can pass params for Filter the properties. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeP         | 1,2           | Filter by type Property 'Casa and Apartamento' |
| typeS         | 3,2           | Filter by type Service 'Venta y Alquiler' |
| state         | Barinas       | Filter by State 'Barinas'      |
| munilipality  | Rojas         | Filter by Municipality 'Rojas' |
| parish        | Libertad      | Filter by Parish 'Libertad'    |

*Note: you can make many combinations of params filters, like this:*

- https://ignus-backend-jchiquin.c9users.io/api/property/catalogue?typeP=2&status=Barinas (GET)

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 3,
            "ubication": "Zona Oeste",
            "buildDate": "09/08/2003",
            "status": "Publicado",
            "nameDisplay": "Apartamento en Zona Oeste, propietario: Luis Barraez",
            "typeProperty": {
                "id": 2,
                "name": "Apartamento"
            },
            "owner": [
                {
                    "id": 3,
                    "username": "jochix21@gmail.com",
                    "identification": "24386994",
                    "firstName": "Luis",
                    "lastName": "Barraez",
                    "birthDate": "18/05/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                }
            ],
            "state": {
                "id": 6,
                "name": "Bolívar"
            },
            "municipality": {
                "id": 75,
                "name": "Sucre"
            },
            "parish": {
                "id": 250,
                "name": "Aripao"
            },
            "TypeService": {
                "id": 2,
                "name": "Alquiler",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "localhost/public/imgs/typeService/alquila.jpg"
            },
            "Promotions": [],
            "typeSpecifications": [
                {
                    "id": 1,
                    "name": "Estructura",
                    "description": "Especificaciones de infraestructura",
                    "specifications_checkbox": [
                        {
                            "id": 6,
                            "name": "Ascensor",
                            "typeInput": "checkbox",
                            "quantity": 1,
                            "bin_quantity": false
                        }
                    ],
                    "specifications_number": [
                        {
                            "id": 2,
                            "name": "Cantidad de habitaciones",
                            "typeInput": "number",
                            "quantity": 2
                        },
                        {
                            "id": 4,
                            "name": "Número de plantas",
                            "typeInput": "number",
                            "quantity": 3
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Diseño",
                    "description": "Color, tipo de piso, etc",
                    "specifications_checkbox": [],
                    "specifications_number": []
                },
                {
                    "id": 3,
                    "name": "Cercanía",
                    "description": "Especificaciones de cercanía",
                    "specifications_checkbox": [],
                    "specifications_number": []
                }
            ],
            "Publication": {
                "id": 1,
                "title": "Apartamento tipo estudio",
                "description": "Apartamento full equipo",
                "price": 21000,
                "images": [
                    {
                        "id": 2,
                        "url": "localhost/public/imgs/property/apartamento.jpg",
                        "description": "Sala"
                    },
                    {
                        "id": 3,
                        "url": "localhost/public/imgs/property/apartamento2.jpg",
                        "description": "Cocina"
                    }
                ]
            }
        },
        .
        .
        .
    ]
}
```

## TypeProperty

- https://ignus-backend-jchiquin.c9users.io/api/typeProperty (GET)

Get a list of Type Properties

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Apartamento",
            "description": "Edificios",
            "properties": [
                {
                    "id": 1,
                    "ubication": "Zona este, Av Lara",
                    "buildDate": "13/02/1991",
                    "TypeService": {
                        "id": 3,
                        "name": "Venta",
                        "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                        "urlImage": "localhost/public/imgs/typeService/venta.jpg",
                        "offeringProperty": true
                    },
                    "Promotions": [
                        {
                            "id": 3,
                            "name": "Alquila un apartamento y lo pintamos",
                            "description": "Promocion"
                        }
                    ]
                }
            ],
            "specifications": [
                {
                    "id": 1,
                    "name": "Cantidad habitaciones",
                    "description": "numero de habitaciones"
                },
                {
                    "id": 2,
                    "name": "Color",
                    "description": "Color"
                }
            ]
        },
        .
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeProperty/:id (GET)

Get one Type Property

OUTPUT

```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Apartamento",
        "description": "Edificios",
        "properties": [
            {
                "id": 1,
                "ubication": "Zona este, Av Lara",
                "buildDate": "13/02/1991",
                "TypeService": {
                    "id": 3,
                    "name": "Venta",
                    "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                    "urlImage": "localhost/public/imgs/typeService/venta.jpg",
                    "offeringProperty": true
                },
                "Promotions": [
                    {
                        "id": 3,
                        "name": "Alquila un apartamento y lo pintamos",
                        "description": "Promocion"
                    }
                ]
            }
        ],
        "specifications": [
            {
                "id": 1,
                "name": "Cantidad habitaciones",
                "description": "numero de habitaciones"
            },
            {
                "id": 2,
                "name": "Color",
                "description": "Color"
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeProperty/specification/:id (GET)

*Note: The ID belongs to the type property*

Get all Type specifications and specific especifications for one type of property

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Estructura",
            "description": "Especificaciones de infraestructura",
            "specifications_checkbox": [
                {
                    "id": 3,
                    "name": "Estacionamiento",
                    "typeInput": "checkbox",
                    "quantity": 0,
                    "bin_quantity": false
                },
                {
                    "id": 6,
                    "name": "Ascensor",
                    "typeInput": "checkbox",
                    "quantity": 0,
                    "bin_quantity": false
                },
                {
                    "id": 8,
                    "name": "Cocina",
                    "typeInput": "checkbox",
                    "quantity": 0,
                    "bin_quantity": false
                },
                {
                    "id": 9,
                    "name": "Sala",
                    "typeInput": "checkbox",
                    "quantity": 0,
                    "bin_quantity": false
                }
            ],
            "specifications_number": [
                {
                    "id": 1,
                    "name": "Cantidad de baños",
                    "typeInput": "number",
                    "quantity": 0,
                    "bin_quantity": false
                },
                {
                    "id": 2,
                    "name": "Cantidad de habitaciones",
                    "typeInput": "number",
                    "quantity": 0
                },
                {
                    "id": 4,
                    "name": "Número de plantas",
                    "typeInput": "number",
                    "quantity": 0
                },
                {
                    "id": 7,
                    "name": "Metros cuadrados",
                    "typeInput": "number",
                    "quantity": 0
                }
            ]
        }
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeProperty/ (POST)

Create a type of Property

INPUT
```json
{
    "name": "",
    "description": "",
    "specifications": []
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I056",
        "text": "Tipo de Inmueble - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeProperty/:id (PUT)

Update a type of Property

INPUT
```json
{
    "name": "",
    "description": "",
    "specifications": []
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I058",
        "text": "Tipo de Inmueble - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeProperty/:id (DELETE)

Delete a type of Property

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I060",
        "text": "Tipo de Inmueble - Eliminado exitosamente"
    }
}
```

## TypeContact

- https://ignus-backend-jchiquin.c9users.io/api/typeContact/ (GET)

Get a list of Types Contacts (The user can be blank or null)

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 3,
            "name": "Dudas",
            "description": "Dudas de personas",
            "contacts": [
                {
                    "id": 3,
                    "name": "Como publico mi apartamento ?",
                    "description": "duda",
                    "user": {
                        "id": 1,
                        "username": "yfernandez",
                        "identification": "25638459",
                        "firstName": "Ysidro José",
                        "lastName": "Fernández Sangronis",
                        "birthDate": "29/10/1995",
                        "phoneNumber": "04167587462",
                        "gender": "Masculino"
                    }
                }
            ]
        },
        .
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeContact/:id (GET)

Get a one Type Contact (The user can be blank or null)

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 3,
        "name": "Dudas",
        "description": "Dudas de personas",
        "contacts": [
            {
                "id": 3,
                "name": "Como publico mi apartamento ?",
                "description": "duda",
                "user": {
                    "id": 1,
                    "username": "yfernandez",
                    "identification": "25638459",
                    "firstName": "Ysidro José",
                    "lastName": "Fernández Sangronis",
                    "birthDate": "29/10/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                }
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeContact/ (POST)

Create a type of Contact

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I048",
        "text": "Tipo de contacto - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeContact/:id (PUT)

Update a type of Contact

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I050",
        "text": "Tipo de contacto - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeContact/:id (DELETE)

Delete a type of Contact

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I052",
        "text": "Tipo de contacto - Eliminado exitosamente"
    }
}
```

## Subject (Contact)

- https://ignus-backend-jchiquin.c9users.io/api/subject (GET)

Get list of subjects
 
OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Respecto al Servicio",
        },
        {
            "id": 2,
            "name": "Atencion al cliente",
        },
        .
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/subject (POST)

Create a new subject.

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I003",
        "text": "Tema - Creado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/subject/:id (PUT)

Update a subject by id

INPUT
```json
{
    "name" : "",
    "description" : ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I005",
        "text": "Tema - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/subject/:id (DELETE)

Delete a subject by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I007",
        "text": "Tema - Eliminado exitosamente!"
    }
}
```

## Contact

- https://ignus-backend-jchiquin.c9users.io/api/contact/ (GET)

Get a list of Contacts (The user can be Blank or null)

#### You can pass filter for see the contacts.

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| userId        | 1             | Filter by UserId  |
| status        | A             | Filter by contacts that already been respond |
| status        | B             | Filter by contacts that not have been respond|


OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 3,
            "name": "Como publico mi apartamento ?",
            "description": "duda",
            "contactDate": "10/01/2019",
            "status": "Por responder",
            "subject": {
                "id": 1,
                "name": "Respecto al Servicio",
                "description": "falta poner"
            },
            "typeContact": {
                "id": 3,
                "name": "Dudas",
                "description": "Dudas de personas"
            },
            "user": {
                "id": 1,
                "username": "ysidrofernandez3012@gmail.com",
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "birthDate": "30/10/1995",
                "phoneNumber": "04167587462",
                "gender": "Masculino"
            }
        },
        .
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/contact/:id (GET)

Get a one Contact (The user can be Blank or null)

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 3,
        "name": "Como publico mi apartamento ?",
        "description": "duda",
        "contactDate": "10/01/2019",
        "status": "Por responder",
        "subject": {
            "id": 1,
            "name": "Respecto al Servicio",
            "description": "falta poner"
        },
        "typeContact": {
            "id": 3,
            "name": "Dudas",
            "description": "Dudas de personas"
        },
        "user": {
            "id": 1,
            "username": "ysidrofernandez3012@gmail.com",
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "birthDate": "30/10/1995",
            "phoneNumber": "04167587462",
            "gender": "Masculino"
        }
    },
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contact/ (POST)

Create a Contact

INPUT *If you are a user logged*
```json
{
  "name": "titulo",
    "description": "cuento",
    "TypeContactId": 1,
    "SubjectId": 3,
    "UserId": 4
}
```

INPUT *If you are not register*
```json
{
  "name": "titulo",
    "description": "cuento",
    "TypeContactId": 1,
    "SubjectId": 3,
    "email": "jorgechiquinv@gmail.com"
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I054",
        "text": "Contacto - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contact/respond/:id (PUT)

*Note: the id belongs to the contact*

Respond a Contact and send a email.

INPUT
```json
{
    "message": "",
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I062",
        "text": "Contacto - atendido"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/contact/:contactId (DELETE)

Delete a contact by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I065",
        "text": "Contacto - Eliminado exitosamente!"
    }
}
```

## Transaction

- https://ignus-backend-jchiquin.c9users.io/api/transaction?status&userId&offeringProperty (GET)

Get a list of transactions  by status (optional), userId (client or agent) and transactions which offering property to clients (sell, rent, etc)

```javascript
Status =>
P: "En proceso",
I: "Incidencia",
F: "Finalizada",
C: "Cancelada",
D: "Completada",
H: "Publicada en catalogo",
Q: "Calificado",
R: "Reservada"

offeringProperty =>
true: "sell, rent, etc",
false: "buy, lease, etc"
```

Example:

| query | result |
| ------ | ------ |
|`?status=P,F,C`| All transactions canceled, in process, in incidence|
|`?status=P`| All transactions in process|
|`?status`| All transacions|
|`?status=P&userId=1`| All transactions in process of userId 1 |
|`?status=P,F,C&userId=1`| All transactions canceled, in process, in incidence of userId 1|
|`?userId=1`| All transaction of userId1|
|`?status=D&offeringProperty=true`| All transaction completed that offering properties (available to reserve)|
|`?status=D&offeringProperty=false`| All transaction completed that no offering properties available to publish)|
|``|All transactions|

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "status": "En proceso",
            "nameForClient": "Venta, agente: José Rafael Camacaro - En proceso",
	        "nameForEmployee": "Venta, cliente: Ysidro José Fernández Sangronis - En proceso",
            "request": {
                "id": 2,
                "requestDate": "18/12/2018",
                "wishDate": "31/12/2018",
                "status": "Aprobada"
            },
            "client": {
                "id": 1,
                "userId": 1,
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino"
            },
            "employee": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeService": {
                "id": 1,
                "name": "Compra",
                "description": "¿No encuentra lo que busca? Nosotros lo encontramos para usted, ponga sus expectativas y nosotros el inmueble. Visite nuestro catálogo de inmuebles, tenemos las mejores ofertas y promociones.",
                "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/compra.jpg",
                "offeringProperty": true
            },
            "activities": [
              {
                  "id": 1,
                  "name": "Suscribirse al sistema",
                  "description": "Suscribirse al sistema",
                  "reviewDate": "06/01/2019",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Solicitar servicio",
                  "description": "Solicitar servicio",
                  "nextToExecute": true,
                  "reviewDate": "06/01/2019",
                  "observation": "Datos erróneos",
                  "status": "Rechazado"
              },
              {
                  "id": 3,
                  "name": "Solcitar cita",
                  "description": "Solcitar cita",
                  "status": "Espera"
              },
              .
              .
            ],
            "requirements": [
                {
                  "id": 1,
                  "name": "Títulos supletorios.",
                  "description": "Subir Títulos supletorios.",
                  "reviewDate": "30/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_7789587b43a1b1a0da795b23f973ccf9.pdf",
                  "uploadDate": "29/12/2018",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Declaración sucesoral (principal).",
                  "description": "Subir Declaración sucesoral (principal).",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
                  "uploadDate": "30/12/2018",
                  "status": "Espera"
              },
              {
                  "id": 3,
                  "name": "Declaración sucesoral (sustitutiva).",
                  "description": "Subir Declaración sucesoral (sustitutiva).",
                  "reviewDate": "31/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_a2f03211f521be812168a94eb0dad7cc.txt",
                  "uploadDate": "30/12/2018",
                  "observation": "Documento no legible, subirlo de nuevo.",
                  "status": "Rechazado"
              },
                .
                .
            ],
            "property": {
                "id": 1,
                "ubication": "Zona este, Av Lara",
                "buildDate": "14/02/1991",
                "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, dueño: Jorge Chiquín",
                "typeProperty": {
                    "id": 1,
                    "name": "Casa"
                },
                "client": {
                    "id": 2,
                    "identification": "26141319",
                    "firstName": "Jorge",
                    "lastName": "Chiquín",
                    "birthDate": "23/08/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                },
                "TypeService": {
                    "id": 3,
                    "name": "Venta",
                    "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                    "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/venta.jpg",
                    "offeringProperty": false
                }
        }
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/:transactionId (GET)

Get a transaction by transactionId

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "status": "En proceso",
        "nameForClient": "Venta, agente: José Rafael Camacaro - En proceso",
      "nameForEmployee": "Venta, cliente: Ysidro José Fernández Sangronis - En proceso",
        "request": {
            "id": 1,
            "requestDate": "19/12/2018",
            "wishDate": "31/12/2018",
            "status": "Aprobada"
        },
        "client": {
            "id": 1,
            "userId": 1,
            "identification": "25638459",
            "firstName": "Ysidro José",
            "lastName": "Fernández Sangronis",
            "bankName": "Provincial",
            "bankAccount": "01089298237843892366",
            "birthDate": "30/10/1995",
            "gender": "Masculino"
        },
        "employee": {
            "id": 1,
            "userId": 2,
            "identification": "24758462",
            "firstName": "José Rafael",
            "lastName": "Camacaro",
            "gender": "Masculino"
        },
        "typeService": {
            "id": 3,
            "name": "Venta",
            "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
            "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeService/venta.jpg",
            "offeringProperty": true
        },
        "activities": [
              {
                  "id": 1,
                  "name": "Suscribirse al sistema",
                  "description": "Suscribirse al sistema",
                  "reviewDate": "06/01/2019",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Solicitar servicio",
                  "description": "Solicitar servicio",
                  "nextToExecute": true,
                  "reviewDate": "06/01/2019",
                  "observation": "Datos erróneos",
                  "status": "Rechazado"
              },
              {
                  "id": 3,
                  "name": "Solcitar cita",
                  "description": "Solcitar cita",
                  "status": "Espera"
              },
              .
              .
        ],
        "requirements": [
               {
                  "id": 1,
                  "name": "Títulos supletorios.",
                  "description": "Subir Títulos supletorios.",
                  "reviewDate": "30/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_7789587b43a1b1a0da795b23f973ccf9.pdf",
                  "uploadDate": "29/12/2018",
                  "status": "Aceptado"
              },
              {
                  "id": 2,
                  "name": "Declaración sucesoral (principal).",
                  "description": "Subir Declaración sucesoral (principal).",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_d926473ec94c079dcb2ab75560ff05a0.txt",
                  "uploadDate": "30/12/2018",
                  "status": "Espera"
              },
              {
                  "id": 3,
                  "name": "Declaración sucesoral (sustitutiva).",
                  "description": "Subir Declaración sucesoral (sustitutiva).",
                  "reviewDate": "31/12/2018",
                  "urlFileRequirement": "https://ignus-backend-jchiquin.c9users.io/public/documents/requirement/INITIAL_a2f03211f521be812168a94eb0dad7cc.txt",
                  "uploadDate": "30/12/2018",
                  "observation": "Documento no legible, subirlo de nuevo.",
                  "status": "Rechazado"
              },
                .
                .
            ],
            "property": {
                "id": 1,
                "ubication": "Zona este, Av Lara",
                "buildDate": "14/02/1991",
                "nameDisplay": "Casa, inmueble en: Zona este, Av Lara, dueño: Jorge Chiquín",
                "typeProperty": {
                    "id": 1,
                    "name": "Casa"
                },
                "client": {
                    "id": 2,
                    "identification": "26141319",
                    "firstName": "Jorge",
                    "lastName": "Chiquín",
                    "birthDate": "23/08/1995",
                    "phoneNumber": "04167587462",
                    "gender": "Masculino"
                },
                "TypeService": {
                    "id": 3,
                    "name": "Venta",
                    "description": "¿Desea vender o alquilar un inmueble sin riesgos? Su seguridad es nuestra prioridad, por ello contamos con los mejores asesores para gestionar las transacciones que desea. Contacte con nuestro equipo.",
                    "urlImage": "https://ignus-backend-development-jchiquin.c9users.io/public/imgs/typeService/venta.jpg",
                    "offeringProperty": false
                }
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/requirement/approve/:transactionId (PUT)

Approve a transaction's requirement by transactionId and requirementId

INPUT
```json
{
  "requirementId": 4
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I047",
        "text": "Transacción - Requisito aprobado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/requirement/reject/:transactionId (PUT)

Reject a transaction's requirement by transactionId and requirementId with observation

INPUT
```json
{
  "requirementId": 3,
  "observation": "Documento no legible, por favor subirlo de nuevo."
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I049",
        "text": "Transacción - Requisito rechazado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/requirement/upload/:transactionId (PUT)

Upload file of a transaction's requirement by transactionId and requirementId

INPUT

*Note: Upload the file (it could be of any type) by using `form-data` with any name you want*
```json
{
  "requirementId": 4
}
```
OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I051",
        "text": "Transacción - Requisito subido exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/activity/approve/:transactionId (PUT)

Approve a transaction's activity by transactionId and activityId

INPUT
```json
{
  "activityId": 4
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I053",
        "text": "Transacción - Actividad aprobada exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/activity/reject/:transactionId (PUT)

Reject a transaction's activity by transactionId and activityId

INPUT
```json
{
  "activityId": 4,
  "observation": "No se han cumplido los plazos"
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I055",
        "text": "Transacción - Actividad rechazada exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/reserve/:transactionId (PUT)

Reserve a transaction with its property by transactionId

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I081",
        "text": "Inmueble - Reservado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/removerReserve/:transactionId (PUT)

Remove reservation of transaction with its property by transactionId

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I083",
        "text": "Inmueble - Reserva eliminada exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/transaction/count/:userId (GET)

Get count of transactions by userId

OUTPUT

```json
{
    "status": true,
    "data": {
        "count": 3
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/transaction/services/:userId (GET)

Get count of Type Services transactions by userId

OUTPUT

```json
{
    "status": true,
    "data": [
        {
            "name": "Venta",
            "value": 1
        },
        {
            "name": "Alquiler",
            "value": 2
        },
        {
            "name": "Arrendamiento",
            "value": 1
        }
    ]
}
```

## QualificationCriteria

- https://ignus-backend-jchiquin.c9users.io/api/qualificationCriteria/ (GET)

get a list of Qualification criteria

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Muy malo"
        },
        {
            "id": 2,
            "name": "Malo"
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/qualificationCriteria/ (POST)

Create a qualification criteria

INPUT
``` json
{
    "name": "Excelente",
    "description": "Calificación máxima"
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I075",
        "text": "Criterio de calificación - Creado exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/qualificationCriteria/:id (PUT)

Edit one qualification criteria by id

INPUT
``` json
{
    "name": "Excelente",
    "description": "Calificación máxima"
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I075",
        "text": "Criterio de calificación - Modificado exitosamente!"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/qualificationCriteria/:id (DELETE)

Delete one qualificationCriteria

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I077",
        "text": "Criterio de calificación- Eliminado exitosamente"
    }
}
```

## TypeCalification

- https://ignus-backend-jchiquin.c9users.io/api/typeCalification/ (GET)

Get a list of Types Califications

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Atencion al cliente",
            "description": "Como lo atendieron",
        },
        {
            "id": 2,
            "name": "Servicio",
            "description": "Como estuvo todo el proceso de servicio ",
        }
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeCalification/:id (GET)

Get a one Type Calification

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Atencion al cliente",
        "description": "Como lo atendieron",
        "Califications": []
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeCalification/ (POST)

Create a type of Calification

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I064",
        "text": "Tipo de Calificacion - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeCalification/:id (PUT)

Update a type of Calification

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I066",
        "text": "Tipo de Calificacion - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeCalification/:id (DELETE)

Delete a type of Calification

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I068",
        "text": "Tipo de Calificacion - Eliminado exitosamente"
    }
}
```

## Calification

- https://ignus-backend-jchiquin.c9users.io/api/Calification/ (GET)

Get a list of Califications

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "TransactionId": 1,
            "TypeCalification": {
                "id": 1,
                "name": "La comunicación y el acuerdo sobre las fechas de visitas se efectuaron sin ningún tipo de problemas."
            },
            "QualificationCriteria": {
                "id": 1,
                "name": "Muy malo"
            }
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/Calification/:id (GET)

Get a one Calification

OUTPUT
```json
{
    "status": true,
    "data": {
            "id": 1,
            "TransactionId": 1,
            "TypeCalification": {
                "id": 1,
                "name": "La comunicación y el acuerdo sobre las fechas de visitas se efectuaron sin ningún tipo de problemas."
            },
            "QualificationCriteria": {
                "id": 1,
                "name": "Muy malo"
            }
        },
}
```

- https://ignus-backend-jchiquin.c9users.io/api/calification/ (POST)

Calificate a transaction by TransactionId

INPUT
```json
{
  "TransactionId": 1,
  "answers": [{
      "TypeCalificationId": 4,
      "QualificationCriteriumId": 2
    },{
      "TypeCalificationId": 5,
      "QualificationCriteriumId": 2
    },
    .
    .
  ]
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I070",
        "text": "Calificacion - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/calification/:id (PUT)

Update a Calification

INPUT
```json
{
    "value": "",
    "TypeCalificationId": "",
    "ClientId": "",
    "EmployeeId": "",
    "PropertyId": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I072",
        "text": "Calificacion - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/calification/:id (DELETE)

Delete a Calification

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I074",
        "text": "Calificacion - Eliminado exitosamente"
    }
}
```

## Type Appointment

- https://ignus-backend-jchiquin.c9users.io/api/typeAppointment/ (GET)

Get a list of Type Appointments

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Inspección"
        },
        {
            "id": 2,
            "name": "Informal"
        }
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/typeAppointment/:id (GET)

Get a one Appointment

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "name": "Inspección"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeAppointment/ (POST)

Create an Type Appointment

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I114",
        "text": "Tipo de cita - creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeAppointment/:id (PUT)

Update a Type Appointment

INPUT
```json
{
    "name": "",
    "description": ""
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I116",
        "text": "Tipo de cita - modificado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/typeAppointment/:id (DELETE)

Delete a Type Appointment

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I118",
        "text": "Tipo de cita - eliminado exitosamente"
    }
}
```

## Appointment

- https://ignus-backend-jchiquin.c9users.io/api/appointment/ (GET)

Get a list of Appointments

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "dateAppointment": "2019-01-10",
            "dateAppointmentUS": "2019/01/10",
            "dateAppointmentEU": "10/01/2019",
            "turn": "PM",
            "statusStr": "Ejecutada",
            "colorStatus": {
                "primary": "#1E90FF",
                "secondary": "#D1E8FF"
            },
            "reason": "Conozcamonos un poco",
            "Request": {
                "id": 1,
                "requestDate": "19/12/2018",
                "wishDate": "30/12/2018",
                "status": "Aprobada",
                "client": {
                    "id": 1,
                    "userId": 1,
                    "username": "yfernandez",
                    "identification": "25638459",
                    "firstName": "Ysidro José",
                    "lastName": "Fernández Sangronis",
                    "bankName": "Provincial",
                    "bankAccount": "01089298237843892366",
                    "birthDate": "29/10/1995",
                    "gender": "Masculino"
                },
                "employee": {
                    "id": 1,
                    "userId": 2,
                    "identification": "24758462",
                    "firstName": "José Rafael",
                    "lastName": "Camacaro",
                    "gender": "Masculino"
                },
                "typeRequest": {
                    "id": 3,
                    "name": "Servicio",
                    "description": "Solicitar un servicio"
                }
            }
        }
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/appointment/:id (GET)

Get a one Appointment

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "dateAppointment": "2019-01-10",
        "dateAppointmentUS": "2019/01/10",
        "dateAppointmentEU": "10/01/2019",
        "turn": "PM",
        "statusStr": "Ejecutada",
        "colorStatus": {
            "primary": "#1E90FF",
            "secondary": "#D1E8FF"
        },
        "reason": "Conozcamonos un poco",
        "Request": {
            "id": 1,
            "requestDate": "19/12/2018",
            "wishDate": "30/12/2018",
            "status": "Aprobada",
            "client": {
                "id": 1,
                "userId": 1,
                "username": "yfernandez",
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "29/10/1995",
                "gender": "Masculino"
            },
            "employee": {
                "id": 1,
                "userId": 2,
                "identification": "24758462",
                "firstName": "José Rafael",
                "lastName": "Camacaro",
                "gender": "Masculino"
            },
            "typeRequest": {
                "id": 3,
                "name": "Servicio",
                "description": "Solicitar un servicio"
            }
        }
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/appointment/ (POST)

Create an appoitment

INPUT
```json
{
	"dateAppointment": "19/01/2019",
    "RequestId": 2,
    "turn": "AM",
    "TypeAppointmentId": 2,
    "reason": "Te cito por..."
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I076",
        "text": "Cita - Creado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/appointment/:id (PUT)

Update a Appointment

INPUT
```json
{
	"dateAppointment": "19/01/2019",
    "RequestId": 2,
    "turn": "AM",
    "TypeAppointmentId": 2,
    "reason": "Te cito por..."
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I078",
        "text": "Cita - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/appointment/:id (DELETE)

Delete a Appointment

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I080",
        "text": "Cita - Eliminado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/appointment/schedule?userId (GET)

Get schedule by userId

OUTPUT
```json
{
    "status": true,
    "data": {
        "excludeDays": [
            0,
            6
        ],
        "appointments": [
            {
                "id": 3,
                "dateAppointment": "2019-01-16",
                "dateAppointmentUS": "2019/01/16",
                "dateAppointmentEU": "16/01/2019",
                "turn": "PM",
                "statusStr": "Ejecutada",
                "colorStatus": "#FFF400",
                "reason": "Te cito por...",
                "Request": {
                    "id": 1,
                    "requestDate": "28/12/2018",
                    "wishDate": "31/12/2018",
                    "nameForClient": "Venta, agente: José Rafael José Rafael - Aprobada",
                    "nameForEmployee": "Venta, cliente: Ysidro José Ysidro José - Aprobada",
                    "status": "Aprobada",
                    "client": {
                        "id": 1,
                        "userId": 1,
                        "username": "ysidrofernandez3012@gmail.com",
                        "identification": "25638459",
                        "firstName": "Ysidro José",
                        "lastName": "Fernández Sangronis",
                        "bankName": "Provincial",
                        "bankAccount": "01089298237843892366",
                        "birthDate": "30/10/1995",
                        "gender": "Masculino"
                    },
                    "employee": {
                        "id": 1,
                        "userId": 2,
                        "identification": "24758462",
                        "firstName": "José Rafael",
                        "lastName": "Camacaro",
                        "gender": "Masculino"
                    },
                    "typeRequest": {
                        "id": 3,
                        "name": "Servicio",
                        "description": "Solicitar un servicio"
                    }
                },
                "typeAppointment": {
                    "id": 2,
                    "name": "Informal"
                }
            },
            .
            .
        ]
    }
}
```

## Notification

- https://ignus-backend-jchiquin.c9users.io/api/notification/check/:userId (GET)

Check and return the cant of notifications which the user don't have been read

OUTPUT
```json
{
    "status": true,
    "data": {
        "cantNewNotifications": 7
    }
}
```
Otherwise
```json
{
    "status": false,
    "message": {
        "code": "E047",
        "text": "Notificación - no hay nuevas notificaciones"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/notification/:userId (GET)

Get all notifications of an user ordered by date

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "text": "Mensaje parametrizable...",
            "date": "07/01/2019",
            "status": "Pendiente",
            "type": "Recaudo aprobado",
            "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeNotification/notification.png",
            "urlRedirectIntranet": "/activitiesCollections"
        },
        .
        .
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/notification/unread/:userId (GET)

Get unread notifications of an user ordered by date

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "text": "Mensaje parametrizable...",
            "date": "07/01/2019",
            "status": "Pendiente",
            "type": "Recaudo aprobado",
            "urlImage": "https://ignus-backend-jchiquin.c9users.io/public/imgs/typeNotification/notification.png",
            "urlRedirectIntranet": "/activitiesCollections"
        },
        .
        .
    ]
}
```
- https://ignus-backend-jchiquin.c9users.io/api/notification/count/:userId (GET)

Get count of notifications by userId

OUTPUT

```json
{
    "status": true,
    "data": {
        "count": 3
    }
}
```

## Color

- https://ignus-backend-jchiquin.c9users.io/api/color/ (GET)

get a list of Colors

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "header": "#424242",
            "menu": "#E0E0E0",
            "background": "#BDBDBD"
        },
        {
            "id": 2,
            "header": "#F4511E",
            "menu": "#FFAB91",
            "background": "#D84315"
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/color/:id (GET)

get One Color

OUTPUT
```json
{
    "status": true,
    "data": {
        "id": 1,
        "header": "#424242",
        "menu": "#E0E0E0",
        "background": "#BDBDBD"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/color/ (POST)

Create a color

INPUT
``` json
{
    "header": "#424242",
    "menu": "#E0E0E0",
    "background": "#BDBDBD"
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I094",
        "text": "Color - Creado exitosamente"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/color/:id (PUT)

Edit one Color

INPUT
``` json
{
    "header": "#424242",
    "menu": "#E0E0E0",
    "background": "#BDBDBD"
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I096",
        "text": "Color - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/color/:id (DELETE)

Delete one color

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I098",
        "text": "Color - Eliminado exitosamente"
    }
}
```

## Inspection

- https://ignus-backend-jchiquin.c9users.io/api/inspection (GET)

get a list of inspection

OUTPUT
```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "urlFileInspection": "https://ignus-backend-development-jchiquin.c9users.io/public/documents/inspection/INITIAL_0d9c3c3cfcc44e643a2a134811906062.txt",
            "observation": "Casa en buen estado",
            "uploadDate": "15/01/2019",
            "status": "A",
            "request": {
                "id": 3,
                "requestDate": "25/12/2018",
                "wishDate": "31/12/2018",
                "status": "Solicitada"
            },
            "client": {
                "id": 1,
                "userId": 1,
                "username": "ysidrofernandez3012@gmail.com",
                "identification": "25638459",
                "firstName": "Ysidro José",
                "lastName": "Fernández Sangronis",
                "bankName": "Provincial",
                "bankAccount": "01089298237843892366",
                "birthDate": "30/10/1995",
                "gender": "Masculino"
            },
            "employee": {}
        }
    ]
}
```

- https://ignus-backend-jchiquin.c9users.io/api/inspection (POST)

Create a inspection with its file

INPUT

*Note: Upload the file (it could be of any type) by using `form-data` with any name you want*
``` json
{
    "observation": "todo en orden",
    "RequestId": 1,
}
```

OUTPUT
``` json
{
    "status": true,
    "message": {
        "code": "I067",
        "text": "Inspección - Creado exitosamente!"
    }
}
```
- https://ignus-backend-jchiquin.c9users.io/api/inspection/:id (PUT)

Edit a inspection by inspectionId

INPUT

*Note: Upload the file (it could be of any type) by using `form-data` with any name you want*
``` json
{
    "observation": "todo en orden",
    "RequestId": 1,
}
```

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I069",
        "text": "Inspección - Modicado exitosamente"
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/inspection/:id (DELETE)

Delete one inspection by id

OUTPUT
```json
{
    "status": true,
    "message": {
        "code": "I071",
        "text": "Inspección - Eliminado exitosamente!"
    }
}
```

## Report

- https://ignus-backend-jchiquin.c9users.io/api/report/request (GET)

Get request by type services in the entire year

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeS         | 3             | Filter by type Service 'Venta' |
| start         | 2019-01-01    | Filter by requestDate starting from '2019-01-01'      |
| end           | 2019-12-31    | Filter by requestDate ending to '2019-12-31' |

*Note: you can make many combinations of params filters, like this:*

- https://ignus-backend-jchiquin.c9users.io/api/report/request?start=2019-01-01 (GET)


OUTPUT
```json
{
    "status": true,
    "data": {
        "categories": [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
        ],
        "values": [
            {
                "name": "Rechazadas",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Aceptadas",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ],
        "series": [
            {
                "type": "pie",
                "name": "Browser share",
                "data": [
                    [
                        "Rechazadas",
                        0
                    ],
                    [
                        "Aceptadas",
                        100
                    ]
                ]
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/report/appointments (GET)

Get appointments by employee id or type services in a range of dates

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeS         | 3             | Filter by type Service 'Venta' |
| emp           | 1             | Filter by Employee id '1'      |
| start         | 2019-01-01    | Filter by requestDate starting from '2019-01-01'      |
| end           | 2019-12-31    | Filter by requestDate ending to '2019-12-31' |

*Note: you can make many combinations of params filters, like this:*

- https://ignus-backend-jchiquin.c9users.io/api/report/appointments?emp=2&start=2019-01-10 (GET)


OUTPUT
```json
{
    "status": true,
    "data": {
        "categories": [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
        ],
        "values": [
            {
                "name": "Solicitadas",
                "data": [
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Confirmadas",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ],
        "series": [
            {
                "type": "pie",
                "name": "Browser share",
                "data": [
                    [
                        "Solicitadas",
                        100
                    ],
                    [
                        "Confirmadas",
                        0
                    ]
                ]
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/report/incidence (GET)

Get incidences in a range of dates

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeS         | 3             | Filter by type Service 'Venta' |
| typeI         | 1             | Filter by type incidence id '1'      |
| status        | E,A           | Filter by status E or A       |
| start         | 2019-01-01    | Filter by requestDate starting from '2019-01-01'      |
| end           | 2019-12-31    | Filter by requestDate ending to '2019-12-31' |

*Note: you can make many combinations of params filters, like this:*

- https://ignus-backend-jchiquin.c9users.io/api/report/incidence?typeS=2&start=2019-01-10 (GET)


OUTPUT
```json
{
    "status": true,
    "data": {
        "xAxis": {
            "categories": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ]
        },
        "series": [
            {
                "name": "Servicio",
                "data": [
                    {
                        "name": "Compra",
                        "y": 100
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    },
                    {
                        "name": "",
                        "y": 0
                    }
                ]
            }
        ],
        "quantity": [
            {
                "name": "Compra",
                "y": 1
            },
            {
                "name": "",
                "y": 0
            },
            {
                "name": "",
                "y": 0
            },
            .
            .
            .
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/report/service (GET)

Get Type Services with properties on each month in a range of dates

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeP         | 1             | Filter by type Property 'Casa' |
| state         | Lara          | Filter by State 'Lara'     |
| municipality  | Urdaneta      | Filter by Municipality 'Urdaneta'       |
| parish        | Xaguas        | Filter by Parish 'Xaguas'       |
| start         | 2019-01-01    | Filter by publication date starting from '2019-01-01'      |
| end           | 2019-12-31    | Filter by publication date ending to '2019-12-31' |

*Note: you can make many combinations of params filters:*

OUTPUT
```json
{
    "status": true,
    "data": {
        "xAxis": {
            "categories": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ]
        },
        "series": [
            {
                "name": "Compra",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Alquiler",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Venta",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ]
    }
}

```

- https://ignus-backend-jchiquin.c9users.io/api/report/contact (GET)

Get Contacts on each month in a range of dates

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| typeC         | 1             | Filter by type contact 'Sugerencia' |
| status        | A,E,B         | Filter by Status 'Atendido, por Responder, Borrado'     |
| start         | 2019-01-01    | Filter by contact date starting from '2019-01-01'      |
| end           | 2019-12-31    | Filter by contact date ending to '2019-12-31' |

*Note: you can make many combinations of params filters:*

OUTPUT
```json
{
    "status": true,
    "data": {
        "xAxis": {
            "categories": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ]
        },
        "series": [
            {
                "name": "Respecto al Servicio",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Atencion al cliente",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Promociones y Ofertas",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Graficas y Contenido",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Tiempos de Respuesta",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Aplicacion Web",
                "data": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Aplicacion Movil",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Otros",
                "data": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "quantity": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/report/transaction (GET)

Get the time of transactions for each status

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| emp           | 1             | Filter by Employee id |
| typeP         | 1             | Filter by Type property id    |
| start         | 2019-01-01    | Filter by date    |
| end           | 2019-12-31    | Filter by date  |

*Note: you can make many combinations of params filters:*

```json
{
    "status": true,
    "data": {
        "xAxis": {
            "categories": [
                "Compra",
                "Alquiler",
                "Venta",
                "Arrendamiento"
            ]
        },
        "series": [
            {
                "name": "En proceso",
                "data": [
                    0,
                    8,
                    0,
                    6
                ]
            },
            {
                "name": "Completada",
                "data": [
                    0,
                    3,
                    0,
                    2
                ]
            },
            {
                "name": "Publicada",
                "data": [
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Finalizada",
                "data": [
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Calificada",
                "data": [
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Reservada",
                "data": [
                    0,
                    0,
                    0,
                    0
                ]
            }
        ]
    }
}
```

- https://ignus-backend-jchiquin.c9users.io/api/report/client (GET)

Get Clients and see if they have requests.

#### You can pass params for Filter the report. 

| Params        | Example value | Result  |
| ------------- |:-------------:| -----:|
| gender        | Femenino      | Filter by Gender 'Masculino o Femenino' |
| start         | 2019-01-01    | Filter by suscription date    |
| end           | 2019-12-31    | Filter by suscription date  |
| minage        | 20            | Filter by min age    |
| maxage        | 40            | Filter by max age  |
 
```json
{
    "status": true,
    "data": {
        "categories": [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
        ],
        "values": [
            {
                "name": "Con solicitudes",
                "data": [
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "Sin solicitudes",
                "data": [
                    3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ],
        "series": [
            {
                "type": "pie",
                "name": "Browser share",
                "data": [
                    [
                        "Con solicitudes",
                        40
                    ],
                    [
                        "Sin solicitudes",
                        60
                    ]
                ]
            }
        ]
    }
}
```

# Developers

|Name| Email |Github| Gitlab |
|--|--|--|--|
|Jorge Chiquín Valderrama | jorgechiquinv@gmail.com |[JChiquin](https://github.com/JChiquin) | [JChiquin](https://gitlab.com/JChiquin) |
|José Rafael Camacaro | camacaroj21@gmail.com |[josera21](https://github.com/josera21) | [josera21](https://gitlab.com/josera21) |

### Team Ethereum
### Promo 58, Ingeniería en informática
### UCLA, DCYT. 2018-2019
