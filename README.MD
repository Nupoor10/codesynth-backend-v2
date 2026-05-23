<h1 align="center">C⚙️deSynth</h1>
<h3 align="center">"Unlocking productivity through real-time collaboration"</h3>
<p align="center">
  <img src="https://res.cloudinary.com/du9wkwhju/image/upload/v1704215315/3_ixbuqu.png" height="250px">
</p>

<b>This is the backend repo of the codesynth project, the frontend repo can be found [here](https://github.com/Nupoor10/codesynth-frontend)</b>

## Table Of Contents

* [Demo and Links](#demo-and-links)
* [About the Project](#about)
* [Built With](#built-with)
* [Features](#features)
* [How it works](#how-it-works)
* [Local Setup](#local-setup)
  * [Prerequisites](#prerequisites)
  * [Frontend](#frontend)
  * [Backend](#backend)

## Demo and Links

- Link to frontend repo can be found [here](https://github.com/Nupoor10/codesynth-frontend)
- Link to backend repo can be found [here](https://github.com/Nupoor10/codesynth-backend)
- Link to online demo can be found [here](https://codesynth-frontend.vercel.app/)

## About

CodeSynth is a platform by developers for developers. With codesynth, coders can harness the combined power of generative AI and real-time collaboration through a single platform. With a plethora of features ranging from code-playgrounds, AI-generated documentation and real-time collaboration, CodeSynth is guaranteed to be your perfect coding companion. The heart of the application is the coding playground that allow users to code within the application along with a live UI. This project was inspired by CodePen platform that allows users to create pens within their website.

## Built With

<div align="center">
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"> 
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/React-000049?style=for-the-badge&logo=react&logoColor=61DAFB"> 
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
    <img src="https://img.shields.io/badge/Express.js-800080?style=for-the-badge"> 
    <img src="https://img.shields.io/badge/MongoDB-6FD161?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/Monaco-FF6F80?style=for-the-badge"> 
    <img alt="Git" src="https://img.shields.io/badge/Git-F09032?style=for-the-badge&logo=git&logoColor=white" />
</div>

CodeSynth is developed using the MERN stack as well as integrating with several libraries for the code editor and real-time updates.

- React.Js: React.Js is utilized for building the frontend components of the application. React.Js is a popular Javascript framework preferred for building frontend apps due to its component based architecture.

- CSS3 - Styling for the entire application is done using plain CSS3 utilizing appropriate media queries to ensure responsiveness across devices.

- Express.Js: The backend server of the project is built using Express.js which is a minimal and lightweight framework for building servers with Node.Js. The express server consists of controller logic, backend routes along with middleware for authentication.

- MongoDB: Mongo Atlas is used as the database to store application data. In addition, Mongoose is used which is a ORM for integrating MongoDB with Node.Js reducing the need for boilerplate code and providing important native MongoDB capabilities.

- Axios: Axios is used to make API requests to the backend as well as external servers. Axios is a popular JavaScript library for making HTTP requests in browsers and Node.js environments. It simplifies the process with a clean syntax, support for Promises, and the ability to intercept request and response actions, making it widely used for asynchronous data fetching in web applications.

- Monaco: For the code editor ```@monaco-editor/react``` is used which is a React wrapper for the Monaco Editor, a versatile code editor developed by Microsoft. Offering a seamless integration into React applications, it provides developers with a powerful and customizable code editing experience, including features like syntax highlighting, autocompletion, and multi-cursor support.

- Socket.io: Socket.io is used for the real time collaboration feature. Users can create rooms and code together with the code being updated in real time as per changes by the users. Socket.io, built on top of WebSockets, is a popular JavaScript library that enables bidirectional, real-time communication between clients and servers. Renowned for its simplicity and versatility, Socket.io simplifies WebSocket implementation, offering developers a robust solution for seamless, event-driven interactions in real-time applications.

- Cohere-AI: Cohere provides text generation capabilities which are harnessed in the application to generate documentation on the code created by the user. This allows user to get a quick recap of their code and maintain proper documentation of their code playgrounds.

- React-sketch-canvas: ```react-sketch-canvas``` is introduced to allow users to create simple wireframes, user flows and brainstorm right within the application itself.```react-sketch-canvas``` is a React component that allows developers to easily integrate a sketching canvas into their applications, enabling users to draw and annotate directly within the browser providing a versatile solution for implementing drawing features in React applications.

- Botpress: Botpress is an open-source conversational platform that empowers developers to build and deploy chatbots for various channels, such as web, messaging apps, and more. With a modular architecture, Botpress offers flexibility and customization, making it a popular choice for creating sophisticated and interactive conversational experiences. In this website, a coding support chatbot is created using botpress.

## Features 

CodeSynth boosts a number of features designed to help and support developers to augment their coding journey, providing expert resources and advanced coding capabilities.

- Code Playground: CodeSynth features code playgrounds where users can code in HTML, CSS and JavaScript along with a live UI that gets updated in real time. Users can view, manage, edit and delete their codes as well. For adding the code-editing functionality ```@monaco-editor/react``` is used for its rich set of features and easy integration into react applications.

- Chatbot: In our application, we have integrated a chatbot developed with Botpress and powered by GPT-3.5, creating an engaging platform for users to receive answers to their coding and web development queries. The combination of Botpress's conversational capabilities and GPT-3.5's advanced language understanding enables our chatbot to deliver sophisticated and contextually relevant responses, enhancing the overall user experience in seeking programming-related assistance.

- Document Generation: Using the document generation feature, users can create AI-generated documentation on their code. For this the Cohere platform is used which provides advanced text generation capabilities. We pass in our code along with the apppropriate prompts to generate the documentation. This documentation can also be saved as a note for future reference.

- IdeaMap: IdeaMap uses ```react-sketch-canvas``` that allows us to add a drawing canvas in our application. This feature is introduced to allow users to create basic wireframes, user flows and brainstorm during their coding process. Users can export their creations as an image and save it as a note.

- Notes: Users can save their created drawings as well as their generated documentation as notes in the database by adding a title. The application also allows users to view as well as delete their notes.

- InfoHub: The website has an info hub page that displays curated resources essential for a web developer categorized as per the language into HTML, CSS and JavaScript. It also consists of project ideas ranging from beginner to intermediate to encourage the users.

- Community: The community page features the code playgrounds created by other users in the application. Users can learn from and get inspired by their creations thus increasing community engagement.

- Collaborative Rooms: Users can create and join collaborative coding rooms where they can code with fellow participants. The code from all users gets updated in real time so one participant can see the code the other participant is writing. They can also view all the currently connected participants in the room. This real-time feature is powered by ```socket.io``` that allows bi-directional communication between client and server.

## How it works

1. User account creation is facilitated through the dedicated Registration page. The frontend sends user data to the backend API, where express router is used to attach handler functions i.e controllers to the specific API endpoint. A mongoose schema is created for saving user data to the database with basic details like name, email and password. The user password is hashed using the bcrypt library to ensure data protection.

![Registration Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230868/Screenshot_2024-01-02_213955_iatfqn.png)

2. Upon successful completion of the registration process, the system seamlessly redirects users to the designated Login page, where they can login using their registered email address and password. In the backend, the user entered password is hashed and compared with the hashed password stored in the database and then user is authenticated to access the application. A JSON Web Token is created for the authentication with the User ID which is then passed to the frontend. Async-await along with try..catch is used to make code more readable and less error-prone along with handling promises gracefully. 

![Login Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230869/Screenshot_2024-01-02_214017_vdg6us.png)

3. Once the backend API checks that the user credentials are correct, the frontend stores the user details in a global state variable using React Context API to keep track of the currently logged in user. This global 'user' object is also used in subsequent backend requests where the JWT token is passed in the 'Authorization' header and the backend authentication middleware ensures that the token is valid and the user making the request exists in the database.

4. The User is then redirected to the home page. The home page gives a brief overview of all the different features the application has along with a short info paragraph for better understanding. Users can also logout from the home page which sets the global 'user' state to null and clears the local storage

![Home Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230868/Screenshot_2024-01-02_214022_amgudk.png)

5. The first major feature of the project are the code playgrounds. The code playground is an online code editor that enables users to code in HTML, CSS and JavaScript along with a live UI that gets updated in real time according to the user code. These code playgrounds are saved in the database with the code values and each playground references a website user. The My Codes page shows all the playgrounds the user has created along with the option to delete the code playgrounds and go to their code playground. An option to navigate to the notes of a particular code playground is also provided and the notes features is expained later.

![My Codes Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704346391/Screenshot_2024-01-02_214147_vlxhqv.png)

![Delete Codes](https://res.cloudinary.com/du9wkwhju/image/upload/v1704346391/Screenshot_2024-01-02_214228_xfu0s0.png)


6. On clicking the Create New button on My Codes page a new code playground gets created with some default code. For creating the code editor itself, ```@monaco-editor/react``` is used which provides advanced code-editing features with auto-complete and syntax highlighting. The values of the code editor are managed by using state variables using useState. For the live UI, an iframe is created where the values of the HTML, CSS and JavaScript variables are injected into an HTML document. This iframe is then displayed to the user so whenever the user enters a code into the code editor, the value of the state variable gets updated, this value is also injected into the iframe so the iframe too gets updated hence the user can view their output in real-time. The user also has the option to save their changes which updates the code in the database.

![Code Playground](https://res.cloudinary.com/du9wkwhju/image/upload/v1704346855/Screenshot_2024-01-02_214239_ypskdv.png)

![Code Playground](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347613/Screenshot_2024-01-02_214531_w4ayxh.png)

![Save Code](https://res.cloudinary.com/du9wkwhju/image/upload/v1704346856/Screenshot_2024-01-02_214245_zms4jy.png)

7. The navbar of the code playground also features a 'Teach Me' button. This button opens up the coding chatbot created using botpress. Users can ask any coding related query to the chatbot and the chatbot will promptly answer. User also has the option to delete their conversation. The chatbot is powered by the GPT 3.5 LLM and the UI itself is provided by botpress which is a platform that simplifies the creation of chatbots using a drag-and-drop editor.

![Chatbot](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347071/Screenshot_2024-01-02_214325_xnggmz.png)

8. The 'DocGen' feature allows user to create documentation on their code. This feature uses the ```cohere-ai``` library that provides text generation powered by Cohere's LLMs. We provide a prompt to generate detailed documentation on the code along with a few parameters like the model to use and maximum characters to return. We then pass in the code entered by the user in the code editor. This sends an API request to the backend that handles the text generation and returns the result. The output is displayed to the user and the user can copy the text or even save the documentation as a note. For this a notes schema is created with fields like title, image and content and each note belongs to a particular code playground. 

![Doc Generation](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347535/Screenshot_2024-01-02_214404_bozyyr.png)

![Save as Note](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347532/Screenshot_2024-01-02_214410_h6jtdb.png)

9. Finally, the 'IdeaMap' features incorporates drawing capabilities into our coding playground. This feature was introduced to allow users to create simple wireframes and user flows in the website itself. We can convert our wireframe into a png image and then store it in our database as a note by specifying the title.

![Idea Map](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347895/Screenshot_2024-01-02_214425_eeufpa.png)

![Save as Note](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347879/Screenshot_2024-01-02_214518_omvw01.png)

10. As mentioned above, our website also has a notes feature. Each note belongs only to a particular code playground and the notes page be accessed from the My Codes page. The note schema consists of title, image(for ideamap) and content(for docgen) fields. On navigating to the notes page we can view all our created notes and also delete them

![Notes Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704348141/Screenshot_2024-01-02_214541_c9cpri.png)

![View Notes](https://res.cloudinary.com/du9wkwhju/image/upload/v1704347977/Screenshot_2024-01-02_214544_dxlwb7.png)

![Delete Note](https://res.cloudinary.com/du9wkwhju/image/upload/v1704348037/Screenshot_2024-01-02_214550_vutkaa.png)

11. Next up, we have the info hub. The info hub is a repository of specially curated resources for web development categorized into HTML, CSS and JavaScript. Further there is a project ideas section that gives users a few beginner friendly to intermediate project ideas they can implement to polish their coding skills

![Resources Page](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230868/Screenshot_2024-01-02_214026_yq1izr.png)

![Project Ideas](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230868/Screenshot_2024-01-02_214026_yq1izr.png)

12. Our website also features a community codes page where the user can view the code playgrounds created by other users. The users can edit the playgrounds but cannot save their changes and other features like the chatbot, document generation and IdeaMap are also disabled. This feature was incorporated so that users can take inspiration and learn from the code playgrounds of other users improving community engagement. 

![Community Codes](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230868/Screenshot_2024-01-02_214044_r6y5ha.png)

![Community Code Playground](https://res.cloudinary.com/du9wkwhju/image/upload/v1704230867/Screenshot_2024-01-02_214100_x657gk.png)

13. The last feature of the application is the real-time collaborative coding feature. The user can create rooms and share the room ID with other users to enable them to join the room. If a user creates a room, the frontend will generate a unique roomId using the ```uuid``` npm package. Then it will also create a new code playground for the room with the isRoom schema field set to true with each room having one code playground. In the backend a room schema is created that stores the roomId along with the admin who created the room, the code playground of that room and a list of participants. The admin who has created the room can delete the room which deletes both the room as well as the code playground in the database.

![Rooms](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349995/Screenshot_2024-01-02_214720_ioqmi8.png)

![Delete Room](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349995/Screenshot_2024-01-02_214851_f91qdf.png)

If a user wants to join a room created by another user, they can copy paste the roomId and join the room. Then the userId of this user gets added into the list of room participants in the database and the user can see their newly joined room. Since this user is not the admin they cannot delete the room but they can exit the room which deletes their userId from the participants list.

![Join Room](https://res.cloudinary.com/du9wkwhju/image/upload/v1704350087/Screenshot_2024-01-02_214913_eyw1b5.png)

![Room Added](https://res.cloudinary.com/du9wkwhju/image/upload/v1704350069/Screenshot_2024-01-02_215114_dpf8j1.png)

![Leave Room](https://res.cloudinary.com/du9wkwhju/image/upload/v1704350137/Screenshot_2024-01-02_215053_dedtoh.png)

Once a room is created multiple participants can join the room. When any participant/admin navigates to a room they are taken to the code playground of the room. The frontend then creates a new socket connection to the backend in the useEffect hook. Any errors in creating the socket connection will automatically navigate the user back to the rooms page. The backend too sets up a WebSocket server using the Socket.IO library. If the socket connection is successfull, the socket instance is stored in a useRef and the frontend emits an event to the backend indicating that a new user has joined the room. The backend server listens for this event and adds the user to a socket room by the specified roomId. It also stores a userMap of all the currently active users across several rooms, mapping their socket id to the user name. We then fetch all socketIds in a particular room and map over them to get their user names from the userMap. We then emit this client list as well as the username which just joined the room to all clients in that room who update their client list and also get a notification that a new user has just joined.

![Room Joined](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349037/Screenshot_2024-01-02_215612_ntb9zq.png)

The user can click on the Leave Room button in the navbar to leave a room. This emits a socket 'disconnecting' event that deletes the user entry from the userMap and exits the user from all the rooms it is currently in. Also it emits a 'disconnected' event to all users in the room and they receive a notification that a particular user has just left the room.

![Room Left](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349050/Screenshot_2024-01-02_215608_yakmks.png)

The last socket event is the code change event. In the frontend the code editor stores the value of the code the user is currently typing in a state variable and the value gets updated dynamically. ```@monaco-editor/react``` provides an onChange function that allows us to fetch the value of the code editor and subsequently update the state variable. Now, the code editor component receives a prop indicating if the code editor component belong to a room code playground along with a roomId if it does. In the onChange function the code editor component will check if this is the case and then emit an event with the roomId, code value and code language: HTML, CSS, JavaScript. The backend listens for this event and emits the code value and language to all connected users in a room. Again the code editor component has a useEffect hook that listens for this socket event and updates its own code as per the code language specified to ensure that all participant's code playgrounds are in sync. This is how the application enables real-time collaborative editing among multiple participants. It will also display a list of currently connected participants.

![Real Time Coding](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349042/Screenshot_2024-01-03_033256_gao9tj.png)

![Participants](https://res.cloudinary.com/du9wkwhju/image/upload/v1704349046/Screenshot_2024-01-02_215405_pkmvlj.png)

## Local setup

### Prerequisites

#### Install Node.js latest version: 

I recommend using NVM to manage your Node.Js versions. You can install NVM for windows from [here](https://github.com/coreybutler/nvm-windows). 

For installing the latest Node.js version using nvm use command:

```nvm install latest``` and then type ```nvm use <version>```

Alternatively the link to install Node.js can be found [here](https://nodejs.org/en/download)

### Backend

1. Clone the repo:

```
git clone https://github.com/Nupoor10/codesynth-backend.git
```

2. Install all dependencies:

```
npm install
```

3. Copy the .env file

```
copy .env.example .env
```

4. Specify the .env variables like PORT, JWT_SECRET and MONGO_URI

5. For obtaining the API keys for the external APIs refer:

- [Cohere](https://www.nightfall.ai/ai-security-101/cohere-api-key#:~:text=To%20get%20a%20Cohere%20API%20key%2C%20developers%20need%20to%20sign,key%20from%20the%20Cohere%20dashboard.)

6. Run the development server:

```
npm run dev
```

### Frontend

1. Clone the repo:

```
git clone https://github.com/Nupoor10/codesynth-frontend.git
```

2. Install all dependencies:

```
npm install
```

3. Copy the .env file

```
copy .env.example .env
```

4. Replace the VITE_BACKEND_URL by your backend url specifying the port. The default value is: 

```
http://localhost:8080/api/v1
```

5. Replace the VITE_SOCKET_URL by your socket url specifying the port. The default value is: 

```
http://localhost:8080
```

6. Run the development server:

```
npm run dev
```