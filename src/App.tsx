import React, { useState, useEffect } from 'react';
import { usePixelTracking } from './components/PixelEvents';
import { openDiscord, copyDiscordInvite } from './utils/discordDeepLink';
import { 
  Play, 
  Users, 
  Car, 
  Building, 
  Trophy, 
  Calendar,
  MessageCircle,
  Star,
  Shield,
  Briefcase,
  Home,
  Zap,
  Clock,
  ArrowRight,
  ExternalLink,
  Target,
  Crown,
  Gamepad2,
  MapPin,
  Timer,
  Award,
  Sparkles,
  Heart,
  TrendingUp,
  Activity,
  ChevronDown,
  Monitor,
  Smartphone,
  X,
  Check
} from 'lucide-react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [playersOnline, setPlayersOnline] = useState(287);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [copied, setCopied] = useState(false);
  const { trackEvent } = usePixelTracking();

  // Função para lidar com cliques no Discord
  const handleDiscordClick = (location: string) => {
    trackEvent('discord_click', { button_location: location });
    openDiscord('T33nsSSC8a');
  };

  // Função para copiar convite
  const handleCopyInvite = async (location: string) => {
    trackEvent('copy_invite', { button_location: location });
    const success = await copyDiscordInvite('T33nsSSC8a');
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Track page view on component mount
  useEffect(() => {
    trackEvent('page_view');
  }, []);

  // Animação do contador de players
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Ação policial intensa",
      description: "Perseguições e operações realistas que fazem seu coração acelerar"
    },
    {
      icon: Briefcase,
      title: "Trabalhos e empresas",
      description: "Economia viva e dinâmica - construa seu império na cidade"
    },
    {
      icon: Trophy,
      title: "Eventos semanais",
      description: "Premiações em PIX e itens raros - sua chance de brilhar!"
    },
    {
      icon: Users,
      title: "Roleplay de qualidade",
      description: "Comunidade engajada e madura que leva o RP a sério"
    },
    {
      icon: Car,
      title: "Veículos exclusivos",
      description: "Customização e estilo - seja único nas ruas de Los Santos"
    },
    {
      icon: Home,
      title: "Imóveis personalizados",
      description: "Viva do jeito que quiser - sua casa, suas regras"
    }
  ];

  const events = [
    { 
      day: "Segunda", 
      event: "Corrida premiada", 
      time: "20h", 
      prize: "R$ 50 PIX",
      icon: Target
    },
    { 
      day: "Quarta", 
      event: "Guerra de facções", 
      time: "21h", 
      prize: "Itens raros",
      icon: Crown
    },
    { 
      day: "Sexta", 
      event: "Roleplay Night", 
      time: "19h", 
      prize: "XP Duplo",
      icon: Gamepad2
    },
    { 
      day: "Sábado", 
      event: "Battle Royale", 
      time: "20h", 
      prize: "R$ 100 PIX",
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: "João_Silva",
      text: "Melhor servidor que já joguei! A comunidade é incrível e os eventos são demais!",
      role: "Policial Civil",
      icon: Shield,
      rating: 5
    },
    {
      name: "MariaRP",
      text: "Já ganhei R$ 200 em eventos aqui! Além de ser muito divertido",
      role: "Empresária",
      icon: Briefcase,
      rating: 5
    },
    {
      name: "CarlosSpeed",
      text: "As corridas aqui são épicas! Nunca vi nada igual no FiveM",
      role: "Piloto",
      icon: Car,
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modal de Verificação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Você já joga GTA RP no FiveM?
              </h3>
              <p className="text-gray-600">
                Precisamos saber se você tem experiência com roleplay no FiveM
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  // Mostrar mensagem de não suporte mobile
                  setTimeout(() => {
                    const mobileWarning = document.createElement('div');
                    mobileWarning.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
                    mobileWarning.innerHTML = `
                      <div class="flex items-start gap-3">
                        <div class="flex-shrink-0">
                          <svg class="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 class="font-bold mb-1">Ops! 📱</h4>
                          <p class="text-sm">Infelizmente ainda não temos suporte para mobile. O FiveM funciona apenas no PC!</p>
                          <button onclick="this.parentElement.parentElement.parentElement.remove()" class="mt-2 text-xs underline">Entendi</button>
                        </div>
                      </div>
                    `;
                    document.body.appendChild(mobileWarning);
                    
                    setTimeout(() => {
                      if (document.body.contains(mobileWarning)) {
                        document.body.removeChild(mobileWarning);
                      }
                    }, 8000);
                  }, 500);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
              >
                <Smartphone className="w-5 h-5" />
                Não, nunca joguei
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setTimeout(() => handleDiscordClick('modal_verification'), 500);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
              >
                <Monitor className="w-5 h-5" />
                Sim, já tenho PC e sei o que é FiveM
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.imgur.com/your-logo.png" 
              alt="Antares Roleplay" 
              className="w-10 h-10 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-white font-bold text-sm">AR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Antares RP</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">{playersOnline} online</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Entrar no servidor
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="https://i.imgur.com/your-logo.png" 
                alt="Antares Roleplay Logo" 
                className="w-20 h-20 mx-auto rounded-2xl shadow-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-2xl">AR</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Antares
              <span className="block text-purple-600">Roleplay</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
              A cidade mais realista e imersiva do FiveM.<br />
              Roleplay de qualidade, eventos exclusivos e premiações em PIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => setShowModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 inline-flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Entrar no Discord
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => handleCopyInvite('hero_secondary')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3"
              >
                {copied ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    Convite copiado!
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-6 h-6" />
                    Copiar convite
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{playersOnline}</div>
                <div className="text-gray-600">Players Online</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-gray-600">Membros Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-gray-600">Servidor Online</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Veja como é jogar no Antares RP
            </h2>
            <p className="text-xl text-gray-600">
              Experiência única de roleplay que você nunca viu antes
            </p>
          </div>

          <div className="relative group">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/yd6DqFZ9MGQ"
                title="Antares Roleplay - Trailer"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-3"
            >
              <Zap className="w-6 h-6" />
              Quero fazer parte!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Antares RP?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência de roleplay do FiveM com recursos únicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Eventos desta semana
            </h2>
            <p className="text-xl text-gray-600">
              Premiações em PIX e muito mais!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <event.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.day}</h3>
                  <p className="text-gray-600 font-medium mb-2">{event.event}</p>
                  <div className="flex items-center justify-center gap-1 text-purple-600 font-semibold mb-3">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {event.prize}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossa comunidade diz
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 500 players ativos todos os dias
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <testimonial.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Junte-se a centenas de players e viva a melhor experiência de roleplay
          </p>

          {/* Contador regressivo */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block">
            <div className="flex items-center gap-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs text-purple-200">HORAS</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs text-purple-200">MIN</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs text-purple-200">SEG</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-purple-600 px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center gap-4"
          >
            <MessageCircle className="w-8 h-8" />
            ENTRAR AGORA
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-purple-200 mt-6 text-lg">
            Whitelist aberta por tempo limitado!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src="https://i.imgur.com/your-logo.png" 
              alt="Antares Roleplay" 
              className="w-10 h-10 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-white font-bold text-sm">AR</span>
            </div>
            <span className="text-xl font-bold text-white">Antares Roleplay</span>
          </div>
          <p className="text-gray-400 mb-4">
            A cidade mais realista e imersiva do FiveM
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Antares Roleplay. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;