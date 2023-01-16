import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSearch = () => {
  const router = useRouter();
  const searchData = ref<string>("");
  const searchContent = () => {
    router.push({
      name: "search",
      query: { content: searchData.value },
    });
  };

  return { searchData, searchContent };
};
