interface ConfigType {
  ApiUrl: string;
}
const config: ConfigType = {
  ApiUrl: import.meta.env.VITE_API_URL,
};

export default config;
