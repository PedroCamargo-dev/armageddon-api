import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class SystemService {
  async getOsInfo() {
    const osInfo = await si.osInfo();
    return osInfo;
  }

  async getCPU() {
    const cpu: si.Systeminformation.CpuData = await si.cpu();
    const currentLoad: si.Systeminformation.CurrentLoadData =
      await si.currentLoad();
    return { ...cpu, ...currentLoad };
  }

  async getNetwork() {
    const network = await si.networkInterfaces();
    return network;
  }

  async getNetworkStats() {
    const network = await si.networkStats();
    return network;
  }

  async getMemory() {
    const memory: si.Systeminformation.MemData = await si.mem();
    const memFormated: si.Systeminformation.MemData = { ...memory };

    for (const prop in memFormated) {
      if (
        memFormated.hasOwnProperty(prop) &&
        typeof memFormated[prop as keyof si.Systeminformation.MemData] ===
          'number'
      ) {
        memFormated[prop as keyof si.Systeminformation.MemData] = memFormated[
          prop as keyof si.Systeminformation.MemData
        ] as any;
      }
    }
    return memFormated;
  }

  async getFsSize() {
    const diskIO = await si.fsSize();
    return diskIO;
  }
}
