import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { resolveAssetUrl } from '../../lib/assetUrl';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  fallbackLabel?: string;
}

export function SmartImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  width,
  height,
  fallbackLabel,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F7F7] to-[#EAEAEA] text-[#626262] p-6 text-center ${className}`}
      >
        <Building2 className="h-8 w-8 text-[#ED1C24]/70 mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium text-[#101010]">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={resolveAssetUrl(src)}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
