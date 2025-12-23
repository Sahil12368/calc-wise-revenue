import { cn } from '@/lib/utils';

interface AdPlacementProps {
  type: 'header' | 'sidebar' | 'in-content' | 'mobile-footer' | 'below-calculator';
  className?: string;
}

const adSizes: Record<AdPlacementProps['type'], { width: string; height: string; label: string }> = {
  header: { width: 'w-full max-w-[728px]', height: 'h-[90px]', label: 'Header Ad (728x90)' },
  sidebar: { width: 'w-full max-w-[300px]', height: 'h-[250px]', label: 'Sidebar Ad (300x250)' },
  'in-content': { width: 'w-full max-w-[336px]', height: 'h-[280px]', label: 'In-Content Ad (336x280)' },
  'mobile-footer': { width: 'w-full', height: 'h-[50px]', label: 'Mobile Ad (320x50)' },
  'below-calculator': { width: 'w-full max-w-[728px]', height: 'h-[90px]', label: 'Below Calculator Ad' },
};

const AdPlacement = ({ type, className }: AdPlacementProps) => {
  const size = adSizes[type];

  return (
    <div
      className={cn(
        'mx-auto my-4',
        type === 'sidebar' && 'sticky top-20',
        className
      )}
    >
      <div
        className={cn(
          'ad-placeholder mx-auto',
          size.width,
          size.height
        )}
      >
        <span className="text-xs">{size.label}</span>
      </div>
    </div>
  );
};

export default AdPlacement;
