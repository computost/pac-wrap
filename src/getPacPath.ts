import { stat } from "fs/promises";
import { platform as getPlatform } from "os";
import { join } from "path";
import { env } from "process";
import fetchPowerPlatformCli from "pac-fetch";

let path: Promise<string>;

export default function getPacPath(): Promise<string> {
  if (!path) {
    path = (async () => {
      const platform = getPlatform();
      const basePath = await getBasePath();
      const fileName = platform === "win32" ? "pac.exe" : "pac";
      let path = join(basePath, fileName);
      if (!(await pathExists(path))) {
        const platformFolder = getPlatformFolder(platform);
        path = join(basePath, platformFolder, fileName);
        if (!(await pathExists(path))) {
          throw new Error(`Could not find pac at location: ${platformFolder}`);
        }
      }
      return path;
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
