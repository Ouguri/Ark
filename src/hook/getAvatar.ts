import { ref } from "vue";
import { userStore } from "@/stores/user";

export const getUserAvater = () => {
  const useUserStore = userStore();
  const avatar = ref<string>("");
  const avatarGetStart = () => {
    avatar.value = `http://localhost:3000/avatar/${
      useUserStore.user.avatar as string
    }`;
  };

  return {
    avatar,
    avatarGetStart,
  };
};
