
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

interface UserMenuProps {
  onShowHistory: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onShowHistory }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex-1">
        <p className="text-sm text-gray-600 italic">
          "You've shown a lot of courage lately. Want to help others find theirs?"
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowHistory}
        className="flex items-center space-x-1 text-gray-600 hover:text-payment-purple ml-4"
      >
        <History size={16} />
        <span className="text-sm">History</span>
      </Button>
    </div>
  );
};

export default UserMenu;
