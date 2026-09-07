# 🏢 Chaibasa Engineering College Civil Dept — AI Digital Twin Dashboard

[![Published in Automation in Construction](https://img.shields.io/badge/Published-Automation%20in%20Construction%20(Elsevier)-00d4ff?style=for-the-badge&logo=elsevier)](https://www.sciencedirect.com/journal/automation-in-construction)
[![Building](https://img.shields.io/badge/Building-Chaibasa%20Engineering%20College-00ff88?style=for-the-badge)](https://www.chaibasaengg.edu.in/)
[![University](https://img.shields.io/badge/University-JUT%20Ranchi-8855ff?style=for-the-badge)](https://jutranchi.ac.in/)

> **Enterprise-grade BIM Intelligence & IoT Digital Twin Dashboard** for the **Department of Civil Engineering, Chaibasa Engineering College (CEC), Jharkhand University of Technology (JUT), Ranchi, Jharkhand, India**.

Created & Developed by **Devendra Gupta** — BIM Automation Professional at BMSI Gurugram & Author published in **Automation in Construction (Elsevier)**.

---

## 🌟 Highlights & Features

- **3D Procedural BIM Model**: Faithfully recreated in Three.js from Autodesk Revit & Navisworks (`CIVIL DEPARTMENT CEC 01.nwc`), featuring G+2 floors, cream facade with red horizontal band courses, 4 projecting corner towers with top apertures, double window wings, and entrance portico signage.
- **25 Simulated IoT Data Streams**: Live environmental monitoring across 3 floors + MEP systems (Temperature, Humidity, CO2, Occupancy, Energy Load, Noise, and Structural Vibration) updating every 2.5 seconds.
- **AI Anomaly Detection Engine**: Isolation Forest ML simulation flagging real-time indoor air quality (CO2 spikes up to 1600 ppm) and thermal variances.
- **Natural Language AI Query Bar**: Ask questions in plain English (e.g., *"Which floor has highest CO2?"*, *"What is total energy load?"*).
- **Cinematic Glassmorphism UI**: NASA mission-control dark theme (`#040810`), real-time Chart.js energy trend graph, dynamic SVG building health score arc (0–100), alert popups, and scanline overlay.

---

## 🔰 Simple Step-by-Step Guide (For Non-Technical Users)

You don't need any programming background to run this digital twin dashboard! Follow these simple steps:

### Step 1: Install Node.js (Only required once)
1. Download **Node.js** (LTS version) from the official website: 👉 **[https://nodejs.org/](https://nodejs.org/)**
2. Run the downloaded installer (`.msi` file) and click **Next** through all prompts until installation completes.

### Step 2: Open Command Prompt or Terminal
1. Press `Windows Key + R` on your keyboard.
2. Type `cmd` and press **Enter**.
3. Navigate to this project folder by typing:
   ```cmd
   cd "path\to\CEC-civil-department-virtual-digital-twin-dashboard"
   ```
   *(Replace `path\to\...` with where you saved this folder on your computer)*.

### Step 3: Install Project Packages
Type the following command and press **Enter**:
```bash
npm install
```
*Wait about 30 seconds for the packages to download automatically.*

### Step 4: Launch the Digital Twin Dashboard!
Type the following command and press **Enter**:
```bash
npm run dev
```

### Step 5: View in Your Web Browser
Open your internet browser (Chrome, Edge, Firefox, or Safari) and go to:
👉 **`http://localhost:3000/`**

🎉 **Congratulations!** Your 3D AI Digital Twin Dashboard is now live and rotating on your screen!

---

## 🎮 How to Interact with the Dashboard

- **Rotate & Zoom 3D Building**: Click and drag your mouse anywhere on the 3D canvas to rotate the building. Use your mouse scroll wheel to zoom in or out.
- **Switch Floor Views**: Click any floor button on the left sidebar (**Ground Floor**, **First Floor**, **Second Floor**) to move the camera and view that specific floor's live sensor cards.
- **Change Camera Angle**: Use the top-left buttons on the 3D canvas (**3D View**, **Floor Plan**, **Front Elevation**, or **Pause**).
- **Ask AI Questions**: Click the **"Ask AI"** input box at the bottom right, type a question like `Which floor has highest CO2?`, and press Enter to receive an instant AI report.

---

## 🛠️ Technology Stack

- **Core**: React 18 + Vite
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Styling**: Vanilla CSS tokens + Tailwind CSS + Glassmorphism Backdrop Blurs
- **Charts**: Chart.js + `react-chartjs-2`
- **Icons**: Lucide React

---

## 📄 Academic & Industry Citation

If you use this digital twin framework in your research, scholarship applications, or BIM portfolio, please cite:

```text
Gupta, D. (2025). AI Digital Twin & BIM Intelligence Dashboard for Academic Infrastructure.
Automation in Construction, Elsevier.
Department of Civil Engineering, Chaibasa Engineering College, JUT Ranchi.
```

---

## 👨‍💻 Author Profile

**Devendra Gupta**
* BIM Automation Professional | BMSI Gurugram
* Specialization: BIM + AI Integration, IoT Digital Twins, Revit Automation & Computational Design
* Email: [devendragupta.bim@gmail.com](mailto:devendragupta.bim@gmail.com)
* GitHub: [@devendragupta-BIM](https://github.com/devendragupta-BIM)

---

*Chaibasa Engineering College, Jharkhand University of Technology (JUT), Ranchi · 2025*
