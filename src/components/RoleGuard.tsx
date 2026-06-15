import React from 'react';

type RoleGuardProps = {
  role: string;
  allowed: string[];
  children: React.ReactNode;
};

const RoleGuard: React.FC<RoleGuardProps> = ({ role, allowed, children }) => {
  if (!allowed.includes(role)) return null;
  return <>{children}</>;
};

export default RoleGuard; 