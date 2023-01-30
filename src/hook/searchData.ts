import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSearch = () => {
  const router = useRouter();
  const searchData = ref<string>("");
  const searchContent = () => {
    if (!searchData.value) {
      searchData.value = "测试";
    }
    router.push({
      name: "search",
      params: { content: searchData.value },
    });
  };

  return { searchData, searchContent };
};
