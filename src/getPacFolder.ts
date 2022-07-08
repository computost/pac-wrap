import { platform as getPlatform } from "os";
import { join } from "path";
import { env } from "process";
import fetchPowerPlatformCli from "pac-fetch";
import { stat } from "fs/promises";
import getPacFileName from "./commands/getPacFileName.js";
import pathExists from "./pathExists.js";

let path: Promise<string>;

export default function getPacFolder(version?: string): Promise<string> {
  if (!path) {
    path = (async () => {
      const platform = getPlatform();
      const basePath = await getBasePath(version);
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

async function getBasePath(version?: string) {
  if (env.PAC_PATH === undefined) {
    return fetchPowerPlatformCli({version});
  } else {
    return env.PAC_PATH;
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
