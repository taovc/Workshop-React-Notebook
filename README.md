# Workshop-React-Notebook
A workshop react where you can create a web app that modifies notebooks online.

# Lets Get Started

## Prerequesites:
You will need to have ```npm``` or `yarn` and `node` installed to run the project.


Lets check that you have npm or yarn installed by using one of these commands : ```yarn --version``` or ```npm --version``` and `node -v`.


The version required is `npm version 5.6 and above` and `node version 9 and above`
# Step 1:
Create a react app :

    npx create-react-app my-app --template typescript

# Step 2:
Once the app is created, first download these packages:

    npm i react-router-dom react-bootstrap

then delete every App.* files (we are going to rewrite them).
Also create a directory `compononents` in the `src/` directory, we are gonna store our components in it.

And change the `index.tsx` by this:

    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';

    const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
    );
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );

and the `index.css` by this:

    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');

    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .note-bg {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #545658;
    min-height: 100vh;
    }

    .note-item {
    width: 300%;
    display: flex;
    justify-content: center;
    position: relative;
    left: -100%;
    }

# Step 3:
Lets create our first components.

We are gonna name it `Home.tsx`, here is it `tsx` code

    import "./Home.css";
    import Button from "react-bootstrap/Button";

    const Home = () => {
    return (
        <div className="App">
        <header className="App-header">
            <p>Welcome To This Workshop.</p>
        </header>
        <div className="home">
            <Button
            variant="primary"
            onClick={() => {
                window.location.href = "/notes";
            }}
            >
            Go To Notes
            </Button>{" "}
        </div>
        </div>
    );
    };

    export default Home;

Don't forget the css :

    .App {
        text-align: center;
    }

    .App-header {
        background-color: #282c34;
        position: relative;
        min-height: 50px;
        display: block;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }

    .home {
        background-color: #282c34;
        min-height: 100vh;
        position: relative;
        display: block;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }

We can now add it to our App's Router.

# Step 4:
<h1>Create our App's Router: </h1>

Lets rewrite the `App.tsx` at our root and import our Home we just created.

    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Home from "./components/Home";

    function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
        );
    }

    export default App;

Here we go we now have our first components at the root (path: `/`).

We now have our first page !

<h1>Lets Now create our Notes</h1>

# Step 5:
Firstly we need a database, for this workshop we will be using a `json` file as a database, that's where we are gonna store our notes.

You just have to create a file named `db.json`

    touch db.json

And fill it with :

    {
        "notes": [
            {
            "id": "1",
            "title": "Note 1",
            "content": "This is the content of note 1"
            },
            {
                "id":"2",
                "title":"Note 2",
                "content":"This is the content of note 2"
            },
            {
                "id":"3",
                "title":"Note 3",
                "content":"This is the content of note 3"
            }
        ]
    }

# Step 6:
Lets now create our Notes manager:

We'll start with creating a directory in our components :

    mkdir ./src/components/Notes

We will be needing 4 files, `NoteDetail.tsx`, `NoteList.tsx`, `NoteModel.ts` and `NoteService.ts`.

    touch ./src/components/Notes/NoteDetail.tsx ./src/components/Notes/NoteList.tsx ./src/components/Notes/NoteModel.ts ./src/components/Notes/NoteService.ts

# Step 7:
The `NoteDetail.tsx` file will allow us to update our note.

    import NoteModel from "./NoteModel";
    import { useParams } from "react-router-dom";
    import InputGroup from "react-bootstrap/InputGroup";
    import Form from "react-bootstrap/Form";
    import noteCrud from "./NoteService";

    // display the details page for note, and u can update the note.

    const NoteDetail = () => {
    const notes = noteCrud.ReadNotes();
    const { id } = useParams<{ id: string }>();
    if (id === undefined) {
        return <div>404</div>;
    }
    let note = notes[parseInt(id) - 1];
    return (
        <div>
        <h1>Details</h1>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
            defaultValue={note?.title}
            onChange={(e) => {
                note.title = e.target.value;
            }}
            />
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Content</InputGroup.Text>
            <Form.Control
            as="textarea"
            aria-label="With textarea"
            defaultValue={note?.content}
            onChange={(e) => {
                note.content = e.target.value;
            }}
            />
        </InputGroup>
        <button
            onClick={() => {
            noteCrud.UpdateNote(notes, id, note);
            console.log(notes);
            }}
        >
            Update
        </button>
        </div>
    );
    };

    export default NoteDetail;

