import { useAuth } from "../context/AuthContext";

function SettingsPage() {

    const {logout} = useAuth()


    const root = document.documentElement;

    type Theme = 'light' | 'dark' | 'system';

    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
      } else {
        root.classList.toggle('dark', t === 'dark');
      }
    }

    return (
        <div className="w-full">
            <div className="flex gap-3">
                <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1 rounded-full px-2 py-1 cursor-pointer"
                >
                    Dark
                </button>
                <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1 rounded-full px-2 py-1 cursor-pointer"
                    onClick={() => applyTheme('light')}
                >
                    Light
                </button>
                
            </div>
            <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1  px-2 py-1 rounded-xl cursor-pointer"
                onClick={() => logout()}
            >
                Log Out
            </button>
        </div>
    )
}

export default SettingsPage

