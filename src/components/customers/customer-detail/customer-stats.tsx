import { Calendar, FileText, Receipt, MessageSquare } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

function StatItem({ icon, value, label, color }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className={`p-2 rounded-md ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900">${value.toFixed(2)}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

export function CustomerStats() {
  const stats = [
    {
      icon: <FileText className="h-4 w-4 text-red-600" />,
      value: 0.00,
      label: "Past Due (Jobs & Invoices)",
      color: "bg-red-50",
    },
    {
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
      value: 0.00,
      label: "Due (Jobs & Invoices)",
      color: "bg-blue-50",
    },
    {
      icon: <Receipt className="h-4 w-4 text-green-600" />,
      value: 0.00,
      label: "Total Revenue",
      color: "bg-green-50",
    },
    {
      icon: <MessageSquare className="h-4 w-4 text-purple-600" />,
      value: 0,
      label: "Estimates",
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
}