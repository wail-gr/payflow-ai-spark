
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

interface UserMenuProps {
  onShowHistory: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onShowHistory }) => {
  return (
    <div className="flex justify-end items-center p-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowHistory}
        className="flex items-center space-x-1 text-gray-600 hover:text-payment-purple"
      >
        <History size={16} />
        <span className="text-sm">History</span>
      </Button>
    </div>
  );
};

export default UserMenu;
