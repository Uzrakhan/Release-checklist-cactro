# Release Checklist Tool

A simple full-stack web application that helps developers manage and track release readiness using a checklist of steps.

The application allows users to create releases, track completion of predefined steps, and automatically compute the release status.

---

## 🚀 Live Demo

**Frontend:** https://release-checklist-cactro.vercel.app/
**Backend API:** https://release-checklist-cactro.onrender.com

---

## ✨ Features

* View list of all releases
* Create a new release with name and due date
* Track completion of release checklist steps
* Automatically computed release status (planned / ongoing / done)
* Update additional notes for each release
* Delete a release
* Responsive and clean UI

---

## 🧠 Status Logic

The release status is computed automatically:

* **Planned** → no steps completed
* **Ongoing** → at least one step completed
* **Done** → all steps completed

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Axios

**Backend**

* Node.js
* Express

**Database**

* MongoDB Atlas

**Deployment**

* Frontend → Vercel
* Backend → Render

---

## 📡 API Endpoints

### Get all releases

```
GET /releases
```

### Create release

```
POST /releases
```

### Update steps

```
PATCH /releases/:id/steps
```

### Update additional info

```
PATCH /releases/:id/info
```

### Delete release

```
DELETE /releases/:id
```

---

## 🗄 Database Schema

### Release

| Field          | Type      | Required |
| -------------- | --------- | -------- |
| name           | String    | Yes      |
| date           | Date      | Yes      |
| additionalInfo | String    | No       |
| steps          | Boolean[] | Yes      |
| createdAt      | Date      | Auto     |

---

## 🧩 Steps

Steps are predefined and shared across releases:

* PR merged
* Changelog updated
* Tests passing
* GitHub release created
* Deployed to demo
* Tested in demo
* Production deploy

---

## ⚙️ Running Locally

### 1. Clone repository

```
git clone https://github.com/Uzrakhan/Release-checklist-cactro
```

---

### 2. Backend setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```
node server.js
```

---

### 3. Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 📌 Notes

This is a single-user application with no authentication, as required by the assignment.

---

## 🙌 Author

Uzra Khan
