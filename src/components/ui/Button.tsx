import React from 'react';
import styled from 'styled-components';
import media from '../../styles/media';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 400;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) =>
    $size === 'small' && `
      font-size: 0.8rem;
      padding: 0.65rem 1.4rem;
    `}

  ${({ $size }) =>
    $size === 'medium' && `
      font-size: 0.85rem;
      padding: 0.9rem 2rem;
    `}

  ${({ $size }) =>
    $size === 'large' && `
      font-size: 0.95rem;
      padding: 1.1rem 2.8rem;

      ${media.sm} {
        padding: 1rem 2.2rem;
      }
    `}

  ${({ $variant }) =>
    $variant === 'primary' && `
      background-color: var(--color-primary);
      color: white;

      &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #d0d0d0;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' && `
      background-color: var(--color-secondary);
      color: white;

      &:hover {
        background-color: #6a6a6a;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        background-color: #d0d0d0;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' && `
      background-color: transparent;
      color: var(--color-primary);
      border: 1.5px solid var(--color-primary);
      box-shadow: none;

      &:hover {
        background-color: var(--color-primary);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        border-color: #d0d0d0;
        color: #d0d0d0;
        cursor: not-allowed;
        transform: none;
      }
    `}
`;

const StyledAnchor = styled.a<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 400;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) =>
    $size === 'small' && `
      font-size: 0.8rem;
      padding: 0.65rem 1.4rem;
    `}

  ${({ $size }) =>
    $size === 'medium' && `
      font-size: 0.85rem;
      padding: 0.9rem 2rem;
    `}

  ${({ $size }) =>
    $size === 'large' && `
      font-size: 0.95rem;
      padding: 1.1rem 2.8rem;

      ${media.sm} {
        padding: 1rem 2.2rem;
      }
    `}

  ${({ $variant }) =>
    $variant === 'primary' && `
      background-color: var(--color-primary);
      color: white;

      &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' && `
      background-color: var(--color-secondary);
      color: white;

      &:hover {
        background-color: #6a6a6a;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' && `
      background-color: transparent;
      color: var(--color-primary);
      border: 1.5px solid var(--color-primary);
      box-shadow: none;

      &:hover {
        background-color: var(--color-primary);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  href,
}) => {
  if (href) {
    return (
      <StyledAnchor
        href={href}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
      >
        {children}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 