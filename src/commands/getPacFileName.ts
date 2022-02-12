import { platform as getPlatform } from "os";

const getPacFileName = () => (getPlatform() === "win32" ? "pac.exe" : "pac");
export default getPacFileName;
