# CarCharging Frontend ️⚡🚗
User interface for the CarCharging system. It visualizes the energy mix forecast for the upcoming days and allows users to calculate the most eco-friendly charging window in upcoming 48h.

Do you want a preview? [Here you can check it!](https://nextjs-render-fuqh.onrender.com/) 

[Link to backend repo](https://github.com/qualv13/CarCharging)

## 🛠️ Technologies used
- Framework: [React]
- Language: [TypeScript]
- HTTP Client: [Axios]
- Visualization: [Recharts]
- Style: [CSS Inline Styles]

## 📂 Project structire
```text
src/
├── components/         # UI elements
│   ├── ForecastDashboard.tsx # Container for charts
│   ├── FuelMixChart.tsx      # Chart maker
│   └── SmartCalculator.tsx   # Form and result for car charging window
│
├── hooks/              # Connection to backend
│   └── useEnergyApi.ts       # EndPoints use
│
├── interfaces/         # Interfaces used
│   └── types.ts              # DTOs
│
├── pages/              # Pages
│   └── index.tsx             # Main page with all elements
│
└── utils/              # Config files
    └── config.ts             # backend URL
```

## How to run ❓
```bash
   yarn install
   yarn dev
```
and open [http://localhost:3000](http://localhost:3000)

Feel free to use it.
