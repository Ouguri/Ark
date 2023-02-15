import { ElMessage } from "element-plus";
import { userStore } from "@/stores/user";
import type { Ref } from "vue";

const useUserStore = userStore();

export const rewardUser = async (reward: any, followStatus: Ref<boolean>) => {
  if (reward.username !== useUserStore.user.username) {
    const res = await useUserStore.updateByOther(reward);
    res.status == 200
      ? (followStatus.value = !followStatus.value)
      : ElMessage({ message: "关注失败，请稍后重试！", type: "error" });
  } else ElMessage({ message: "不可以关注自己哦！", type: "warning" });
};
