// generate-structure.mjs
import fs from "fs";
import path from "path";

const folders = [
  "src/components",
  "src/components/charts",
  "src/components/ui",
  "src/lib",
  "src/lib/api",
  "src/lib/utils",
  "src/styles",
  "src/app/dashboard",
  "src/app/products",
  "src/app/sales",
  "src/app/reports",
  "src/app/api",
  "src/app/api/sales",
  "src/app/api/products"
];

const files = {
  "src/components/charts/SalesChart.jsx": "",
  "src/components/charts/TrendsChart.jsx": "",
  "src/components/ui/Navbar.jsx": "",
  "src/components/ui/Sidebar.jsx": "",

  "src/lib/api/sales.js": "",
  "src/lib/api/products.js": "",
  "src/lib/utils/format.js": "",

  "src/styles/dashboard.css": "",
  "src/styles/forms.css": "",

  "src/app/dashboard/page.tsx": "",
  "src/app/products/page.tsx": "",
  "src/app/sales/page.tsx": "",
  "src/app/reports/page.tsx": "",

  "src/app/api/sales/route.ts": "",
  "src/app/api/products/route.ts": ""
};

// Create folders
folders.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log("📁 Folder created:", folder);
  }
});

// Create empty files
Object.entries(files).forEach(([filePath, content]) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log("📄 File created:", filePath);
  }
});

console.log("\n✅ Structure generated successfully.");
