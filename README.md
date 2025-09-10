# SafeShipping - 06/16/2025 06:16AM

SafeShipping is a blockchain-based logistics platform using smart contracts, decentralized oracles, and IoT integrations to automate, secure, and verify global shipping workflows.

## Project Structure

This repository contains a comprehensive directory structure for developing and deploying the SafeShipping platform. For detailed information about the directory structure, please refer to the [directory_structure.md](./directory_structure.md) file.

## Key Components

- **Smart Contracts**: Blockchain contracts for secure, transparent shipping workflows
- **WASM Assembly Language**: Web Assembly Language for performance and efficiency
- **Backend API**: Server-side application for business logic and data management
- **Frontend Application**: User interface for interacting with the platform
- **IoT Integration**: Components for connecting with IoT devices and sensors
- **Oracle Services**: Decentralized data feeds connecting smart contracts with external data
- **Documentation**: Comprehensive guides for developers and users

## Getting Started

1. Clone this repository
2. Review the directory structure documentation
3. Set up the development environment using Docker
4. Begin implementing components based on the provided structure


#

# 🧱 Backend Setup (WSL + Docker Compose)
## ✅ You launched backend services via:

bash
bash ./docker/build/dev_compose.sh

This script was previously docker-compose_local_only.sh, now reorganized into docker/build/.

## ✅ Backend containers included:

backend-api for manifest intake

oracle-service for token minting

blockchain-node for ledger simulation

## ✅ You confirmed the manifest POST route worked with:

bash
curl -X POST http://localhost:8080/api/intake/manifest \
  -H "Content-Type: application/json" \
  -d '{"sender":"Richard", "receiver":"Kalani", "carrier":"FedEx"}'


# 🖥️ Frontend Setup (Local Vite Dev)
## ✅ You ran:

bash
cd frontend
npm run dev
Which launched the Vite dev server at http://localhost:5173.

---

## 🚀 Startup Modes

Choose your environment:

- [Local](#local-startup)
- [Dev Stack](#dev-startup)
- [Production](#production-deployment)

---

## 🧑‍💻 Local Startup

For manual development without containers.

### 🔹 Backend (WSL Ubuntu)

```bash
wsl -d Ubuntu
cd ~/Projects/SafeShipping/backend
uvicorn src.main:app --host 0.0.0.0 --port=8080 --reload
Or launch via Docker Compose:

bash
bash docker/build/dev_compose.sh
🔹 Frontend (Windows Host)
bash
cd frontend
npm install
npm run dev
Access the UI at: http://localhost:5173

🧪 Dev Startup (Full Stack via Docker)
Runs all containers with dev tooling and hot reload.

🔹 Services
backend-api
oracle-service
blockchain-node
frontend
smart-contracts

🔹 Launch All
bash
cd docker
bash ./build/dev_compose.sh
Compose file used: docker/config/docker-compose.yml

Verify containers:

bash
docker ps
🏭 Production Deployment
🔹 Docker Compose (Secure Build)
Use production compose file:

bash
docker compose -f docker/config/docker-compose.prod.yml up -d
Includes HTTPS, env injection, and production images.

🔹 Kubernetes (Optional)
If using K8s, apply manifests from:

k8s/
├── deployment.yaml
├── service.yaml
├── ingress.yaml

bash
kubectl apply -f k8s/
📋 Manifest Workflow (Manual Test)
🔹 Submit Manifest via Curl

bash
curl -X POST http://localhost:8080/api/intake/manifest \
  -H "Content-Type: application/json" \
  -d '{"sender":"Richard", "receiver":"Kalani", "carrier":"FedEx"}'

🔹 Submit via Frontend Button
Fill out the form

Click "Submit via API"

Paste Manafest for Submission

Example Manafest
---
{
  "origin": "80112",
  "destination": "80113",
  "weight": "5",
  "insurance": true,
  "carrier": "FedEx",
  "departure_time": "07/22/2025 5:00PM",
  "arrival_time": "07/25/2025 10:00AM",
  "fragility": "Very",
  "sender": "Richard O'Brien",
  "receiver": "Kalani Weldon",
  "priority": "High",
  "transportMode": "truck",
  "contents": "Electronics",
  "departure_location": "Centennial, CO",
  "arrival_location": "Highlands Ranch, CO",
  "status_dispatch": "Pending",
  "status_transit": "Pending",
  "status_delivery": "Pending"
}
---

Token will display on successful response

⚙️ Folder Structure Summary
SAFESHIPPING/
├── backend/               # API logic, token minting
├── frontend/              # Vite UI
├── docker/
│   ├── build/             # Shell scripts for builds
│   ├── test/              # Shell scripts for testing
│   ├── dev/               # Dev launchers
│   ├── config/            # Compose YAMLs
│   └── frontend/          # Dockerfile.dev for UI
├── k8s/                   # Kubernetes manifests
├── scripts/               # Blockchain test utils (curl)
├── .env                   # Runtime env vars
├── .env.example           # Template env vars
├── cleanup_root.sh        # Root cleanup utility
├── README.md              # You are here


🧠 Tips for Developers
🟢 Always run backend before frontend if doing local dev

🔄 Use cleanup_root.sh after major file restructuring

📦 Manifest tokens are logged and traceable on-chain

🛡️ Write tests inside tests/ and run with pytest or npm test

👥 Contributors
Name	Role
Richard	Lead Architect & Token Designer
Richard	UX Systems & Compliance Logic



## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
