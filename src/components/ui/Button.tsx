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
  transition: all 0.3s ease;
  font-weight: 400;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Size variants */
  ${({ $size }) =>
    $size === 'small' && `
      font-size: 0.8rem;
      padding: 0.6rem 1.2rem;
    `}

  ${({ $size }) =>
    $size === 'medium' && `
      font-size: 0.9rem;
      padding: 0.8rem 1.8rem;
    `}

  ${({ $size }) =>
    $size === 'large' && `
      font-size: 1rem;
      padding: 1rem 2.5rem;

      ${media.sm} {
        padding: 0.9rem 2rem;
      }
    `}

  /* Color variants */
  ${({ $variant }) =>
    $variant === 'primary' && `
      background-color: var(--color-primary);
      color: white;

      &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-3px);
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' && `
      background-color: var(--color-secondary);
      color: white;

      &:hover {
        background-color: #555;
        transform: translateY(-3px);
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' && `
      background-color: transparent;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);

      &:hover {
        background-color: var(--color-primary);
        color: white;
        transform: translateY(-3px);
      }

      &:disabled {
        border-color: #ccc;
        color: #ccc;
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
  transition: all 0.3s ease;
  font-weight: 400;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  text-decoration: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Size variants */
  ${({ $size }) =>
    $size === 'small' && `
      font-size: 0.8rem;
      padding: 0.6rem 1.2rem;
    `}

  ${({ $size }) =>
    $size === 'medium' && `
      font-size: 0.9rem;
      padding: 0.8rem 1.8rem;
    `}

  ${({ $size }) =>
    $size === 'large' && `
      font-size: 1rem;
      padding: 1rem 2.5rem;

      ${media.sm} {
        padding: 0.9rem 2rem;
      }
    `}

  /* Color variants */
  ${({ $variant }) =>
    $variant === 'primary' && `
      background-color: var(--color-primary);
      color: white;

      &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-3px);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' && `
      background-color: var(--color-secondary);
      color: white;

      &:hover {
        background-color: #555;
        transform: translateY(-3px);
      }
    `}

  ${({ $variant }) =>
    $variant === 'outline' && `
      background-color: transparent;
      color: var(--color-primary);
      border: 1px solid var(--color-primary);

      &:hover {
        background-color: var(--color-primary);
        color: white;
        transform: translateY(-3px);
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