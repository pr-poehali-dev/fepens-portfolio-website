import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const skills = [
    {
      title: 'Roblox Developer',
      description: 'Создаю игры и скрипты для Roblox Studio с использованием Lua',
      icon: 'Gamepad2',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Блогер',
      description: 'Создаю контент для YouTube, Twitch и других платформ',
      icon: 'Video',
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-primary text-glow">Fepens</span>
          </h1>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Навыки
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Привет, это{' '}
              <span className="text-primary text-glow">Fepens</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Я <span className="text-primary font-semibold">Roblox Developer</span>
            </p>
            <p className="text-lg text-muted-foreground">
              Создаю увлекательные игры и скрипты для Roblox Studio
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
              >
                Связаться
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.youtube.com/@fepens.official/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
              >
                <Icon name="Youtube" size={20} />
              </a>
              <a
                href="https://t.me/fepensteam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
              >
                <Icon name="Send" size={20} />
              </a>
              <a
                href="https://www.twitch.tv/fepens09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
              >
                <Icon name="Twitch" size={20} />
              </a>
              <a
                href="https://dalink.to/fepens09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
              >
                <Icon name="Heart" size={20} />
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 glow-cyan-strong animate-pulse-glow rounded-2xl"></div>
              <img
                src="https://cdn.poehali.dev/files/c179648e-d48c-4678-bfe3-1c68dffeca8b.jpg"
                alt="Profile"
                className="w-80 h-80 md:w-96 md:h-96 object-cover border-4 border-primary relative z-10 animate-float rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-glow">
            Мои <span className="text-primary">Навыки</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border hover:border-primary transition-all duration-300 hover:glow-cyan group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon name={skill.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-8 text-glow">
            Свяжись со <span className="text-primary">мной</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Есть идея проекта? Давай обсудим!
          </p>
          <Card className="p-8 bg-card border-border hover:border-primary transition-all animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Textarea
                  placeholder="Расскажите о вашем проекте..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-primary min-h-32"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
              >
                Отправить сообщение
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 Fepens. Сделано с 🚀 на poehali.dev</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;