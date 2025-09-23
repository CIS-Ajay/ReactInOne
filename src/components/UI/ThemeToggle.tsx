import { toggleTheme } from "../../feature/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = () => {
    const theme = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    return (
        <button
        onClick={() => dispatch(toggleTheme())}
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 p-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
        >
        {theme === "dark" ? (
            <span>
            <HiSun className="w-5 h-5" aria-hidden="true" />
            </span>
        ) : (
            <span>
            <HiMoon className="w-5 h-5" aria-hidden="true" />
            </span>
        )}
        <span className="sr-only">Toggle dark mode</span>
        </button>
    );
};

export default ThemeToggle;
