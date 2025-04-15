export interface NavLink {
  id: number;
  title: string;
  url: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

export interface PrincipleItem {
  id: number;
  title: string;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  position?: string;
  content: string;
  rating: number;
} 