# Step 8:
<h2>List our Notes</h3>
Lets list our Notes in our file NoteList.tsx:

    import NoteModel from "./NoteModel";
    import ListGroup from "react-bootstrap/ListGroup";
    import { Button } from "react-bootstrap";
    import InputGroup from "react-bootstrap/InputGroup";
    import Form from "react-bootstrap/Form";
    import { useState } from "react";
    import noteCrud from "./NoteService";

    const NoteTitle = () => {
    return (
        <div
        style={{
            display: "flex",
            backgroundColor: "#282c34",
        }}
        >
        <h1
            style={{
            color: "white",
            textAlign: "center",
            width: "100%",
            marginTop: "0px",
            }}
        >
            Notes
        </h1>
        </div>
    );
    };

    const NoteCreate = (props: { setCreate: any }) => {
    let note: NoteModel = {
        id: "0",
        title: "",
        content: "",
    };
    return (
        <div
        style={{
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            margin: "auto",
            marginTop: "-35%",
        }}
        >
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
            defaultValue={note?.title}
            onChange={(e) => {
                note.title = e.target.value;
            }}
            />
        </InputGroup>
        <InputGroup>
            <InputGroup.Text>Content</InputGroup.Text>
            <Form.Control
            as="textarea"
            aria-label="With textarea"
            defaultValue={note?.content}
            onChange={(e) => {
                note.content = e.target.value;
            }}
            />
        </InputGroup>
        <button
            className="btn btn-primary"
            style={{
            position: "relative",
            left: "40%",
            }}
            onClick={() => {
            props.setCreate(false);
            noteCrud.CreateNote(note);
            }}
        >
            Create
        </button>
        </div>
    );
    };

    const NoteList = () => {
    const [creating, setCreate] = useState(false);
    const notes = noteCrud.ReadNotes();

    return (
        <div>
        <NoteTitle />
        <div className="note-bg">
            <ListGroup>
            {notes.map((note: NoteModel) => (
                <div key={note.id}>
                <ListGroup.Item
                    action
                    variant="secondary"
                    className="note-item"
                    key={note.id}
                    onClick={() => {
                    window.location.href = `/notes/${note.id}`;
                    }}
                >
                    {note.title}
                </ListGroup.Item>
                <Button
                    variant="danger"
                    style={{
                    position: "absolute",
                    marginTop: "-40px",
                    left: "60%",
                    }}
                    onClick={() => {
                    noteCrud.DeleteNote(note.id);
                    }}
                >
                    Delete {note.title}
                </Button>
                </div>
            ))}
            </ListGroup>
            <Button
            variant="primary"
            style={{
                position: "absolute",
                bottom: "200px",
                height: "50px",
                width: "200px",
                left: "50%",
            }}
            onClick={() => {
                window.location.href = "/";
            }}
            >
            Home
            </Button>
            <Button
            variant="secondary"
            style={{
                position: "absolute",
                bottom: "200px",
                height: "50px",
                width: "200px",
                left: "37%",
            }}
            onClick={() => {
                setCreate(true);
            }}
            >
            Create
            </Button>
        </div>
        {creating ? <NoteCreate setCreate={setCreate} /> : null}
        </div>
    );
    };

    export default NoteList;

# Step 9:
<h2>Setup the Model of every notes</h2>
As we are in a typescript architecture we have to use interfaces to order our data.

Use this as our `NoteModel.ts`:

    interface NoteModel {
        id: string;
        title: string;
        content: string;
    }

    export default NoteModel;

# Step 10:
<h2>Create Crud for our Notes</h2>
Fill the NoteService.ts with this:

    import Note from "./NoteModel";

    class NoteCrud {
    CreateNote = (note: Note) => {
        // Create a note
        let notes: Note[] = [];
        if (localStorage.getItem("notes") === null) {
        notes = [];
        note.id = "1";
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        } else {
        notes = JSON.parse(localStorage.getItem("notes") || "[]");
        note.id = (notes.length + 1).toString();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        }
        window.location.reload();
    };
    ReadNotes = (): any => {
        // Read all notes
        let notes: Note[] = [];
        if (localStorage.getItem("notes") === null) {
        notes = [];
        } else {
        notes = JSON.parse(localStorage.getItem("notes") || "[]");
        }
        return notes;
    };
    UpdateNote = (notes: Note[], id: string, note: Note) => {
        // update a note
        notes[parseInt(id) - 1] = note;
        localStorage.setItem("notes", JSON.stringify(notes));
    };
    DeleteNote = (id: string) => {
        // delete a note
        let notes: Note[] = [];
        if (localStorage.getItem("notes") === null) {
        notes = [];
        } else {
        notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.forEach((note: Note, index: number) => {
            if (note.id === id) {
            notes.splice(index, 1);
            }
        });
        localStorage.setItem("notes", JSON.stringify(notes));
        }
        window.location.reload();
    };
    }

    const noteCrud = new NoteCrud();

    export default noteCrud;

It will alllow us to deal with our Note by creating/updating/deleting our notes.

# Step 11:
<h2>To finish lets add all these to our router App.tsx</h2>

    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Home from "./components/Home";
    import { useEffect, useState } from "react";
    import NoteList from "./components/Notes/NoteList";
    import NoteDetail from "./components/Notes/NoteDetail";
    import NoteModel from "./components/Notes/NoteModel";

    function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);

    useEffect(() => {
        if (localStorage.getItem("notes") === null) {
        setNotes(require("./db.json").notes);
        localStorage.setItem("notes", JSON.stringify(require("./db.json").notes));
        } else {
        setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
        }
    }, []);

    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="*" element={<Home />} />
        </Routes>
        </Router>
    );
    }

    export default App;

It will look like this.

# Conclusion
And now you have learn the basis of React Typescript.