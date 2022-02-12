import { platform as getPlatform } from "os";
import { join } from "path";
import { env } from "process";
import fetchPowerPlatformCli from "pac-fetch";
import { stat } from "fs/promises";
import getPacFileName from "./commands/getPacFileName";

let path: Promise<string>;

export default function getPacFolder(): Promise<string> {
  if (!path) {
    path = (async () => {
      const platform = getPlatform();
      const basePath = await getBasePath();
      const pacFileName = getPacFileName();
      if (!(await pathExists(join(basePath, pacFileName)))) {
        const platformFolder = getPlatformFolder(platform);
        const folderPath = join(basePath, platformFolder);
        return folderPath;
      }
      return basePath;
    })();
  }
  return path;
}

async function getBasePath() {
  if (env.PAC_PATH === undefined) {
    return fetchPowerPlatformCli();
  } else {
    return env.PAC_PATH;
  }
}

async function pathExists(path: string) {
  try {
    await stat(path);
    return true;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
}

function getPlatformFolder(platform: string) {
  let platformFolder: string;
  switch (platform) {
    case "win32":
      platformFolder = "windows";
      break;
    case "darwin":
      platformFolder = "osx";
      break;
    case "linux":
      platformFolder = "linux";
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
  return platformFolder;
}
