interface CustomerAvatarProps {
  name: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AS';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function CustomerAvatar({ name }: CustomerAvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ED1C24]/25 bg-[#FFF0F0] font-display text-sm font-bold tracking-wider text-[#C81018]"
    >
      {initials}
    </div>
  );
}
