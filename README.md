# Deno Task Manager

A simple task management web application built with Deno and Oak framework.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Persistent storage using JSON file
- Modern and responsive UI

## Prerequisites

- [Deno](https://deno.land/) (version 1.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deno-task-manager.git
cd deno-task-manager
```

2. Run the application:
```bash
deno run --allow-net --allow-read --allow-write --allow-env main.ts
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Project Structure

```
.
├── main.ts           # Main application file
├── static/           # Static files
│   ├── index.html    # Frontend HTML
│   ├── styles.css    # CSS styles
│   └── app.js        # Frontend JavaScript
└── README.md         # Project documentation
```

## License

MIT 