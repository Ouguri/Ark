import { ref } from "vue";
import { userStore } from "@/stores/user";

export const getUserAvater = () => {
  const useUserStore = userStore();
  const avatar = ref<string>("");
  const username = ref<string>("");

  const avatarGetStart = () => {
    avatar.value = `http://localhost:3000/avatar/${
      useUserStore.user.avatar as string
    }`;
  };

  const usernameGetStart = () => {
    username.value = useUserStore.user.username;
  };

  return {
    avatar,
    username,
    avatarGetStart,
    usernameGetStart,
  };
};
