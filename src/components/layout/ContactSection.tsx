import { useState } from 'react';
import styled from 'styled-components';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import AnimatedElement from '../ui/AnimatedElement';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '../../data/constants';
import media from '../../styles/media';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSectionContainer = styled.section`
  padding: 7rem 0;
  background-color: var(--color-bg);

  ${media.md} {
    padding: 6rem 0;
  }

  ${media.sm} {
    padding: 5rem 0;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 4rem auto 0;

  ${media.lg} {
    gap: 3rem;
  }

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 4rem;
    max-width: 650px;
    text-align: center;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-bottom: 3rem;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-secondary);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  ${media.sm} {
    font-size: 1rem;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const ContactItem = styled.div`
  text-align: center;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    font-weight: 400;
  }

  a {
    font-size: 1.1rem;
    color: var(--color-secondary);
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;

    &:hover {
      color: var(--color-primary);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  color: var(--color-primary);
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    background-color: var(--color-primary);
    color: white;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 3.5rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, var(--color-primary-light), var(--color-primary-dark));
  }
  
  ${media.sm} {
    padding: 2.5rem 2rem;
    border-radius: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
  color: var(--color-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
  font-family: var(--font-primary);
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 1px solid #eaeaea;
  background-color: #fafafa;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-radius: 12px;
  font-family: var(--font-primary);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(184, 154, 134, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem 1.2rem;
  border: 1px solid #eaeaea;
  background-color: #fafafa;
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 160px;
  border-radius: 12px;
  font-family: var(--font-primary);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: white;
    box-shadow: 0 0 0 3px rgba(184, 154, 134, 0.1);
  }
`;

const SubmitButton = styled.div`
  margin-top: 1rem;
`;

const ContactButton = styled.button`
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: white;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border: none;
  width: 100%;
  font-family: var(--font-primary);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const FormSuccess = styled.div`
  background-color: rgba(0, 128, 0, 0.05);
  color: #2e7d32;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 128, 0, 0.1);
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// Социальные иконки
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.25l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы на сервер
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'instagram':
        return <InstagramIcon />;
      case 'whatsapp':
        return <WhatsAppIcon />;
      default:
        return null;
    }
  };

  return (
    <ContactSectionContainer id="contact">
      <Container>
        <AnimatedElement animation="fadeIn">
          <SectionTitle
            title="Контакты"
            subtitle="Свяжитесь со мной любым удобным для вас способом, чтобы задать вопросы или записаться на консультацию"
            centered
          />
        </AnimatedElement>

        <ContactWrapper>
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <ContactInfoContainer>
              <ContactInfo>
                <ContactText>
                  Я всегда открыта для диалога и готова ответить на все ваши вопросы. Если вы
                  решили сделать первый шаг к изменениям в своей жизни, я буду рада помочь вам
                  на этом пути.
                </ContactText>
              </ContactInfo>

              <ContactDetails>
                <ContactItem>
                  <h4>Телефон</h4>
                  <a href={`tel:${CONTACT_PHONE}`}>
                    <Icon><PhoneIcon /></Icon>
                    {CONTACT_PHONE}
                  </a>
                </ContactItem>

                <ContactItem>
                  <h4>Email</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <Icon><EmailIcon /></Icon>
                    {CONTACT_EMAIL}
                  </a>
                </ContactItem>

                <ContactItem>
                  <h4>Социальные сети</h4>
                  <SocialLinks>
                    {SOCIAL_LINKS.map((link) => (
                      <SocialLink
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                      >
                        {renderSocialIcon(link.icon)}
                      </SocialLink>
                    ))}
                  </SocialLinks>
                </ContactItem>
              </ContactDetails>
            </ContactInfoContainer>
          </AnimatedElement>

          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <FormContainer>
              {isSubmitted && (
                <FormSuccess>
                  Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.
                </FormSuccess>
              )}

              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="email">Электронная почта</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </InputGroup>

                <SubmitButton>
                  <ContactButton type="submit">Отправить сообщение</ContactButton>
                </SubmitButton>
              </Form>
            </FormContainer>
          </AnimatedElement>
        </ContactWrapper>
      </Container>
    </ContactSectionContainer>
  );
};

export default ContactSection; 