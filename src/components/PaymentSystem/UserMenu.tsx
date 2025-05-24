
import React from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { User, History, LogOut, Settings } from 'lucide-react';

interface UserMenuProps {
  onShowAuth: () => void;
  onShowHistory: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onShowAuth, onShowHistory }) => {
  const { user, logout } = usePayment();

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-payment-purple to-payment-teal rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">P</span>
        </div>
        <span className="font-medium text-gray-800">Payment</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {user ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowHistory}
              className="flex items-center space-x-1 text-gray-600 hover:text-payment-purple"
            >
              <History size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <LogOut size={16} />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowAuth}
            className="flex items-center space-x-1 text-gray-600 hover:text-payment-purple"
          >
            <User size={16} />
            <span className="text-sm">Sign In</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
