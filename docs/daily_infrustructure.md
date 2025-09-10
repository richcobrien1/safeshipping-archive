## 🗂 SafeShipping Platform Structure Snapshot
SafeShipping/

├── backend/ # API, business logic, and data models 
├── frontend/ # Vite-based UI, components, contexts 
├── contracts/ # Smart contracts and testing libraries 
├── docker/ # Container configurations per service 
├── config/ # Global platform-level settings 
├── iot/ # Device connectors, simulators, K8s manifests 
├── oracles/ # External data adapters and aggregators 
├── scripts/ # Utility scripts and automation 
├── docs/ # Architecture, APIs, deployment guides 
├── deployment/ # Terraform, CI/CD, boot flows 
├── tests/ # E2E and integration tests 
├── migrations/ # DB schema + contract migration logic

> **Dev Reminder**: All containerized services live under `docker/`, Kubernetes manifests are orchestrated from `iot/kubernetes/`, and `docker/config/docker-compose.yml` is used for local dev builds only.

---