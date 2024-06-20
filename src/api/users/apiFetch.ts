import { API_URL } from "@/constants/constants";

export const apiFetch = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      next: { revalidate: 2400 },
    });

    if (!response.ok) throw new Error(`Failed to fetch users data`);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
