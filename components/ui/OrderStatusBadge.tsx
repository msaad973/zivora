interface Props {
  status: string;
}

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-900/30 text-green-400",
  Shipped: "bg-blue-900/30 text-blue-400",
  Pending: "bg-orange-900/30 text-orange-400",
};

export default function OrderStatusBadge({ status }: Props) {
  const style = statusStyles[status] ?? "bg-white/10 text-white/50";
  return (
    <span className={`px-2 py-1 text-xs rounded-sm ${style}`}>
      {status}
    </span>
  );
}
