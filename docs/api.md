# API Specification

## Purpose

This document defines the APIs used by Hybrid OS.

## Backend

Status: Planned

## Authentication

JWT Bearer Token

## Base URL

Development

http://localhost:3000/api

Production

TBD

---

## Modules

### Authentication

POST /auth/login

POST /auth/logout

GET /auth/me

---

### User

GET /users/profile

PUT /users/profile

---

### Training

GET /training

POST /training

PUT /training/:id

DELETE /training/:id

---

### Recovery

GET /recovery

POST /recovery

---

### Nutrition

GET /nutrition

POST /nutrition

---

### Competition

GET /competitions

POST /competitions

---

### Analytics

GET /analytics

---

### AI Coach

POST /ai/chat

POST /ai/recommendations

