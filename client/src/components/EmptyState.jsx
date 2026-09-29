import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'Get started by creating your first entry.',
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-[#1E2633] rounded-2xl bg-[#121821]/40">
      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};
