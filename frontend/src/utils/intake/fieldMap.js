export const getFields = (role) => {
  const common = [
    { name: "origin", label: "Origin", type: "text" },
    { name: "destination", label: "Destination", type: "text" },
    { name: "weight", label: "Weight (kg)", type: "number" },
  ];

  const roleMap = {
    agent: [...common, { name: "insurance", label: "Insurance", type: "checkbox" }],
    field: [...common],
    ops: [...common, { name: "priority", label: "Priority Level", type: "select", options: [1, 2, 3] }],
  };

  return roleMap[role] || common;
};
