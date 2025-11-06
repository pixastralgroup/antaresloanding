// Função para detectar se é dispositivo móvel
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Função para detectar sistema operacional
export const getOS = (): 'ios' | 'android' | 'other' => {
  const userAgent = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios';
  if (/Android/.test(userAgent)) return 'android';
  return 'other';
};

// Função para detectar Safari
export const isSafari = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

// Função para abrir Discord com deep linking
export const openDiscord = (inviteCode: string = 'T33nsSSC8a'): void => {
  const webUrl = `https://discord.gg/${inviteCode}`;
  
  if (!isMobile()) {
    // Desktop - abre direto no navegador
    window.open(webUrl, '_blank');
    return;
  }

  const os = getOS();
  const safari = isSafari();
  
  // URLs de deep linking para mobile
  const deepLinks = {
    ios: `discord://discord.com/invite/${inviteCode}`,
    android: `discord://discord.com/invite/${inviteCode}`
  };

  // Para Safari no iOS, usa uma abordagem diferente
  if (safari && os === 'ios') {
    // Tenta o deep link primeiro
    const startTime = Date.now();
    
    // Cria um link invisível e clica nele
    const link = document.createElement('a');
    link.href = deepLinks.ios;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Clica no link
    link.click();
    document.body.removeChild(link);
    
    // Verifica se o app abriu checando se a página perdeu foco
    const checkAppOpened = () => {
      const timeElapsed = Date.now() - startTime;
      
      // Se passou mais de 2 segundos e ainda está na página, abre o fallback
      if (timeElapsed > 2000 && !document.hidden) {
        window.location.href = webUrl;
      }
    };
    
    // Verifica após 2.5 segundos
    setTimeout(checkAppOpened, 2500);
    
    // Se a página ficar oculta (app abriu), não faz nada
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return;
  }

  // Para outros navegadores mobile
  if (os === 'ios' || os === 'android') {
    // Método tradicional com iframe para outros navegadores
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLinks[os];
    document.body.appendChild(iframe);

    // Remove o iframe após tentar
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1000);

    // Fallback para web após 2 segundos se o app não abrir
    const fallbackTimer = setTimeout(() => {
      window.open(webUrl, '_blank');
    }, 2000);

    // Se o usuário sair da página (app abriu), cancela o fallback
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(fallbackTimer);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Também cancela se a página perder foco
    const handleBlur = () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('blur', handleBlur);
    };

    window.addEventListener('blur', handleBlur);
  } else {
    // Outros dispositivos - abre no navegador
    window.open(webUrl, '_blank');
  }
};

// Função para copiar convite
export const copyDiscordInvite = (inviteCode: string = 'T33nsSSC8a'): Promise<boolean> => {
  const inviteUrl = `https://discord.gg/${inviteCode}`;
  
  return navigator.clipboard.writeText(inviteUrl)
    .then(() => true)
    .catch(() => {
      // Fallback para dispositivos mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = inviteUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    });
};