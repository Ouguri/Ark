import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSearch = () => {
  const router = useRouter();
  const searchData = ref<string>("测试");
  const searchContent = () => {
    router.push({
      name: "search",
      params: { content: searchData.value },
    });
  };

  return { searchData, searchContent };
};
