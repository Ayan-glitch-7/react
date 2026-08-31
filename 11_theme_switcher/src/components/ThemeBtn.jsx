import useTheme from "../contexts/Theme";

function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    if (e.currentTarget.checked) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={themeMode === "dark"}
        onChange={onChangeBtn}
        className="h-5 w-5 cursor-pointer"
      />

      <span className="text-black dark:text-white">Toggle Theme</span>
    </div>
  );
}

export default ThemeBtn;
