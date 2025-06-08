import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
  className?: string;
}

export default function LoginButton({ className = '' }: LoginButtonProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogin}
      className={`
        fixed top-3 right-3 sm:top-4 sm:right-4 z-50
        px-4 py-2.5 sm:px-6 sm:py-3 
        min-h-[44px] sm:min-h-[48px] min-w-[72px] sm:min-w-[80px]
        bg-black/20 backdrop-blur-sm
        border border-white/20
        rounded-lg sm:rounded-xl
        text-white font-bold text-sm sm:text-base
        transition-all duration-300
        hover:bg-black/30 hover:border-white/30 hover:scale-105
        active:scale-95
        shadow-lg hover:shadow-xl
        touch-manipulation
        select-none
        animate-fade-in
        ${className}
      `}
      aria-label="Đăng nhập"
    >
      Login
    </button>
  );
} 