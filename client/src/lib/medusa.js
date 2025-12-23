import Medusa from "@medusajs/js-sdk";

const medusa = new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_API_KEY,
  debug: import.meta.env.NODE_ENV === "development",
  withCredentials: true,
  maxRetries: 3,
  auth: {
    fetchCredentials: "include",
    type: "jwt"
  }
});
export default medusa;
