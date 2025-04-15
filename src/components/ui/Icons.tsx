import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaClock, FaGraduationCap, FaMapMarkerAlt, FaMoneyBillWave, FaLaptop, FaUsers, FaBook, FaLightbulb, FaCertificate, FaBrain, FaChartLine, FaStar, FaHeart, FaHandsHelping, FaComments } from 'react-icons/fa';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const IconWrapper = styled.span<{ color?: string; size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color || 'inherit'};
  font-size: ${({ size }) => (size ? `${size}px` : '24px')};
  line-height: 1;
  margin-right: 10px;
`;

const Icon: React.FC<IconProps> = ({ name, size, color }) => {
  const renderIcon = () => {
    switch (name) {
      case 'calendar':
        return <FaCalendarAlt />;
      case 'clock':
        return <FaClock />;
      case 'graduation':
        return <FaGraduationCap />;
      case 'location':
        return <FaMapMarkerAlt />;
      case 'money':
        return <FaMoneyBillWave />;
      case 'laptop':
        return <FaLaptop />;
      case 'users':
        return <FaUsers />;
      case 'book':
        return <FaBook />;
      case 'lightbulb':
        return <FaLightbulb />;
      case 'certificate':
        return <FaCertificate />;
      case 'brain':
        return <FaBrain />;
      case 'chart':
        return <FaChartLine />;
      case 'star':
        return <FaStar />;
      case 'heart':
        return <FaHeart />;
      case 'hands':
        return <FaHandsHelping />;
      case 'comments':
        return <FaComments />;
      default:
        return <FaLightbulb />;
    }
  };

  return (
    <IconWrapper color={color} size={size}>
      {renderIcon()}
    </IconWrapper>
  );
};

export default Icon; 