# Le Tre Gemme — Backend API

A REST API built with **Python, FastAPI, SQLAlchemy and MySQL**, designed to manage and expose structured content to a React frontend.

## Technical Highlights

- RESTful API design with FastAPI
- Relational data management with MySQL and SQLAlchemy
- JWT-based authentication for administrative endpoints
- Layered architecture separating routes, services and repositories
- Dependency injection for database sessions
- Pydantic models for data validation
- Configurable application logging

## Architecture

The application follows a layered structure to keep HTTP handling, business logic and data persistence separate.

This approach makes the backend easier to maintain, extend and test.
