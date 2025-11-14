# 🔗 LinkShrink - URL Shortening Microservice

A high-performance URL shortening service built to demonstrate a modern, full-stack, decoupled architecture using the third major JavaScript framework (Vue.js) and the professional Node.js framework (NestJS).

## 💡 Key Features

* **Technology Showcase:** Demonstrates proficiency in the full MERN-V stack (MongoDB, NestJS, Vue.js, Node.js).
* **Decoupled Architecture:** Frontend and Backend running in separate Docker containers.
* **High Performance Redirection:** Optimized for fast, direct redirection using a short code.
* **Professional Development Setup:** Uses TypeScript, Docker, and comprehensive linting/testing tools (Vitest, ESLint, Prettier).

## 🛠️ Tech Stack

### Backend (API Microservice)
* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Language:** TypeScript
* **Database:** [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
* **Deployment:** Docker

### Frontend (Client Application)
* **Framework:** [Vue.js 3](https://vuejs.org/)
* **Tooling:** Vite
* **State Management:** Pinia
* **Language:** TypeScript

## 🚀 Getting Started (Installation)

This project uses Docker to create a portable development environment that includes the Node.js backend, the Vue.js frontend, and the MongoDB database.

### Prerequisites

You must have the following installed on your system:
* [Docker](https://www.docker.com/products/docker-desktop)
* [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Setup Environment Variables

Create the `.env` file from the example in the project root:

```bash
cp .env.example .env