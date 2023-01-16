// 主题控制
import { ref } from "vue";
export const useTheme = () => {
  const isDarkTheme = ref<boolean>(false);

  // theme change
  const changeTheme = () => {
    if (isDarkTheme.value) {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--font--color", "rgb(23, 23, 25)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--bg-color", "rgb(253, 253, 253)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--nav-color", "rgba(253, 253, 253, 0.93)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--article-font-color", "rgb(23, 23, 25)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--article-card-color", "rgb(253, 253, 253)");
    } else {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--font--color", "rgb(253, 253, 253)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--bg-color", "rgb(23, 23, 25)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--nav-color", "rgba(23, 23, 25, 0.93)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--article-font-color", "rgb(233, 223, 204)");
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--article-card-color", "rgb(18, 15, 25)");
    }
  };

  return { isDarkTheme, changeTheme };
};
