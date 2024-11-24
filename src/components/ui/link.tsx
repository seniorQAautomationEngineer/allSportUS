import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import './link.css';

interface CustomLinkProps extends LinkProps {
  className?: string;
}

const Link: React.FC<CustomLinkProps> = ({ children, className = '', ...props }) => (
  <RouterLink
    className={`custom-link ${className}`}
    {...props}
  >
    {children}
  </RouterLink>
);

export default Link;